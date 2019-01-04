import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const why = document.querySelector('.js-why')
const section = document.querySelector('.js-hero')

const title = section.querySelector('.js-hero-title')
const img = section.querySelector('.js-hero-img')

const figure = section.querySelector('.js-hero-figure')
const figureIn = section.querySelector('.js-hero-figure-in')

const yellow = section.querySelector('.js-hero-yellow')
const orange = section.querySelector('.js-hero-orange')
const blue = section.querySelector('.js-hero-blue')

const groupItemsFirst = section
	.querySelector('.js-hero-group-first')
	.querySelectorAll('.js-hero-item')
const groupItemsSecond = section
	.querySelector('.js-hero-group-second')
	.querySelectorAll('.js-hero-item')

const bounceInDuration = 0.9
const zoomInDuration = 0.4
const bounceInDelay = '-=0.2'
const zoomInDelay = '-=0.5'
const IS_FIXED = 'is-fixed'

new TimelineMax()
	// group 0
	.to(yellow, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		svgOrigin: '0 0',
		ease: Bounce.easeOut
	})
	.staggerTo(groupItemsFirst, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	// group 1
	.to(orange, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)
	.staggerTo(groupItemsSecond, zoomInDuration, {
		scale: 1,
		transformOrigin: '50% 50%'
	}, 0.15, zoomInDelay)
	// group 2
	.to(blue, bounceInDuration, {
		scale: 1,
		transformOrigin: '50% 50%',
		ease: Bounce.easeOut
	}, bounceInDelay)

new TimelineMax()
	.addLabel('start', 0.15)
	.to(title, 1.5, {
		opacity: 1
	}, 'start');

const getInfo = () => {
	const { scrollY, pageYOffset, getComputedStyle } = window
	const scrollTop = scrollY || pageYOffset

	const figureOffset = figure.getBoundingClientRect()
	const figureTop = figureOffset.top + scrollTop

	const whyOffset = why.getBoundingClientRect()
	const whyBottom = whyOffset.top + scrollTop + why.clientHeight - (parseInt(getComputedStyle(why).paddingBottom) / 2)

	const imgOffset = img.getBoundingClientRect()
	const imgBottom = imgOffset.top + scrollTop + img.offsetHeight

	return {
		scrollTop,
		figureTop,
		whyBottom,
		imgBottom,
		imgHeight: img.offsetHeight
	}
}

(function() {
	const info = getInfo()

	const controller = new Controller()
	const scene = new Scene({
		offset: info.figureTop,
		duration: info.whyBottom - info.figureTop - info.imgHeight
	})

	scene
		.addTo(controller)
		.on('progress', ({ progress }) => {
			if (progress > 0 && progress < 1) {
				figure.classList.add(IS_FIXED)
				img.style.maxWidth = `${figure.offsetWidth}px`
				figure.style.minHeight = `${info.imgHeight}px`
				figureIn.removeAttribute('style')
			} else if (progress >= 1) {
				const diff = info.whyBottom - info.figureTop - info.imgHeight
				const translateY = `translateY(${diff}px)`
				figure.classList.remove(IS_FIXED)
				figureIn.setAttribute('style', `
					-webkit-transform: ${translateY};
					-moz-transform: ${translateY};
					transform: ${translateY};
				`)
			} else {
				figure.classList.remove(IS_FIXED)
				figureIn.removeAttribute('style')
			}
		})
})()
