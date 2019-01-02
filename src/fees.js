import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-fees')
const boxes = section.querySelectorAll('.js-fees-box')

const controller = new Controller()

Array
	.prototype
	.forEach
	.call(boxes, box => {
		const circle = box.querySelector('.js-fees-circle ellipse')
		const text = box.querySelectorAll('.js-fees-text')
		const svg = { counter: 420 }
		const tl = new TimelineMax({ paused: true })
			.addLabel('start')
			.addLabel('text', .4)
			.to(svg, 1.5, {
				counter: 0,
				ease: Power2.easeInOut
			}, 'start')
			.staggerTo(text, 0.7, {
				opacity: 1,
				y: 0,
				ease: Power2.easeOut
			}, 0.2, 'text')
			.eventCallback('onUpdate', e => {
				circle.setAttribute('stroke-dashoffset', svg.counter)
			})

		const scene = new Scene({
			triggerHook: 'onEnter',
			triggerElement: box,
			offset: box.offsetHeight * 1.5
		})

		scene
			.addTo(controller)
			.on('enter', () => {
				tl.play()
			})
			.on('leave', () => {
				console.log('leave')
				tl.reverse()
			})
	})
