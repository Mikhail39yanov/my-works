import { setAttr } from 'redom'

function showInvalid(input) {
  input.nextSibling.style.display = 'block'
  input.classList.add('is-invalid')
}

function cleanInvalid(input) {
  input.nextSibling.style.display = 'none'
  input.classList.remove('is-invalid')
}

function emailTest() {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !re.test(String(this.value).toLowerCase())
}

function checkValidate() {
  const arr = [...document.querySelectorAll('.form-control')].filter(input => input.value !== '' && !input.classList.contains('is-invalid'))
  arr.length === 4 ? setAttr(document.querySelector('.btn'), { disabled: false }) : setAttr(document.querySelector('.btn'), { disabled: true })
}

export { showInvalid, cleanInvalid, emailTest, checkValidate }
