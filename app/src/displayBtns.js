
const displayBtns = (pages, activeIndex, btnContainer) => {
	
	let btns = pages.map((_, pageIndex) => {
		return `
		<li class="pagination__line ${activeIndex === pageIndex ? 'active' : 'null'}" data-index="${pageIndex}">
			<span>${pageIndex + 1}</span>
		</li>`
	})

	btnContainer.innerHTML = btns.join('')

	 if (pages.length == 1) {
		btnContainer.innerHTML = ''
	}
	
}


export default displayBtns