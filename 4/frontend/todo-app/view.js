import { createElement } from './helper-functions.js'
import { person, repository } from './config.js'

function createNavTodo() {

	const nav = createElement('nav', {
		classList: ['nav', 'mb-5'],
	});

	const linkI = createElement('a', {
		classList: ['nav-link'],
		attribute: {
			href: `?owner=Я`
		},
		textContent: 'Мои дела',
	}, nav);

	const linkFather = createElement('a', {
		classList: ['nav-link'],
		attribute: {
			href: `?owner=Папа`
		},
		textContent: 'Дела папы',
	}, nav);

	const linkMom = createElement('a', {
		classList: ['nav-link'],
		attribute: {
			href: `?owner=Мама`
		},
		textContent: 'Дела мамы',
	}, nav);

	return nav;
}

function createAppTitle(owner) {

	const appTitle = createElement('h2', {
		classList: ['header'],
	});

	if (owner) appTitle.textContent = person[owner].title

	return appTitle
};

function createButtonStorage(storage) {

	const buttonStorage = createElement('button', {
		classList: ['btn', 'btn-primary', 'mb-3'],
	});

	if (storage) buttonStorage.textContent = repository[storage]

	buttonStorage.addEventListener('click', () => {
		// window.localStorage.setItem('isLocalStorage', storage === 'local' ? 'api' : 'local')
		// window.location.reload()
		if (storage === 'local') {
			window.localStorage.setItem('isLocalStorage', false)
			window.location.reload()
		} else {
			window.localStorage.setItem('isLocalStorage', true)
			window.location.reload()
		}
	})

	return buttonStorage
}

function createTodoItemForm() {

	const form = createElement('form', {
		classList: ['input-group', 'mb-3'],
	});

	const input = createElement('input', {
		classList: ['form-control'],
		attribute: {
			placeholder: 'Введите название дела',
		}
	}, form);

	const buttonWrapper = createElement('div', {
		classList: ['input-group-append'],
	}, form);

	const button = createElement('button', {
		classList: ['btn', 'btn-primary'],
		textContent: 'Добавить дело',
	}, buttonWrapper);

	return {
		form,
		input,
		button,
	};
};

function createTodoList() {

	const list = createElement('ul', {
		classList: ['list-group'],
	});

	return list;
};

function createTodoItemElement(todoItem, { onDone, onDelete }, owner) {
	const doneClass = 'list-group-item-success';

	const item = createElement('li', {
		classList: ['list-group-item', 'd-flex', 'justify-content-between', 'align-item-center'],
		textContent: todoItem.name,
	});

	const buttonGroup = createElement('div', {
		classList: ['btn-group', 'btn-group-sm'],
	}, item);

	const doneButton = createElement('button', {
		classList: ['btn', 'btn-success'],
		textContent: 'Готово',
	}, buttonGroup);

	const deleteButton = createElement('button', {
		classList: ['btn', 'btn-danger'],
		textContent: 'Удалить',
	}, buttonGroup);

	if (todoItem.done) {
		item.classList.toggle(doneClass);
	}

	doneButton.addEventListener('click', () => {
		item.classList.toggle(doneClass);
		onDone({ todoItem, element: item }, person[owner].list);
		// saveList(person[owner].list);
	});

	deleteButton.addEventListener('click', () => {
		onDelete({ todoItem, element: item }, person[owner].list);
		// saveList(person[owner].list);
	});

	return item;
};

async function createTodoApp(container, storage, {
	owner,
	todoItemList = [],
	onCreateFormSubmit,
	onDoneClick,
	onDeleteClick,
}) {
	const todoItemForm = createTodoItemForm()
	const todoList = createTodoList()
	const hadlers = {
		onDone: onDoneClick,
		onDelete: onDeleteClick
	};

	container.append(createNavTodo())
	container.append(createAppTitle(owner))
	container.append(createButtonStorage(storage))
	container.append(todoItemForm.form)
	container.append(todoList)

	todoItemList.forEach(todoItem => todoList.append(createTodoItemElement(todoItem, hadlers, owner)))

	todoItemForm.form.addEventListener('submit', async event => {
		event.preventDefault()

		if (!todoItemForm.input.value) {
			return;
		};

		if (storage === 'local') {
			const todoItem = ({
				owner,
				name: todoItemForm.input.value.trim(),
			});
			todoList.append(createTodoItemElement(todoItem, hadlers, owner))
			onCreateFormSubmit(person[owner].list)
		} else {
			const todoItem = await onCreateFormSubmit({
				owner,
				name: todoItemForm.input.value.trim(),
			});
			todoList.append(createTodoItemElement(todoItem, hadlers, owner))
		}

		todoItemForm.input.value = ''
	});
};

// localStorage.clear();

export { createTodoApp }
