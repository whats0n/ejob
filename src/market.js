import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-market')
const title = section.querySelector('.js-market-title')
const items = section.querySelectorAll('.js-market-item')
// const box = section.querySelectorAll('.js-market-box')



const controller = new Controller()
const titleScene = new Scene({
	triggerHook: 'onLeave',
	triggerElement: title,
	duration: 200,
	offset: -100
})

const titleTL = new TimelineMax({ paused: true })
	.to(title, 1.5, {
		opacity: 0
	})

// const mainTL = new TimelineMax({ paused: true })
// 	.addLabel('start')
// 	.staggerTo(item, duration/item.length, {
// 		opacity: 1
// 	}, 0.3, 'start')
// 	.staggerTo(box, duration/box.length, {
// 		opacity: 1
// 	}, 0.3, 'start')

titleScene
	.addTo(controller)
	.on('progress', ({ progress }) => {
		titleTL.progress(progress)
	})

Array
	.prototype
	.forEach
	.call(items, item => {
		const tl = new TimelineMax({ paused: true })
			.to(item, 1, {
				opacity: 1
			})
		const scene = new Scene({
			triggerHook: 'onCenter',
			triggerElement: item,
			duration: 200,
			offset: -100
		})
		scene
			.addTo(controller)
			.on('progress', ({ progress }) => {
				tl.progress(progress / 2)
			})
	})