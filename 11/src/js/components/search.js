const searchButtonOpen = document.querySelector('[data-search-open]')
const searchForm = document.querySelector('[data-search-from]')
const searchButtonClose = document.querySelector('[data-search-close]')

searchButtonOpen.addEventListener('click', () => searchForm.classList.add('active'))
searchButtonClose.addEventListener('click', (event) => {
  event.preventDefault()
  searchForm.classList.remove('active')
})
