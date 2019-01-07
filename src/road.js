import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-road')
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

const subtitle = section.querySelector('.js-road-subtitle')
const subsubtitle = section.querySelector('.js-road-subsubtitle')
const text = section.querySelector('.js-road-text')

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'
const zoomInDelay = '-=0.5'

const tl = new TimelineMax({ paused: true })
	// group 0
	.to(yellowFirst, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	})
	.addLabel('groupFirst', zoomInDelay)
	.staggerTo(groupsFirst[0].querySelectorAll('.js-road-circle'), zoomInDuration, {
		transformOrigin: '50% 50%',
		scale: 1
	}, 0.15, 'groupFirst')
	.staggerTo(groupsFirst[1].querySelectorAll('.js-road-circle'), zoomInDuration, {
		transformOrigin: '50% 50%',
		scale: 1
	}, 0.15, 'groupFirst')
	// // group 1
	.to(orageFirst, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groupSecond.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	// // group 2
	.addLabel('blue', bounceInDelay)
	.to(blue, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, 'blue')
	.staggerTo(groupThird.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.to(subtitle, 1, {
		opacity: 1
	}, 'blue')
	// // group 3
	.to(yellowSecond, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.addLabel('groupFourth', zoomInDelay)
	.addLabel('groupFourthText', '+=0.4')
	.staggerTo(groupFourth.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, 'groupFourth')
	.staggerTo([subsubtitle, text], 1, {
		opacity: 1
	}, 0.4, 'groupFourth')
	// // group 4
	.to(orageSecond, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groupFifth.querySelectorAll('.js-road-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)

const controller = new Controller()
const scenePin = new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: section.offsetHeight 
})

const scene = new Scene({
	triggerHook: 'onLeave',
	triggerElement: section,
	duration: section.offsetHeight * 1.8
})

scenePin
	.addTo(controller)
	.setPin(section)

scene
	.addTo(controller)
	.on('progress', ({ progress  }) => tl.progress(progress))
	// .on('enter', () => {
	// 	tl.play()
	// })
	// .on('leave', () => {
	// 	tl.reverse()
	// })



