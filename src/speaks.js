import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-speaks')
const circles = section.querySelectorAll('.js-speaks-circle')
const yellow = section.querySelector('.js-speaks-yellow')
const gap = section.querySelector('.js-speaks-gap')
const rotator = section.querySelector('.js-rotator')
const rotatorIn = rotator.querySelector('.js-rotator-in')

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'
const zoomInDelay = '-=0.5'

const rotate = function (e) {
	const { scrollY, scrollX, pageYOffset, pageXOffset } = window
	const scrollTop = scrollY || pageYOffset
	const scrollLeft = scrollX || pageXOffset
	const offset = rotator.getBoundingClientRect()
	const center = [
		(offset.left + scrollLeft) + rotatorIn.offsetWidth / 2,
		(offset.top + scrollTop) + rotatorIn.offsetHeight / 2
	]
	const angle = Math.atan2( e.pageX - center[0],- (e.pageY - center[1]) ) * (180 / Math.PI) 
	const rotate = `rotate(${angle}deg)`

	rotatorIn.setAttribute('style', `
		-webkit-transform: ${rotate};
		-moz-transform: ${rotate};
		transform: ${rotate};
	`)
}

const tl = new TimelineMax({ paused: true })
	.staggerTo(circles, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.to([yellow, gap], bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.to(gap, 0.3, {
		rotation: 45
	})
	.to(gap, 0.3, {
		rotation: -55
	})
	.to(gap, 0.3, {
		rotation: 15
	})
	.to(gap, 0.3, {
		rotation: 90
	})
	.to(gap, 0.3, {
		rotation: -90
	})
	.to(gap, 0.3, {
		rotation: 0
	})
	.eventCallback('onComplete', () => {
		document.addEventListener('mousemove', rotate)
	})

const controller = new Controller()
new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: 500,
	offset: parseInt(window.getComputedStyle(section.querySelector('.js-speaks-graph')).top)
})
	.addTo(controller)
	.setPin(section)
	.on('enter', ({ progress }) => {
		if (!progress) return
		tl.play()
	})
	.on('leave', ({ progress }) => {
		if (progress) return
		tl.reverse()
		document.removeEventListener('mousemove', rotate)
	})

const content = section.querySelector('.js-speaks-content')
const details = section.querySelector('.js-speaks-details')
const clouds = section.querySelectorAll('.js-speaks-cloud')

const contentScene = new Scene({
	triggerHook: 'onLeave',
	triggerElement: content,
	duration: content.offsetHeight - details.offsetHeight
})

contentScene
	.addTo(controller)
	.setPin(details)

Array
	.prototype
	.forEach
	.call(clouds, (cloud, i) => {
		const connect = cloud.getAttribute('data-connect')
		const elements = connect ? [cloud, section.querySelector(`.js-speaks-detail[data-connect="${connect}"]`)]
			: i === clouds.length - 1 ? [cloud, section.querySelector(`.js-speaks-detail[data-connect="last"]`)]
				: cloud
		const cloudScene = new Scene({
			triggerHook: 'onCenter',
			triggerElement: cloud
		})
		const tl = new TimelineMax({ paused: true })
			.to(elements, 0.5, {
				opacity: 1,
				y: 0
			})

		cloudScene
			.addTo(controller)
			.on('enter', () => {
				tl.play()
			})
			.on('leave', () => {
				tl.reverse()
			})
	})