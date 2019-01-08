import { Scene, Controller } from 'scrollmagic'
import { TimelineMax, TweenMax } from 'gsap'
import { isDesktop } from './_constants'

const section = document.querySelector('.js-market')
const container = section.querySelector('.js-market-container')
const list = section.querySelectorAll('.js-market-list')
const items = section.querySelectorAll('.js-market-item')
const logos = section.querySelectorAll('.js-market-logo')

const logosTL = new TimelineMax({ paused: true })
	.staggerTo(logos, 0.7, {
		opacity: 1,
		ease: Power2.easeInOut
	}, 0.3, 0.3)
	.addLabel('start')
	.to(list, 0.7 * items.length, {
		y: 0
	}, 'start')
	.staggerTo(items, 0.7, {
		opacity: 1
	}, 0.7, 'start')

const build = () => {
	const controller = new Controller()
	new Scene({
		triggerHook: 'onLeave',
		triggerElement: section,
		duration: 1500
	})
		.addTo(controller)
		.setPin(container)
		.on('progress', ({ progress }) => logosTL.progress(progress))
	return controller
}

const clear = () => TweenMax.set([section, container, list, items, logos], { clearProps: 'all' })

let builded = isDesktop() ? build() : null

window.addEventListener('resize', () => {
	if (isDesktop()) {
		builded && builded.destroy(true)
		builded = build()
	} else {
		clear()
		builded && builded.destroy(true)
	}
})
