

const slider = (container, nextBtn, prevBtn) => {

	const elements = container.children
	const innerWindowWidth = window.innerWidth
	let index = 0
	let size = container.firstElementChild.clientWidth + 33
	let numberOfSlides = 3

	if (innerWindowWidth <= 800) {
		numberOfSlides = 1
	}
	if (innerWindowWidth <= 450) {
		numberOfSlides = 0
		size = container.firstElementChild.clientWidth
	}


	nextBtn.addEventListener('click', () => {
		if (index >= (elements.length - 1) - numberOfSlides) {
			nextBtn.style.disabled = 'disabled'
			return false
		}
		index++
		container.style.transform = 'translateX(' + (index * -size) + 'px)'
	})
	prevBtn.addEventListener('click', () => {
		if (index <= 0) {
			prevBtn.style.disabled = "disabled"
			return false
		}
		index--
		container.style.transform = 'translateX(' + (index * -size) + 'px)'
	})
}

export default slider