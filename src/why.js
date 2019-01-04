import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-why')
const hero = document.querySelector('.js-hero')
const container = section.querySelector('.container')
const figureIn = hero.querySelector('.js-hero-figure-in')

const controller = new Controller()
const scene = new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: container.offsetHeight
})

const tl = new TimelineMax({ paused: true })
	.to([section, figureIn], 1.5, {
		opacity: 0
	})

scene
	.addTo(controller)
	.on('progress', ({ progress }) => {
		tl.progress(progress)
	})