import { getElement, getElements, addProduct, mobileMenu } from '../src/utils.js';
import fetchProducts from '../src/fetchProducts.js';
import toggleBtn from '../src/toggleBtns.js';
import paginate from '../src/paginate.js';
import displayBtns from '../src/displayBtns.js';
import display from '../src/displayProducts.js';
import { displayCartItemCount } from '../src/setupCart.js';

const countContainer = getElement('.catalog-top__filter-descr')
const btnContainer = getElement('.pagination__list')
const catalogBtn = getElement('.main-aside__title')

let index = 0
let pages = []

const addSpeciaClass = () => {
	const catalog = getElement('.catalog-products')
	let catalogProducts = [...catalog.children]
	catalogProducts.forEach((elem) => {
		elem.classList.add('catalog-products__item')
	})
}

const setupUI = () => {
	display(pages[index], getElement('.catalog-products'))
	addSpeciaClass()
	displayBtns(pages, index, btnContainer)
}

const setupCategories = (products) => {
	let categories = ['all', ...new Set(products.map((product) => product.category))]
	const categoriesDOM = getElement('.main-aside__list')

	categoriesDOM.innerHTML = categories.map((category) => {
		return `
		<li class="main-aside__line">
			<a href="#" class="main-aside__link">${category}</a>
		</li>
		`
	}).join('')

	categoriesDOM.addEventListener('click', (e) => {
		e.preventDefault()
		const element = e.target

		let newCategories = []

		if (element.textContent === 'all' && element.classList.contains('main-aside__link')) {
			newCategories = [...products]
		}
		else {
			newCategories = products.filter((product) => product.category === element.textContent)
		}
		pages = paginate(newCategories)
		setupUI()
		// display(paginate(newCategories)[0], getElement('.catalog-products'))
		countContainer.innerHTML = `<span>Found </span>${newCategories.length} products`
		toggleBtn(element, getElements('.main-aside__link'))
	})
}

const init = async () => {
	const products = await fetchProducts()
	if (products) {
		setupCategories(products)
		pages = paginate(products)
		setupUI()

		countContainer.innerHTML = `<span>Found </span>${products.length} products`
		addProduct()
		displayCartItemCount()
	}
	mobileMenu()
}

catalogBtn.addEventListener('click', () => {
	const parent = catalogBtn.parentElement
	const list = catalogBtn.nextElementSibling
	if (!parent.classList.contains('active') && !list.classList.contains('active')) {
		parent.classList.add('active')
		list.classList.add('active')
	} else {
		parent.classList.remove('active')
		list.classList.remove('active')
	}

})

btnContainer.addEventListener('click', (e) => {
	let element = e.target.parentElement
	if (element.classList.contains('pagination__line')) {
		index = parseInt(element.dataset.index)
	}
	setupUI()

})
window.addEventListener('DOMContentLoaded', init)

export default setupCategories