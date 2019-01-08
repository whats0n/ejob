import { Scene, Controller } from 'scrollmagic'
import { TimelineMax, TweenMax } from 'gsap'
import { bounceInDuration, zoomInDuration, bounceInDelay, zoomInDelay, isDesktop } from './_constants'

//sections
const sectionWhy = document.querySelector('.js-why')
const sectionWhyContainer = sectionWhy.querySelector('.js-why-container')

const section = document.querySelector('.js-hero')
const title = section.querySelector('.js-hero-title')
const figure = section.querySelector('.js-hero-figure')
const figureIn = section.querySelector('.js-hero-figure-in')
const img = section.querySelector('.js-hero-img')

//begin SVG elements
const yellow = section.querySelector('.js-hero-yellow')
const orange = section.querySelector('.js-hero-orange')
const blue = section.querySelector('.js-hero-blue')

const firstGroup = section.querySelector('.js-hero-group[data-index="1"]')
const secondGroup = section.querySelector('.js-hero-group[data-index="2"]')
const firstGroupCircles = firstGroup.querySelectorAll('.js-hero-circle')
const secondGroupCircles = secondGroup.querySelectorAll('.js-hero-circle')
//end SVG elements

const destroyImgSize = () => {
	figure.removeAttribute('style')
	img.removeAttribute('style')
}
const buildImgSize = () => {
	figure.style.height = `${img.offsetHeight}px`
	img.style.maxWidth = `${figure.offsetWidth}px`
}

let circlesController = new Controller()
const firstTL = new TimelineMax()
	.addLabel('start', 0.35)
	.to(yellow, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		svgOrigin: '0 0',
		ease: Bounce.easeOut
	})
	.staggerTo(firstGroupCircles, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	.to(orange, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.to(title, 1.5, {
		opacity: 1
	}, 'start')
	.eventCallback('onComplete', () => {
		const secondTL = new TimelineMax({ paused: true })
			.staggerTo(secondGroupCircles, zoomInDuration, {
				scale: 1,
				transformOrigin: '50% 50%'
			}, 0.15)
			.to(blue, bounceInDuration, {
				scale: 1,
				transformOrigin: '50% 50%',
				ease: Bounce.easeOut
			}, bounceInDelay)
		circlesController.destroy(true)
		circlesController = new Controller()
		const scene = new Scene({
			triggerHook: 'onCenter',
			triggerElement: orange,
			duration: 500
		})
			.addTo(circlesController)
			.on('progress', ({ progress }) => secondTL.progress(progress))
	})

let fadeOutTL = new TimelineMax({ paused: true })
	.to([sectionWhyContainer, figureIn], 1.5, {
		opacity: 0
	})

const sectionWhyContainerSceneDuration = 500
const getScrollTop = () => window.scrollY || window.pageYOffset
const getFigureSceneDuration = () => (sectionWhyContainer.getBoundingClientRect().top + getScrollTop()) + sectionWhyContainer.offsetHeight + sectionWhyContainerSceneDuration - figureIn.offsetHeight
const getFadeInSceneDuration = () => sectionWhyContainer.offsetHeight + sectionWhyContainerSceneDuration

const build = () => {
	const controller = new Controller()
	const figureScene = new Scene({
		triggerHook: 'onLeave',
		triggerElement: figureIn,
		duration: getFigureSceneDuration()
	})
		.addTo(controller)
		.setPin(figureIn)

	const sectionWhyContainerScene = new Scene({
		triggerHook: 'onLeave',
		triggerElement: sectionWhyContainer,
		duration: sectionWhyContainerSceneDuration
	})
		.addTo(controller)
		.setPin(sectionWhyContainer)

	const fadeInScene = new Scene({
		triggerHook: 'onLeave',
		triggerElement: sectionWhy,
		duration: getFadeInSceneDuration()
	})
		.addTo(controller)
		.on('progress', ({ progress }) => {
			if (progress >= .5) {
				progress = (progress - .5) * 2
				fadeOutTL.progress(progress)
			} else {
				fadeOutTL.progress(0)
			}
		})

	return controller
}

const clear = () => TweenMax.set([sectionWhyContainer, figureIn], { clearProps: 'all' })

let builded = null
if (isDesktop()) {
	buildImgSize()
	builded = build()
}
window.addEventListener('resize', () => {
	if (isDesktop()) {
		builded && builded.destroy(true)
		destroyImgSize()
		buildImgSize()
		builded = build()
	} else {
		builded && builded.destroy(true)
		destroyImgSize()
		clear()
	}
})
