import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-support')
const items = section.querySelectorAll('.js-support-item')
const text = section.querySelectorAll('.js-support-text')

const tl = new TimelineMax({ paused: true })
	.staggerTo(items, 0.8, {
		opacity: 1
	}, 0.6)
	.to(text, items.length * 0.8, {
		opacity: 1,
		y: 0
	})

const controller = new Controller()
new Scene({
	triggerHook: 'onCenter',
	triggerElement: section,
	duration: 2000
})
	.addTo(controller)
	.on('progress', ({ progress }) => tl.progress(progress))

new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: 2000
})
	.addTo(controller)
	.setPin(section)
