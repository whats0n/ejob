import { Scene, Controller } from 'scrollmagic'
import { TimelineMax } from 'gsap'

const section = document.querySelector('.js-why')

const controller = new Controller()
const scene = new Scene({
	triggerElement: section,
	duration: section.offsetHeight
})

const tl = new TimelineMax({ paused: true })
	.to(section, 1.5, {
		opacity: 0
	})

scene
	.addTo(controller)
	.on('progress', ({ progress }) => {
		if (progress === 1) {
			tl.play()
		} else {
			tl.reverse()
		}
	})