import { disableScroll, enableScroll, closeMenu, openMenu } from './helper-functions.js'

const menuOpen = document.querySelector('[data-open-menu]')
const menuClose = document.querySelector('[data-close-menu]')

menuOpen.addEventListener('click', () => openMenu())
menuClose.addEventListener('click', () => closeMenu())
