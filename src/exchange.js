import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-exchange')
const items = section.querySelectorAll('.js-exchange-item')
const groups = section.querySelectorAll('.js-exchange-group')
const yellow = section.querySelector('.js-exchange-yellow')

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'
const zoomInDelay = '-=0.5'

const tl = new TimelineMax({ paused: true })
	.staggerTo(items, 0.8, {
		opacity: 1,
		x: 0
	}, 0.3)

const circlesTL = new TimelineMax({ paused: true })
	.staggerTo(groups[0].querySelectorAll('.js-exchange-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15)
	.to(yellow, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groups[1].querySelectorAll('.js-exchange-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)

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
			circlesTL.play()
		} else {
			tl.reverse()
			circlesTL.reverse()
		}
	})

