import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'
import { bounceInDuration, zoomInDuration, bounceInDelay, zoomInDelay, isDesktop } from './_constants'

const section = document.querySelector('.js-speaks')
const circles = section.querySelectorAll('.js-speaks-circle')
const yellow = section.querySelector('.js-speaks-yellow')
const gap = section.querySelector('.js-speaks-gap')
const rotator = section.querySelector('.js-rotator')
const rotatorIn = rotator.querySelector('.js-rotator-in')

const content = section.querySelector('.js-speaks-content')
const details = section.querySelector('.js-speaks-details')
const clouds = section.querySelectorAll('.js-speaks-cloud')

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

let played = false
let circlesTL = null
const yellowTL = new TimelineMax({ paused: true })
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
	.eventCallback('onReverseComplete', () => {
		circlesTL.reverse()
	})

const createCirclesTL = () => new TimelineMax({ paused: true })
	.staggerTo(circles, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.eventCallback('onComplete', () => {
		played = true
		yellowTL.play()
	})
	.eventCallback('onReverseComplete', () => {
		played = false
		circlesTL = createCirclesTL()
	})

circlesTL = createCirclesTL()

const build = () => {
	const controller = new Controller()
	new Scene({
		triggerHook: 'onLeave',
		triggerElement: section,
		duration: 500,
		offset: parseInt(window.getComputedStyle(section.querySelector('.js-speaks-graph')).top)
	})
		.addTo(controller)
		.setPin(section)
	new Scene({
		triggerHook: 'onCenter',
		triggerElement: section,
		duration: 500,
		offset: parseInt(window.getComputedStyle(section.querySelector('.js-speaks-graph')).top)
	})
		.addTo(controller)
		.on('progress', ({ progress }) => {
			if (played && progress === 0) {
				document.removeEventListener('mousemove', rotate)
				yellowTL.reverse()
			} else if (!played) {
				circlesTL.progress(progress)
			}
		})

	new Scene({
		triggerHook: 'onLeave',
		triggerElement: content,
		duration: content.offsetHeight - details.offsetHeight
	})
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
				triggerHook: 'onEnter',
				triggerElement: cloud,
				offset: +cloud.offsetHeight
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
	return controller
}
const clear = () => TweenMax.set([section, ...clouds, ...section.querySelectorAll('.js-speaks-detail')], { clearProps: 'all' })
const buildMobile = () => {
	const controller = new Controller()
	Array
		.prototype
		.forEach
		.call([...clouds, ...section.querySelectorAll('.js-speaks-detail')], (element, i) => {
			const cloudScene = new Scene({
				triggerHook: 'onEnter',
				triggerElement: element,
				offset: +element.offsetHeight
			})
			const tl = new TimelineMax({ paused: true })
				.to(element, 0.5, {
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
	return controller
}

let builded = isDesktop() ? build() : null
let buildedMobile = !isDesktop() ? buildMobile() : null
// let isDesktopScreen = isDesktop()

window.addEventListener('resize', () => {
	if (isDesktop()) {
		builded && builded.destroy(true)
		buildedMobile && buildedMobile.destroy(true)
		builded = build()
	} else {
		builded && builded.destroy(true)
		buildedMobile && buildedMobile.destroy(true)
		clear()
		buildedMobile = buildMobile()
	}
})