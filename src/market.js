import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-market')
const container = section.querySelector('.js-market-container')
const title = section.querySelector('.js-market-title')
const list = section.querySelectorAll('.js-market-list')
const items = section.querySelectorAll('.js-market-item')
const logos = section.querySelectorAll('.js-market-logo')

const height = 3000

const controller = new Controller()
const scene = new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: height
})

const logosTL = new TimelineMax({ paused: true })
	.staggerTo(logos, 0.7, {
		opacity: 1,
		ease: Power2.easeInOut
	}, 0.3, 0.3)
	.addLabel('start')
	.to({ counter: 0 }, (items.length + 1) * 0.7, {
		counter: 1
	})
	.to(list, 0.7 * items.length, {
		y: 0
	}, 'start')
	.staggerTo(items, 0.7, {
		opacity: 1
	}, 0.7, 'start')

// const itemsTL = new TimelineMax({ paused: true })
// 	.addLabel('start')
// 	.to({ counter: 0 }, (items.length + 1) * 0.7, {
// 		counter: 1
// 	})
// 	.to(list, 0.7 * items.length, {
// 		y: 0
// 	}, 'start')
// 	.staggerTo(items, 0.7, {
// 		opacity: 1
// 	}, 0.7, 'start')

let played = false
let progressPrev = 0

scene
	.setPin(container)
	.on('enter', () => {
		// console.log(progress)
		// logosTL.play()
	})
	.on('leave', ({ progress }) => {
		// !progress && logosTL.reverse()
	})
	.on('progress', ({ progress }) => {
		// console.log(progress)
		// if (progress > 0.1 && !played) {
		// 	played = true
		// 	logosTL.play()
		// } else if (progress <= 0.1 && played) {
		// 	played = false
		// 	logosTL.reverse()
		// }
		logosTL.progress(progress)
		// if (progress > 0.2 && progressPrev < progress) {
		// 	itemsTL.progress(progress - 0.2)
		// } else if (progressPrev >= progress) {
		// 	progress = progress - 0.2 < 0 ? 0 : progress - 0.2
		// 	itemsTL.progress(progress)
		// }
		// progressPrev = progress
	})
	.addTo(controller)

// const titleScene = new Scene({
// 	triggerHook: 'onLeave',
// 	triggerElement: title,
// 	duration: 200,
// 	offset: -100
// })

// const titleTL = new TimelineMax({ paused: true })
// 	.to(title, 1.5, {
// 		opacity: 0
// 	})

// const mainTL = new TimelineMax({ paused: true })
// 	.addLabel('start')
// 	.staggerTo(item, duration/item.length, {
// 		opacity: 1
// 	}, 0.3, 'start')
// 	.staggerTo(box, duration/box.length, {
// 		opacity: 1
// 	}, 0.3, 'start')

// titleScene
// 	.addTo(controller)
// 	.on('progress', ({ progress }) => {
// 		titleTL.progress(progress)
// 	})

// Array
// 	.prototype
// 	.forEach
// 	.call(items, item => {
// 		const tl = new TimelineMax({ paused: true })
// 			.to(item, 1, {
// 				opacity: 1
// 			})
// 		const scene = new Scene({
// 			triggerHook: 'onCenter',
// 			triggerElement: item,
// 			duration: 200,
// 			offset: -100
// 		})
// 		scene
// 			.addTo(controller)
// 			.on('progress', ({ progress }) => {
// 				tl.progress(progress / 2)
// 			})
// 	})