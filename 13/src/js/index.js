import { setChildren } from 'redom'
import createFormPay from './createFormPay.js'

const appContainer = document.getElementById('app-root')
setChildren(appContainer, createFormPay())
