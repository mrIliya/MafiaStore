import fetchProducts from './fetchProducts.js';
import { getElement, getStorageItem, setStorageItem, formatPrice } from './utils.js';

const cartItemCount = getElement('.header-nav__count')
let cart = getStorageItem('cart')


const addToCart = async (id) => {
	const products = await fetchProducts()

	let item = cart.find((cartItem) => cartItem.id === id)
	if (!item) {
		let product = products.find((item) => item.id === id)
		product = { ...product, amount: 1 }
		cart = [...cart, product]
	}
	displayCartItemCount()
	setStorageItem('cart', cart)
	
}

const displayCartItemCount = () => {
	const amount = cart.reduce((total, cartItem) => {
		return total += cartItem.amount
	}, 0)
	if (amount <= 0) {
		cartItemCount.classList.remove('active')
	} else {
		cartItemCount.classList.add('active')
	}
	cartItemCount.textContent = amount
}

const displayCartTotal = () => {
	const cartItemTotal = getElement('.cart__total')
	let total = cart.reduce((total, cartItem) => {
		return total += cartItem.price * cartItem.amount
	}, 0)
	cartItemTotal.innerHTML = `
	<span>Total :</span> ${formatPrice(total)}
	`
}

export { addToCart, displayCartItemCount, displayCartTotal}
