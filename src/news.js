import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-news')
const circles = section.querySelectorAll('.js-news-circle')
const orange = section.querySelector('.js-news-orange')

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'

const tl = new TimelineMax({ paused: true })
	.staggerTo(circles, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15)
	.to(orange, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)

const controller = new Controller()
const scene = new Scene({
	triggerHook: 'onCenter',
	triggerElement: section
})

scene
	.addTo(controller)
	.on('start', ({ progress }) => {
		if (progress) {
			tl.play()
		} else {
			tl.reverse()
		}
	})

