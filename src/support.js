import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-support')
const items = section.querySelectorAll('.js-support-item')

const controller = new Controller()
const scene = new Scene({
	triggerHook: 'onEnter',
	triggerElement: section,
	offset: 200
})
const tl = new TimelineMax({ paused: true })
	.staggerTo(items, 0.8, {
		opacity: 1
	}, 0.6)

scene
	.addTo(controller)
	.on('enter', () => {
		tl.play()
	})
	.on('leave', () => {
		tl.reverse()
	})