// 'use strict'
(function () {
	let keyList = '';

	// Заголовок h1
	function createAppTitle(title) {
		let appTitle = document.createElement('h2');
		appTitle.innerHTML = title;
		return appTitle;
	};

	// Форма инпут и кнопка
	function createTodoItemForm() {
		// Создаем элементы
		let form = document.createElement('form');
		let input = document.createElement('input');
		let buttonWrapper = document.createElement('div');
		let button = document.createElement('button');

		// Расставляем атрибуты созданным элементам
		form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.placeholder = 'Введите название дела';
		buttonWrapper.classList.add('input-group-append');
		button.classList.add('btn', 'btn-primary');
		button.disabled = true; // Устанавливаем disabled на кнопке
		button.textContent = 'Добавить дело';

		// Создаю функцию которая убирает и добавляет атрибут disabled
		function setDisabledButtonForm() {
			let inputForm = input.value; // Получаем и обновляем значение каждый раз при вводе input
			if (inputForm == '') {
				button.disabled = true;
			} else {
				button.disabled = false;
			};
		};

		input.addEventListener('input', setDisabledButtonForm);

		// Все созданное добавляем в ДОМ
		buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

		// Должна получиться такая форма
		// <form class="input-group mb-3">
		// 	<input class="form-control" placeholder="Введите название дела">
		// 	<div class ="input-group-append">
		// 	<button class ="btn btn-primary">Добавить дело</button>
		// 	</div>
		// </form>

		// Возвращаем обьект form с доступом к input и button
		return {
			form,
			input,
			button,
		};
	};

	// Список ul
	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		return list;
	};

	// li
	function createTodoItem(name, done = false) {
		let item = document.createElement('li');
		// кнопки помещаем в элемент div группу
		let buttonGroup = document.createElement('div');
		let doneButton = document.createElement('button'); // кнопка сделанное дело
		let deleteButton = document.createElement('button'); // кнопка удалить дело

		// Расставляем атрибуты созданным элементам li и добавляем стили с помощью CSS
		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
		// Присваем элементу li содержимое name, который передаем в качестве аргумента функции createTodoItem
		// Свойство textContent потому-что пользователь может передать символы, которые необходимо добавить в контент, и innerHTML будет не уместно(так как может быть превращения в теги)
		item.textContent = name;

		// Проверка обьекта на свойство done
		if (done === true) {
			item.classList.toggle('list-group-item-success');
		};

		// Расставляем атрибуты кнопкам button и добавляем стили с помощью CSS
		buttonGroup.classList.add('btn-group', 'btn-group-sm');
		doneButton.classList.add('btn', 'btn-success');
		doneButton.textContent = 'Готово';
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.textContent = 'Удалить';

		// Размещаем в ДОМ группу buttonGroup с кнопками и группу с кнопками добавлем в элемент li
		buttonGroup.append(doneButton);
		buttonGroup.append(deleteButton);
		item.append(buttonGroup);

		// Возвращаем обьект item с доступом к кнопкам doneButton и deleteButton
		return {
			item,
			doneButton,
			deleteButton,
		};
	};

	// Приложение createTodoApp
	function createTodoApp(container, title = 'Список дел', arrayTodos = [], key) {
		// Получаем контейнер <div class="container" id="todo-app"></div>, куда будем размещать приложение TODO
		// let container = document.getElementById('todo-app');

		// Вызываем все функции по очередности createAppTitle, createTodoItemForm, createTodoList, createTodoItem
		let appTitle = createAppTitle(title);
		let todoItemForm = createTodoItemForm();
		let todList = createTodoList();

		keyList = key;

		// Получаем li из localStorage
		let localData = window.localStorage.getItem(keyList);

		if (localData !== null && localData !== '' && localData.length > 2) {
			arrayTodos = JSON.parse(localData)
		};

		for (let elem of arrayTodos) {
			let todoItem = createTodoItem(elem.name, elem.done);

			todoItem.doneButton.addEventListener('click', function () {
				todoItem.item.classList.toggle('list-group-item-success');
				saveList(key);
			});
			todoItem.deleteButton.addEventListener('click', function () {
				if (confirm('Вы уверены')) {
					todoItem.item.remove();
					saveList(key);
				};
			});
			todList.append(todoItem.item);
		};

		//! Код для демонстрации Для наглядности добавим 2 элемента в todList и дадим им названия и добавим в контейнер
		// let todoItems = [createTodoItem('Купить собаку корги'), createTodoItem('Купить новый кайт core')];
		// todList.append(todoItems[0].item); // обьект элемент li
		// todList.append(todoItems[1].item); // обьект элемент li

		// Размещаем полученные результат в ДОМ контейнер
		container.append(appTitle); // Заголовок
		container.append(todoItemForm.form); // Форма со свойством form
		container.append(todList); // Список дел

		// Браузер создает событие submit в форме по нажатию Enter или на кнопку дела (submit свойственен только форме)
		// Без события submit пришлось бы писать 2 кода на событие click и нажатие enter, submit упрошает
		// Регистрируем обработчик событие submit у формы
		todoItemForm.form.addEventListener('submit', function (e) {
			// эта строчка необходима для того чтобы предотвратить стандартное действие браузера
			// в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
			e.preventDefault();

			// игнорируем создание элемента, если пользователь ничего не ввел в поле
			if (!todoItemForm.input.value) {
				return;
			};

			let todoItem = createTodoItem(todoItemForm.input.value);
			// Добавим обработчики на кнопки
			// Кнопка выполнить красим в зеленый
			todoItem.doneButton.addEventListener('click', function () {
				todoItem.item.classList.toggle('list-group-item-success');
				saveList(key);
			});
			todoItem.deleteButton.addEventListener('click', function () {
				if (confirm('Вы уверены')) {
					todoItem.item.remove();
					saveList(key);
				};
			});
			// Создаем и добавляем элемент li в ДОМ с названием из поля для ввода
			todList.prepend(todoItem.item);

			// localStorage.setItem('key', JSON.stringify({ name: todoItemForm.input.value, done: false, }));

			//! Код для демонстрации Создаем элемент li при помощи createTodoItem и добавлем в ДОМ li с названием из поля для ввода
			// todList.append(createTodoItem(todoItemForm.input.value).item);

			// Очищаем поле для ввода, чтобы не пришлось удалять вручную
			todoItemForm.input.value = '';
			// Блокриуем кнопку
			todoItemForm.button.disabled = true;
			// Запускаем каждый раз saveList при добавления дела submit
			saveList(key);
		});
	};

	// Сохраняем li в localStorage
	function saveList(key) {
		let listArray = document.querySelectorAll('.list-group-item');
		let result = [];

		for (let item of listArray) {
			result.push({
				name: item.firstChild.textContent,
				done: item.classList.contains('list-group-item-success'),
			});
		};
		window.localStorage.setItem(key, JSON.stringify(result));
	};

	// localStorage.clear();

	window.createTodoApp = createTodoApp;
})();
