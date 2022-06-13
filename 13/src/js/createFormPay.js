import { el, setChildren } from 'redom'
import Cleave from 'cleave.js'
const valid = require('card-validator')
import { showInvalid, cleanInvalid, emailTest, checkValidate } from './helper-functions.js'
import '../styles/normalize.css'
import '../styles/style.scss'

export default function createFormPay() {

  const title = el('h3.card-title', 'Информация об оплате')
  const card = el('.card position-relative', { style: "width: 25rem;" })

  const form = el('form.card-body needs-validation #form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    console.log('Все ок')
  })

  const listPay = el('ul.list-pay list-unstyled', [
    el('li.list-item mastercard #mastercard'),
    el('li.list-item visa #visa'),
    el('li.list-item mir #mir'),
  ])

  setChildren(card, [form, listPay])

  //* Kарта ===================================
  const inputCard = el('input.form-control', { id: 'cardnumber', type: 'text', required: true })
  inputCard.addEventListener('input', () => cleanInvalid(inputCard))
  inputCard.addEventListener('blur', () => {
    const value = inputCard.value
    const numberValidation = valid.number(value)
    // console.log(numberValidation.card)

    if (!numberValidation.isPotentiallyValid || !numberValidation.isValid) showInvalid(inputCard)
    if (value === '') return

    checkValidate()
    numberValidation.card.type === 'american-express' ? securitycode.setAttribute('maxlength', 4) : securitycode.setAttribute('maxlength', 3)
  })

  const inputBlock1 = el('.mb-1 position-relative', [
    el('label.form-label', { for: 'cardnumber' }, 'Номер карты'),
    inputCard,
    el('.invalid-tooltip ', 'Проверьте номер карты')
  ])

  //* ММ/ГГ ===================================
  const inputDate = el('input.form-control', { id: 'expirationdate', type: 'text', required: true })
  inputDate.addEventListener('input', () => cleanInvalid(inputDate))
  inputDate.addEventListener('blur', () => {
    const yearNow = String(new Date().getFullYear())
    const monthNow = new Date().getMonth() + 1
    const dateValidation = valid.expirationDate(inputDate.value, Number(yearNow.slice(2, 4)))
    // console.log(inputDate.value)

    if (!(Number(dateValidation.month) >= monthNow + 1)) showInvalid(inputDate)
    if (!dateValidation.isPotentiallyValid || !dateValidation.isValid) showInvalid(inputDate)
    checkValidate()
  })

  const inputBlock2 = el('.mb-1 position-relative', [
    el('label.form-label', { for: 'expirationdate' }, 'ММ/ГГ'),
    inputDate,
    el('.invalid-tooltip', 'Проверьте дату')
  ])

  //* CVC/CVV ===================================
  const inputSecurityCode = el('input.form-control', { id: 'securitycode', type: 'password', maxlength: 3, required: true })
  inputSecurityCode.addEventListener('input', () => {
    inputSecurityCode.value = inputSecurityCode.value.replace(/^\D+$/, '')
    cleanInvalid(inputSecurityCode)
  })

  inputSecurityCode.addEventListener('blur', () => {
    const securitycodeValidation = valid.cvv(inputSecurityCode.value)
    // console.log(securitycodeValidation)

    if (!securitycodeValidation.isPotentiallyValid || !securitycodeValidation.isValid) showInvalid(inputSecurityCode)
    checkValidate()
  })

  const inputBlock3 = el('.mb-1 position-relative', [
    el('label.form-label', { for: 'securitycode' }, 'CVC/CVV'),
    inputSecurityCode,
    el('.invalid-tooltip', 'Неверный код')
  ])

  //* email для отправки онлайн-чека ===================================
  const inputEmail = el('input.form-control', { id: 'email', type: 'email', required: true, placeholder: 'name@example.com' })
  inputEmail.addEventListener('input', () => cleanInvalid(inputEmail))
  inputEmail.addEventListener('blur', () => {
    if (emailTest.call(inputEmail)) showInvalid(inputEmail)
    checkValidate()
  })

  const inputBlock4 = el('.mb-3 position-relative', [
    el('label.form-label', { for: 'email' }, 'email для отправки онлайн-чека'),
    inputEmail,
    el('.invalid-tooltip', 'Неверный email')
  ])

  const button = el('button.btn btn-primary', { disabled: true }, 'Оплатить')

  setChildren(form, [inputBlock1, inputBlock2, inputBlock3, inputBlock4, button])

  // Маска для карты
  new Cleave(inputCard, {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
      // update UI ...
      document.querySelectorAll('.list-item').forEach(card => card.id === type ? card.classList.add('active') : card.classList.remove('active'))
    },
  })

  // Маска для даты
  new Cleave(inputDate, {
    date: true,
    datePattern: ['m', 'y'],
  })

  return el('.container py-5 center', [title, card])
}
