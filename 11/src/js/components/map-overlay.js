const overlayMap = document.querySelector('[data-map-overlay]')
const buttonClose = document.querySelector('[data-close-map-overlay]')
const buttonOpen = document.querySelector('[data-open-map-overlay]')

buttonClose.addEventListener('click', () => {
  overlayMap.classList.add('hidden')
  buttonOpen.classList.add('active')
})

buttonOpen.addEventListener('click', () => {
  overlayMap.classList.remove('hidden')
  buttonOpen.classList.remove('active')
})
