import { createElement } from './helper-functions.js'
import { person } from './config.js'
import * as api from './api.js'
import * as local from './local-storage.js'

const cssPromises = {}
let isLocalStorage; // ключ который положим в LocalStorage при запуске приложения
let storage; // флаг хранилища

isLocalStorage = window.localStorage.getItem('isLocalStorage')
if (isLocalStorage === 'true') {
	storage = 'local'
	console.log('Выбрано локальное хранилище', storage)
} else if (isLocalStorage === 'false') {
	storage = 'api'
	console.log('Выбрано серверное хранилище', storage)
} else {
	window.localStorage.setItem('isLocalStorage', true)
	isLocalStorage = window.localStorage.getItem('isLocalStorage')
	storage = 'local'
	console.log('По умолчанию выбрано локальное хранилище', storage)
}

const appContainer = document.getElementById('todo-app')
const searchParams = new URLSearchParams(window.location.search)
const owner = searchParams.get('owner') == null ? 'Я' : searchParams.get('owner')

function loadResource(src) {

	// Модуль JS
	if (src.endsWith('.js')) return import(src)

	// Файл CSS
	if (src.endsWith('.css')) {
		if (!cssPromises[src]) {

			const link = createElement('link', {
				attribute: {
					rel: `stylesheet`,
					href: src,
				},
			}, document.head)

			cssPromises[src] = new Promise(resolve => {
				link.addEventListener('load', () => resolve())
			})
		}
		return cssPromises[src]
	}

	if (src === 'local') {
		// Данные из локального хранилища
		return local.getTodoList(person[owner].list)
	} else {
		// Данные сервера
		return api.getTodoList(owner)
	}

}

if (storage === 'local') {
	Promise.all([
		'./view.js',
		'local',
		'css/normalize.css',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
	].map(src => loadResource(src)))
		.then(([pageModule, todoItemList]) => {
			pageModule.createTodoApp(appContainer, storage, {
				owner,
				todoItemList,
				onCreateFormSubmit: local.saveList,
				onDoneClick: local.switchTodoItemDone,
				onDeleteClick: local.deleteTodoItem,
			})
		})
} else {
	Promise.all([
		'./view.js',
		`http://localhost:3000/api/todos?owner=${owner}`,
		'css/normalize.css',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
	].map(src => loadResource(src)))
		.then(([pageModule, todoItemList]) => {
			pageModule.createTodoApp(appContainer, storage, {
				owner,
				todoItemList,
				onCreateFormSubmit: api.creteTodoItem,
				onDoneClick: api.switchTodoItemDone,
				onDeleteClick: api.deleteTodoItem,

			})
		})
}
