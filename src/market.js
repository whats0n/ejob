import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-market')
const title = section.querySelector('.js-market-title')
const item = section.querySelectorAll('.js-market-item')
const box = section.querySelectorAll('.js-market-box')
const duration = 4.8

const controller = new Controller()
const scene = new Scene({
	triggerHook: 'onEnter',
	triggerElement: section,
	duration: section.offsetHeight
})

const titleTL = new TimelineMax({ paused: true })
	.to(title, 1.5, {
		opacity: 0
	})

const mainTL = new TimelineMax({ paused: true })
	.addLabel('start')
	.staggerTo(item, duration/item.length, {
		opacity: 1
	}, 0.3, 'start')
	.staggerTo(box, duration/box.length, {
		opacity: 1
	}, 0.3, 'start')

scene
	.addTo(controller)
	.on('progress', ({ progress }) => {
		titleTL.progress(progress / 1.3)
		mainTL.progress(progress / 1.8)
	})