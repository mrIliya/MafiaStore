import { getElement } from './utils.js';


let comments = []

const form = getElement('.product-tabs__form')
const author = getElement('.comment-author')
const text = getElement('.comment-text')
const email = getElement('.comment-email')
const showMore = getElement('.product-tabs__button')

const saveComments = () => {
	localStorage.setItem('comments', JSON.stringify(comments))
}

const displayComments = (comments, element) => {
	element.innerHTML = comments.map((item) => {
		const { name, comment } = item
		return `
		<div class="product-tabs__comment">
			<div class="product-tabs__author">
				<h2 class="product-tabs__name">${name}</h2>
			</div>
			<p class="product-tabs__comment-text">${comment}</p>
		</div>`
	}).join('')

}

const loadComments = () => {
	let commentsStorage = localStorage.getItem('comments')
	if (commentsStorage) {
		comments = JSON.parse(commentsStorage)
		displayComments(comments, getElement('.product-tabs__reviews'))
	}

}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	let comment = {}
	if (!author.value == '' && !text.value == '' && !email.value == '') {
		comment = {
			name: author.value,
			comment: text.value,
			email: email.value
		}
		comments.push(comment)
		saveComments()
		displayComments(comments, getElement('.product-tabs__reviews'))
	}
	else {
		alert('заполните поля')
	}

	author.value = ''
	text.value = ''
	email.value = ''

})

window.addEventListener('DOMContentLoad', loadComments())

