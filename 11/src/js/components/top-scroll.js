const buttonUp = document.querySelector('[data-scroll-top]')

window.addEventListener('scroll', () => {
  window.pageYOffset >= 100 ? buttonUp.classList.add('visible') : buttonUp.classList.remove('visible')
}, { passive: true })
buttonUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
