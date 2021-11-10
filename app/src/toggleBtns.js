
const toggleBtn = (element, elements) => {

	if (!element.classList.contains('active')) {
		elements.forEach(element => element.classList.remove('active'))
		element.classList.add('active')
	}

}

export default toggleBtn