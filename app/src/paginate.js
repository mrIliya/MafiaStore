

const paginate = (products) => {
	const itemsPerPage = 6
	const numberOfPages = Math.ceil(products.length / itemsPerPage)
	const newItems = Array.from({ length: numberOfPages }, (_, index) => {
		const start = index * itemsPerPage
		return products.slice(start, start + itemsPerPage)
	})

	return newItems
}

export default paginate