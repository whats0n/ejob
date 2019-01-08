import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'
const zoomInDelay = '-=0.5'

const section = document.querySelector('.js-team')
const orange = section.querySelector('.js-team-orange')
const blue = section.querySelector('.js-team-blue')
const yellow = section.querySelector('.js-team-yellow')
const groups = section.querySelectorAll('.js-team-group')


const tl = new TimelineMax({ paused: true })
	.staggerTo(groups[0].querySelectorAll('.js-team-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15)
	.to(orange, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groups[1].querySelectorAll('.js-team-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.to(blue, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.addLabel('group2', zoomInDelay)
	.staggerTo(groups[2].querySelectorAll('.js-team-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, 'group2')
	.staggerTo(groups[3].querySelectorAll('.js-team-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, 'group2')
	.to(yellow, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groups[4].querySelectorAll('.js-team-circle'), zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)

const controller = new Controller()
const scene = new Scene({
	triggerHook: 0.8,
	triggerElement: section,
	duration: section.offsetHeight
})

scene
	.addTo(controller)
	.on('progress', ({ progress }) => tl.progress(progress))