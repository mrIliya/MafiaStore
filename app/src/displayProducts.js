import { addToCart } from "./setupCart.js"
import { formatPrice, setStorageItem } from "./utils.js"

const display = (products, element) => {
	element.innerHTML = products.map((item) => {
		const { id, name, img, price, } = item
		return `
				<div class="slider-item swiper-slide">
					<div class="slider-item__available">available</div>
					<a class="slider-item__link" href="product.html?id=${id}" data-id="${id}">
						<img class="slider-item__image" src=${img} alt="product">
						<div class="slider-item__name">${name}</div>
					</a>
					<div class="slider-item__footer">
						<div class="slider-item__price"><span>Price</span> ${formatPrice(price)}</div>
						<button class="slider-item__btn" data-id="${id}">add to cart</button>
					</div>
				</div>
				`
	}).join('')

	const singleProduct = (id, products) => {
		let product = products.find((item) => item.id === id)
		product = {...product, amount: 1 }
		setStorageItem('product', product)
	}

	element.addEventListener('click', (e) => {
		let parent = e.target
		if (parent.classList.contains('slider-item__btn')) {
			addToCart(parent.dataset.id)
		}
		if (parent.parentElement.classList.contains('slider-item__link')) {
			const id = parent.parentElement.dataset.id
			singleProduct(id, products)
		}
	})

}

export default display