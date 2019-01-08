import { isDesktop } from './_constants'

window.addEventListener('load', () => {
	let desktop = isDesktop()
	const scrollToTop = () => {
		if (isDesktop() && !desktop) {
			desktop = true
			$(window).scrollTop(0)
		} else if (!isDesktop() && desktop) {
			desktop = false
		}
	}
	window.addEventListener('resize', scrollToTop)
	require('./hero')
	require('./why')
	require('./market')
	require('./fees')
	require('./support')
	require('./road')
	require('./speaks')
	require('./team')
	require('./details')
	require('./exchange')
	require('./news')
})