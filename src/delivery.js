// import { Scene, Controller } from 'scrollmagic'
// import { TimelineMax } from 'gsap'

// const section = document.querySelector('.js-delivery')
// const items = Array.from(section.querySelectorAll('.js-delivery-item'))

// const filteredItems = items.sort((prev, next) => +(prev.getAttribute('data-index')) - +(next.getAttribute('data-index')))

// const tl = new TimelineMax({ paused: true })
// 	.staggerTo(filteredItems, 0.8, {
// 		opacity: 1
// 	}, 0.6)

// const controller = new Controller()
// const scene = new Scene({
// 	triggerHook: 'onCenter',
// 	triggerElement: section
// })

// scene
// 	.addTo(controller)
// 	.on('enter', () => {
// 		tl.play()
// 	})
// 	.on('leave', () => {
// 		tl.reverse()
// 	})

