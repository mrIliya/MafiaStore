
import { getElement, getElements, addProduct, setStorageItem, mobileMenu } from './src/utils.js';
import fetchProducts from './src/fetchProducts.js';
import display from './src/displayProducts.js';
import slider from './src/slider.js';
import { addToCart, displayCartItemCount } from './src/setupCart.js';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

const init = async () => {
	const products = await fetchProducts()

	const favorites = products.filter((item) => {
		if (item.filter === 'favorites') {
			return item
		}
	})
	const newProducts = products.filter((item) => {
		if (item.filter === 'new') {
			return item
		}
	})
	const saleProducts = products.filter((item) => {
		if (item.filter === 'sale') {
			return item
		}
	})

	if (products) {
		display(favorites, getElement('.favorite-slider__content'))
		display(newProducts, getElement('.new-slider__content'))
		display(saleProducts, getElement('.action-slider__content'))
		// slider(getElement('.favorite-slider__content'), getElement('.favorite-slider__btn-next'),
		// 	getElement('.favorite-slider__btn-prev'))
		// slider(getElement('.new-slider__content'), getElement('.new-slider__btn-next'),
		// 	getElement('.new-slider__btn-prev'))
		// slider(getElement('.action-slider__content'), getElement('.action-slider__btn-next'),
		// 	getElement('.action-slider__btn-prev'))
	}

	const swiperFavorite = new Swiper('.favorite-slider', {
		// Optional parameters

		slidesPerView: 4,
		spaceBetween: 33,
		slidesPerGroup: 1,
		loop: true,
		loopFillGroupWithBlank: true,
		breakpoints: {
			1023: {
				slidesPerView: 3,
				spaceBetween: 47,
			},
			600: {
				slidesPerView: 3,
				spaceBetween: 33,
			},
			400: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			300: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.favorite-slider__btn-next',
			prevEl: '.favorite-slider__btn-prev',
		},

	})

	const swiperNew = new Swiper('.new-slider', {
		// Optional parameters

		slidesPerView: 4,
		spaceBetween: 33,
		slidesPerGroup: 1,
		loop: true,
		loopFillGroupWithBlank: true,
		breakpoints: {
			1023: {
				slidesPerView: 3,
				spaceBetween: 47,
			},
			600: {
				slidesPerView: 3,
				spaceBetween: 33,
			},
			400: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			300: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.new-slider__btn-next',
			prevEl: '.new-slider__btn-prev',
		},

	})

	const swiperAction = new Swiper('.action-slider', {
		// Optional parameters

		slidesPerView: 4,
		spaceBetween: 33,
		slidesPerGroup: 1,
		loop: true,
		loopFillGroupWithBlank: true,
		breakpoints: {
			1023: {
				slidesPerView: 3,
				spaceBetween: 47,
			},
			600: {
				slidesPerView: 3,
				spaceBetween: 33,
			},
			400: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			300: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},

		// Navigation arrows
		navigation: {
			nextEl: '.action-slider__btn-next',
			prevEl: '.action-slider__btn-prev',
		},

	})

	addProduct()
	displayCartItemCount()
	mobileMenu()
}

window.addEventListener('DOMContentLoaded', init)