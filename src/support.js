import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-support')
const items = section.querySelectorAll('.js-support-item')
const text = section.querySelectorAll('.js-support-text')

const controller = new Controller()
const duration = 2000

const tl = new TimelineMax({ paused: true })
	.staggerTo(items, 0.8, {
		opacity: 1
	}, 0.6)
	.to(text, items.length * 0.8, {
		opacity: 1,
		y: 0
	})

new Scene({
	triggerHook: 'onCenter',
	triggerElement: section,
	duration: duration
})
	.addTo(controller)
	.on('progress', ({ progress }) => tl.progress(progress))

new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: duration
})
	.addTo(controller)
	.setPin(section)
