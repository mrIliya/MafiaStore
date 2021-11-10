
const allProductsUrl = './data/data.json'


const getElement = (selection) => {
	const element = document.querySelector(selection)
	if (element) return element
	throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const getElements = (selection) => {
	const element = document.querySelectorAll(selection)
	if (element) return element
	throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const formatPrice = (price) => {
	let formattedPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format((price / 100).toFixed(2))
	return formattedPrice
}

const getStorageItem = (item) => {
	let storageItem = localStorage.getItem(item)

	if (storageItem) {
		storageItem = JSON.parse(storageItem)
	} else {
		storageItem = []
	}
	return storageItem
}


const setStorageItem = (name, item) => {
	localStorage.setItem(name, JSON.stringify(item))
}

const addProduct = () => {
	const addBtn = getElements('.slider-item__btn')


	addBtn.forEach((element) => {
		element.addEventListener('click', (e) => {
			let currentElem = e.target

			currentElem.classList.contains('active') ? currentElem.classList.remove('active')
				: currentElem.classList.add('active')

		})
	})
}

const mobileMenu = () => {
	const btn = getElement('.header-nav__btn')
	const menu = getElement('.header-nav')
	const body = getElement('body')

	btn.addEventListener('click', () => {
		btn.classList.toggle('active')
		if (!menu.classList.contains('active')) {
			menu.classList.add('active')
			body.classList.add('lock')
		} else {
			menu.classList.remove('active')
			body.classList.remove('lock')
		}
	})
}

export {
	getElement,
	getElements,
	allProductsUrl,
	formatPrice,
	setStorageItem,
	getStorageItem,
	addProduct,
	mobileMenu
}