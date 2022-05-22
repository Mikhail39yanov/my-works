import { disableScroll, enableScroll, closeMenu, openMenu } from './helper-functions.js'

const links = document.querySelectorAll('[data-link]')
const menu = document.querySelector('[data-menu]')

links.forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault()

    if (menu.classList.contains('active')) closeMenu()

    const path = el.dataset.link
    showSection(path)
  })
})

function showSection(path) {
  const targetSection = document.getElementById(path)

  targetSection.scrollIntoView({
    behavior: 'smooth'
  })
}
