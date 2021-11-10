

import { displayCartItemCount, displayCartTotal } from "../src/setupCart.js"
import { getElement, setStorageItem, getStorageItem, formatPrice, mobileMenu } from "../src/utils.js"

const cartContainer = getElement('.cart__center')
let cart = getStorageItem('cart')

const removeItem = (id) => {
	cart = cart.filter((item) => item.id !== id)
}

const increaseAmount = (id, element) => {

	let newAmount

	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			newAmount = cartItem.amount + 1
			cartItem = { ...cartItem, amount: newAmount }
		}
		return cartItem
	})
	document.location.reload()
	element.previousElementSibling.textContent = newAmount
}

const decreaseAmount = (id, element) => {
	let newAmount

	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			if (cartItem.amount > 1) {
				newAmount = cartItem.amount - 1
				cartItem = { ...cartItem, amount: newAmount }
			}
		}
		return cartItem
	})

	document.location.reload()
	element.nextElementSibling.textContent = newAmount
}


const cartFunctionality = () => {

	cartContainer.addEventListener('click', (e) => {
		const element = e.target
		const parent = element.parentElement
		const id = element.dataset.id
		const parentID = parent.dataset.id

		if (parent.classList.contains('cart-item__close')) {
			removeItem(parentID)
			parent.parentElement.remove()
			document.location.reload()
		}
		if (element.classList.contains('cart-item__increment')) {
			increaseAmount(id, element)
		}
		if (element.classList.contains('cart-item__decrement')) {
			decreaseAmount(id, element)
		}

		displayCartItemCount()
		setStorageItem('cart', cart)
	})
}


const init = () => {
	cartContainer.innerHTML = cart.map((product) => {
		const { id, name, img, amount, price } = product

		return `
					<div class="cart-item">
						<div class="cart-item__image">
							<img class="cart-item__img" src="${img}" alt="${name}">
						</div>
						<div class="cart-item__name">${name}</div>
						<div class="cart-item__count">
							<button class="cart-item__decrement" data-id="${id}">-</button>
							<p class="cart-item__number" data-id="${id}">${amount}</p>
							<button class="cart-item__increment" data-id="${id}">+</button>
						</div>
						<div class="cart-item__price">${formatPrice(price)}</div>
						<div class="cart-item__amount">${formatPrice(price * amount)}</div>
						<button class="cart-item__close"  data-id="${id}">
							<img src="./images/closebtn.png" alt="close">
						</button>
					</div>
		`
	}).join('')


	displayCartItemCount()
	displayCartTotal()
	cartFunctionality()
	mobileMenu()
}


window.addEventListener('DOMContentLoaded', init)