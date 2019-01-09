import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'
import { bounceInDuration, zoomInDuration, bounceInDelay, zoomInDelay, isDesktop } from './_constants'

const section = document.querySelector('.js-road')
const subtitle = section.querySelector('.js-road-subtitle')

// begin SVG elements
const yellowFirst = section.querySelector('.js-road-yellow-first')
const orageFirst = section.querySelector('.js-road-orange-first')
const blue = section.querySelector('.js-road-blue')
const yellowSecond = section.querySelector('.js-road-yellow-second')
const orageSecond = section.querySelector('.js-road-orange-second')
const groupsFirst = section.querySelectorAll('.js-road-group-first')
const groupSecond = section.querySelector('.js-road-group-second')
const groupThird = section.querySelector('.js-road-group-third')
const groupFourth = section.querySelector('.js-road-group-fourth')
const groupFifth = section.querySelector('.js-road-group-fifth')
const groupSixth = section.querySelector('.js-road-group-sixth')

const circles = [yellowFirst, orageFirst, blue, yellowSecond, orageSecond, ...section.querySelectorAll('.js-road-circle')]
// end SVG elements

const yellowTL = new TimelineMax({ paused: true })
	.to(yellowFirst, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	})

const tl = new TimelineMax({ paused: true })
	.eventCallback('onReverseComplete', () => {
		yellowTL.reverse()
	})
	.call(() => {
		yellowTL.play()
	}, null, null, 1)
	.addLabel('groupFirst', 3)
	.staggerTo(groupsFirst[0].querySelectorAll('.js-road-circle'), zoomInDuration, {
		transformOrigin: '50% 50%',
		scale: 1
	}, 0.15, 'groupFirst')
	.staggerTo(groupsFirst[1].querySelectorAll('.js-road-circle'), zoomInDuration, {
		transformOrigin: '50% 50%',
		scale: 1
	}, 0.15, 'groupFirst')
	.to(orageFirst, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groupSecond.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.to(blue, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	})
	.to(subtitle, 1, {
		opacity: 1
	})
	.staggerTo(groupThird.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, '+=1')
	.to(yellowSecond, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.addLabel('groupFourth', zoomInDelay)
	.staggerTo(groupFourth.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, 'groupFourth')
	.to(orageSecond, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groupFifth.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.staggerTo(groupSixth.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, '-=0.35')

const build = () => {
	circles.forEach(circle => {
		let transform = circle.getAttribute('transform')
		if (!transform) return
		transform = transform.replace('scale(0)', '') + ' scale(0)'
		circle.setAttribute('transform', transform)
	})
	const controller = new Controller()
	new Scene({
		triggerHook: 'onLeave',
		triggerElement: section,
		duration: section.offsetHeight * 2
	})
		.addTo(controller)
		.setPin(section)
	new Scene({
		triggerHook: 'onLeave',
		triggerElement: section,
		duration: section.offsetHeight * 2.8
	})
		.addTo(controller)
		.on('progress', ({ progress  }) => tl.progress(progress))
	return controller
}

const clear = () => {
	circles.forEach(circle => {
		let transform = circle.getAttribute('transform')
		if (!transform) return
		transform = transform.replace('scale(0)', '')
		circle.setAttribute('transform', transform)
	})

	TweenMax.set([section, subtitle], { clearProps: 'all' })
}

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



