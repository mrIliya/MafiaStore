import { getElement, getElements, getStorageItem, formatPrice, setStorageItem } from '../src/utils.js';
import toggleBtn from '../src/toggleBtns.js';
import { displayCartItemCount } from '../src/setupCart.js';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';

const productContainer = getElement('.product__inner')
const tabsContainer = getElement('.product-tabs')
const tabsBtns = getElements('.product-tabs__btn')
const tabsContent = getElements('.product-tabs__content')

let singleProduct = getStorageItem('product')
let cart = getStorageItem('cart')

const addToCart = (id) => {

	let item = cart.find((cartItem) => cartItem.id === id)
	if (!item) {
		let product = { ...singleProduct }
		cart = [...cart, product]
	}
	setStorageItem('cart', cart)

}

const renderSingleProduct = () => {
	const { id, name, price, img, amount } = singleProduct

	productContainer.innerHTML = `
	<div class="product__title title">${name}</div>
<div class="product__content">
	<div class="product-preview">		
			<div class="product-preview__card">
				<div class="product-preview__new viewed-item__new">NEW</div>
				<div class="product-slider swiper-wrapper">
					<div class="product-preview__image swiper-slide">
						<img class="product-preview__main-image " src="${img}" alt="product-image">
					</div>
					<div class="product-preview__image swiper-slide">
						<img class="product-preview__main-image" src="${img}" alt="product-image">
					</div>
					<div class="product-preview__image  swiper-slide">
						<img class="product-preview__main-image" src="${img}" alt="product-image">
					</div>
				</div>
			</div>
			<div class="product-preview__footer">
				<div class="product-preview__item">
					<img class="product-preview__small-image" src="${img}" alt="product-image">
				</div>
				<div class="product-preview__item">
					<img class="product-preview__small-image" src="${img}" alt="product-image">
				</div>
				<div class="product-preview__item">
					<img class="product-preview__small-image" src="${img}" alt="product-image">
				</div>
				<button class="product-preview__btn">
					<img src="./images/arrow-right.png" alt="arrow">
				</button>
			</div>
	</div>
	<div class="product-info">
		<div class="product-info__top">
			<div class="product-info__price"><span>Price</span>${formatPrice(price)} </div>
			<div class="product-info__count">
				<button class="product-info__decrement">-</button>
				<p class="product-info__number">${amount}</p>
				<button class="product-info__increment">+</button>
			</div>
			<a href="cart.html" class="product-info__btn" data-id="${id}">Buy Now</a>
			<div class="product-info__available">running out</div>
		</div>
		<div class="product-info__main">
			<div class="product-info__stars">
				<img class="product-info__star" src="./images/star.svg" alt="star">
				<img class="product-info__star" src="./images/star.svg" alt="star">
				<img class="product-info__star" src="./images/star.svg" alt="star">
				<img class="product-info__star" src="./images/star.svg" alt="star">
				<img class="product-info__star" src="./images/star.svg" alt="star">
			</div>
			<div class="product-info__category">Category :
				<a href="#" class="product-info__link">Tables</a>
			</div>
			<p class="product-info__text">Signs for photo shoots at the mafia game. Material - PVC. Size 20 *
				30cm. Various text options.
				Golden Mafia is a quality props for playing mafia. Made in EU.
			</p>
		</div>

	</div>
</div>
	`

	getElement('.product-info__decrement').addEventListener('click', (e) => {
		let newAmount
		if (singleProduct.amount > 1) {
			newAmount = singleProduct.amount - 1
			singleProduct = { ...singleProduct, amount: newAmount }
			e.target.nextElementSibling.textContent = newAmount
			setStorageItem('product', singleProduct)
		}
	})

	getElement('.product-info__increment').addEventListener('click', (e) => {
		let newAmount
		newAmount = singleProduct.amount + 1
		singleProduct = { ...singleProduct, amount: newAmount }
		e.target.previousElementSibling.textContent = newAmount
		setStorageItem('product', singleProduct)
	})

	getElement('.product-info__btn').addEventListener('click', (e) => {
		addToCart(id)
	})

	displayCartItemCount()
}

const swiper = new Swiper(".product-preview__card", {
	loop: true,
	spaceBetween: 10,
	slidesPerView: 1,
	pagination: {
		el: ".product-preview__footer",
		clickable: true,
	 },
 })


tabsContainer.addEventListener('click', (e) => {
	const id = e.target.dataset.id
	const element = e.target
	const contentId = getElement(`#${id}`)

	if (id) {
		toggleBtn(element, tabsBtns)
		toggleBtn(contentId, tabsContent)
	}
})

window.addEventListener('DOMContentLoaded', renderSingleProduct)


