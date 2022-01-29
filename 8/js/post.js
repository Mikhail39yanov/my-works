(() => {
	'use strict'

	// Создать элемент HTML
	const createElem = (prop) => {

		let el = document.createElement(prop.tag);

		if (prop.classList) el.classList = prop.classList;
		if (prop.htmlFor) el.htmlFor = prop.htmlFor;
		if (prop.id) el.id = prop.id;
		if (prop.href) el.href = prop.href;
		// if (prop.column) el.setAttribute('data-column', prop.column);
		if (prop.scope) el.scope = prop.scope;
		if (prop.type) el.type = prop.type;
		if (prop.placeholder) el.placeholder = prop.placeholder;
		if (prop.min) el.min = prop.min;
		if (prop.max) el.max = prop.max;
		if (prop.name) el.name = prop.name;
		if (prop.value) el.value = prop.value;
		if (prop.textContent) el.textContent = prop.textContent;
		if (prop.required) el.required = prop.required;
		if (prop.noValidate) el.noValidate = prop.noValidate;

		return el;
	}

	// Ссылка на предыдущую страницу
	function createBackElement(pageNumber) {
		const back = createElem({
			tag: 'a',
			href: `./index.html?page=${pageNumber}`,
			textContent: '<=Назад',
		});
		return back;
	};

	// Заголовок статьи
	function createTitleElement(title) {
		const appTitle = createElem({
			tag: 'h1',
			classList: 'mt-3 mb-3',
			textContent: title,
		});
		return appTitle;
	};

	// Содержимое статьи
	function createBodyElement(body) {
		const bodyTitle = createElem({
			tag: 'p',
			classList: 'mb-3',
			textContent: body,
		});

		return bodyTitle;
	};

	// Список комментариев ul
	function createComentListElement() {
		const comentList = createElem({
			tag: 'ul',
		});

		const title = createElem({
			tag: 'h2',
			classList: 'mb-3',
			textContent: 'Комментарии:',
		});

		comentList.append(title)
		return comentList;
	};

	// Комментарий li
	function createCommentElement(name, comment) {
		const item = createElem({
			tag: 'li',
			classList: 'mb-3',
		});

		const avtor = createElem({
			tag: 'h3',
			textContent: name,
		});

		const body = createElem({
			tag: 'p',
			textContent: comment,
		});

		item.append(avtor, body);

		return item;
	}

	document.addEventListener('DOMContentLoaded', () => {

		async function createApp(container) {

			let location = window.location.search
			let searchParams = new URLSearchParams(location)
			let pageId = searchParams.get('id') == null ? 1 : searchParams.get('id');
			console.log('id', pageId);
			let pageNumber = searchParams.get('page') == null ? 1 : searchParams.get('page');
			console.log('Страница', pageNumber);

			// Отправляем запрос и статью
			const response = await fetch(`https://gorest.co.in/public/v1/posts?id=${pageId}`);
			const dataArticle = await response.json()
			console.log('Статья', dataArticle);

			// Отправляем запрос и получаем комментарии
			const responseComents = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageId}`);
			const dataComents = await responseComents.json()
			console.log('Комментарий статьи', dataComents);

			const backLink = createBackElement(pageNumber);
			// Добавить статью в ДОМ
			const titleElement = createTitleElement(dataArticle.data[0].title);
			const bodyElement = createBodyElement(dataArticle.data[0].body);
			const comentListElement = createComentListElement();

			container.append(backLink);
			container.append(titleElement);
			container.append(bodyElement);
			container.append(comentListElement);

			// Добавить комментарии в ДОМ
			dataComents.data.forEach(element => {

				const commentElement = createCommentElement(element.name, element.body)
				comentListElement.append(commentElement);
			});
		}

		createApp(document.getElementById('container'));
	});
})();
