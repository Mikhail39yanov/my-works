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

	// Заголовок h1
	function createAppTitleElement() {
		const appTitle = createElem({
			tag: 'h1',
			classList: 'mb-3',
			textContent: 'Список статей',
		});
		return appTitle;
	};

	// Список ol
	function createArticleListElement() {
		const articleList = createElem({
			tag: 'ol',
			classList: 'list-group list-group-numbered mb-3',
		});
		return articleList;
	};

	// Статья li
	function createArticleItemElement(element, pageNumber) {
		const itemArticle = createElem({
			tag: 'li',
			classList: 'list-group-item list-group-item-primary list-group-item-action',
		});
		const linkArticle = createElem({
			tag: 'a',
			href: `./post.html?id=${element.id}&page=${pageNumber}`,
			textContent: element.title,
		});

		itemArticle.append(linkArticle);

		return itemArticle;
	}

	// Пагинация ul
	function createPaginationListElement() {
		const paginationList = createElem({
			tag: 'ul',
			classList: 'pagination flex-wrap',
		});
		return paginationList;
	};

	// Пагинация li
	function createPaginationItemElement(pageNumber) {
		const itemPage = createElem({
			tag: 'li',
			classList: 'page-item',
		});
		const linkPage = createElem({
			tag: 'a',
			classList: 'page-link',
			href: `./index.html?page=${pageNumber}`,
			textContent: pageNumber,
		});

		itemPage.append(linkPage);
		return itemPage;
	}

	document.addEventListener('DOMContentLoaded', () => {

		// Приложение
		async function createApp(container) {

			// Параметры page, на какой именно странице находимся сейчас
			let location = window.location.search
			let searchParams = new URLSearchParams(location)
			let pageNumber = searchParams.get('page') == null ? 1 : searchParams.get('page');
			console.log('Страница', pageNumber);

			const appTitleElement = createAppTitleElement();
			const articleListElement = createArticleListElement();
			const paginationListElement = createPaginationListElement();

			container.append(appTitleElement);
			container.append(articleListElement);
			container.append(paginationListElement);

			// Отправляем запрос и получаем список статей
			const response = await fetch(`https://gorest.co.in/public/v1/posts?page=${pageNumber}`);
			const dataArticleList = await response.json()
			console.log('Список статей', dataArticleList);

			// Добавляем список статей в ДОМ дерево
			dataArticleList.data.forEach(element => {
				const articleItemElement = createArticleItemElement(element, pageNumber);
				articleListElement.append(articleItemElement);
			});

			// Добавляем пагинацию в ДОМ дерево
			for (let i = 0; i < dataArticleList.meta.pagination.pages; ++i) {
				const paginationItemElement = createPaginationItemElement(i + 1);
				paginationListElement.append(paginationItemElement);
			}
		}

		createApp(document.getElementById('container'));
	});
})();
