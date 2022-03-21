import {
	body,
	WAIT_TIME_MS,
	URL,
	// hash,
	// dirSort,
	// colSort,
} from './config.js';

import {
	ARROW_ICON,
	ALPHABET_ICON,
	ADD_CLIENT_ICON,
	ADD_CONTACTS_ICON,
	EDIT_ICON,
	DELETE_ICON,
	DELETE_CONTACT_ICON,
	VK_ICON,
	FB_ICON,
	PHONE_ICON,
	MAIL_ICON,
	MAIL_ADD_ICON,
	CONTACTS,
} from './data.js';

import {
	createElement,
	clearList,
	sortClients,
	disableScroll,
	enableScroll,
	parseDate,
	selectToggle,
	selectChouse,
	closeOthersSelects,
	addAnimation,
	disableLoader,
	startLoading,
	stopLoading,
	formValidate,
	emailTest,
	telTest,
	formAddError,
	formRemoveError,
	delay,
	debounce,
	// renderSearchList,
	// showClientInTable,
} from './helper-function.js';

import {
	fetchGetAllClients,
	fetchGetClient,
	fetchGetSearchClient,
	fetchPostCreateClient,
	fetchPatchUpdateClient,
	fetchDeleteClient,
} from './api.js';

let hash = window.location.hash;
let dirSort; // флаг направления
let colSort; // флаг колонки

let listItems = []; // NodeList при поисковой строке
let focusedItem = -1;

function createHeader({ onFilter }) {

	const headerElem = createElement('header', {
		classList: ['header'],
	});

	const headerContainerElem = createElement('div', {
		classList: ['header__container', 'container'],
	}, headerElem);

	const headerLinkElem = createElement('a', {
		classList: ['header__link'],
	}, headerContainerElem);

	const headerLogoElem = createElement('img', {
		classList: ['header__logo'],
		attribute: {
			src: 'img/header/logo.svg',
			alt: 'skb',
		},
	}, headerLinkElem);

	const formElem = createElement('form', {
		classList: ['header__form', 'form-search'],
	}, headerContainerElem);

	const formInputElem = createElement('input', {
		classList: ['form-search__input'],
		attribute: {
			type: 'text',
			placeholder: 'Введите запрос',
			ariaLabel: 'Введите запрос',
			id: 'filter',
			autocomplete: 'off',
		},
	}, formElem);

	const formSearchlist = createElement('ul', {
		classList: ['form-search__list'],
		attribute: {
			id: 'search',
		},
	}, formElem);

	onFilter = debounce(onFilter, WAIT_TIME_MS);
	formInputElem.addEventListener('input', onFilter);

	formInputElem.addEventListener('keydown', e => {

		let keyCode = e.keyCode;

		if (keyCode === 40) { // arrow down
			e.preventDefault();
			focusItem(++focusedItem);
		} else if (keyCode === 38) { //arrow up
			e.preventDefault();
			if (focusedItem > 0) focusedItem--;
			focusItem(focusedItem);
		} else if (keyCode === 27) { // escape
			setActiveList(false);
		} else if (keyCode === 13) { // enter
			e.preventDefault();
			selectItem(focusedItem);
		}
	});

	return headerElem;
}

function createMain({ onSort }) {

	const mainElem = createElement('main', {
		classList: ['main'],
	});

	const sectionHeroElem = createElement('section', {
		classList: ['hero'],
	}, mainElem);

	const heroContainerElem = createElement('div', {
		classList: ['hero__container', 'container'],
	}, sectionHeroElem);

	const tableElem = createElement('table', {
		classList: ['table'],
	}, heroContainerElem);

	const tCaptionElem = createElement('caption', {
		classList: ['table__caption'],
		textContent: 'Клиенты',
	}, tableElem);

	const tHeadElem = createElement('thead', {}, tableElem);

	const tBodyElem = createElement('tbody', {
		classList: ['table__tbody'],
	}, tableElem);

	const tHeadRowElem = createElement('tr', {
		classList: ['table__head-row'],
	}, tHeadElem);

	const cellIdElem = createElement('th', {
		classList: ['table__head-cell'],
	}, tHeadRowElem);

	const buttonIdElem = createElement('button', {
		classList: ['table__head-button', 'table__head-button--text', 'table__head-button--actve', 'btn-reset'],
		attribute: {
			'data-column': 'id',
		},
		innerHTML: `id${ARROW_ICON}`,
	}, cellIdElem);

	const cellFioElem = createElement('th', {
		classList: ['table__head-cell'],
	}, tHeadRowElem);

	const buttonFioElem = createElement('button', {
		classList: ['table__head-button', 'btn-reset'],
		attribute: {
			'data-column': 'fio',
		},
		innerHTML: `Фамилия Имя Отчество${ARROW_ICON}${ALPHABET_ICON}`,
	}, cellFioElem);

	const cellCreatedAtElem = createElement('th', {
		classList: ['table__head-cell'],
	}, tHeadRowElem);

	const buttonCreatedAtElem = createElement('button', {
		classList: ['table__head-button', 'btn-reset'],
		attribute: {
			'data-column': 'createdAt',
		},
		innerHTML: `Дата и время создания${ARROW_ICON}`,
	}, cellCreatedAtElem);

	const cellUpdatedAtElem = createElement('th', {
		classList: ['table__head-cell'],
	}, tHeadRowElem);

	const buttonUpdatedAtElem = createElement('button', {
		classList: ['table__head-button', 'btn-reset'],
		attribute: {
			'data-column': 'updatedAt',
		},
		innerHTML: `Последние изменения${ARROW_ICON}`,
	}, cellUpdatedAtElem);

	const cellContactsElem = createElement('th', {
		classList: ['table__head-cell'],
		textContent: 'Контакты',
	}, tHeadRowElem);

	const cellActionsElem = createElement('th', {
		tag: 'th',
		classList: ['table__head-cell'],
		textContent: 'Действия',
	}, tHeadRowElem);

	const spinerContainerElem = createElement('div', {
		classList: ['spiner-container'],
	}, heroContainerElem);

	const spinerElem = createElement('div', {
		classList: ['spiner'],
	}, spinerContainerElem);

	const buttonAddClientElem = createElement('button', {
		classList: ['hero__button', 'btn-reset', 'hero__button--hidden', 'js-open-modal-add'],
		attribute: {
			'data-target': 'add',
		},
		innerHTML: `${ADD_CLIENT_ICON}Добавить клиента`,
	}, heroContainerElem);

	buttonAddClientElem.addEventListener('click', function () {
		addAnimation();
		const typeModal = this.dataset.target;
		document.getElementById('app').append(createModalWithForm(typeModal, null, null, handlers));
		disableScroll();
	});

	const groupSortCol = [buttonIdElem, buttonFioElem, buttonCreatedAtElem, buttonUpdatedAtElem];
	groupSortCol.forEach(el => {
		el.addEventListener('click', function (event) {

			document.querySelectorAll('[data-column]').forEach(el => {
				el.classList.remove('table__head-button--actve');
			})

			event.currentTarget.classList.add('table__head-button--actve');
			if (this.firstElementChild.classList.contains('table__head-button-icon--up')) {
				this.firstElementChild.classList.add('table__head-button-icon--down');
				this.firstElementChild.classList.remove('table__head-button-icon--up');
			} else {
				this.firstElementChild.classList.add('table__head-button-icon--up');
				this.firstElementChild.classList.remove('table__head-button-icon--down');
			}

			onSort.call(this);
		});
	});

	return mainElem;
}

function createModalWithForm(type = null, clientItem = null, element = null, { onSave, onDeleteItem, closeModal }) {

	const modalsOverlayElem = createElement('div', {
		classList: ['modals-overlay', 'fixblock'],
	});

	const modalElem = createElement('div', {
		classList: ['modal'],
	}, modalsOverlayElem);

	const modalTitleWrapperElem = createElement('div', {
		classList: ['modal__title-container'],
	}, modalElem);

	const modalTitleElem = createElement('h2', {
		classList: ['modal__title'],
		textContent: 'Новый клиент',
	}, modalTitleWrapperElem);

	const modalTextElem = createElement('span', {
		classList: ['modal__text'],
		textContent: '',
	}, modalTitleWrapperElem);

	const modalDescriptionElem = createElement('p', {
		classList: ['modal__descr', 'modal__descr--hideen'],
		textContent: 'Вы действительно хотите удалить данного клиента?',
	}, modalElem);

	const buttonCloseElem = createElement('button', {
		classList: ['modal__button-close', 'btn-reset'],
	}, modalElem);

	const formElem = createElement('form', {
		classList: ['modal__form', 'form', 'js-form'],
		noValidate: 'novalidate',
	}, modalElem);

	const formGroupSurnameElem = createElement('div', {
		classList: ['form__group'],
	}, formElem);

	const inputSurnameElem = createElement('input', {
		classList: ['form__input', 'js-input'],
		attribute: {
			type: 'text',
			name: 'surname',
			placeholder: 'Фамилия*',
		},
	}, formGroupSurnameElem);

	const labelSurnameElem = createElement('label', {
		classList: ['form__label'],
		textContent: 'Фамилия',
	}, formGroupSurnameElem);

	const labelSurnameStarTextElem = createElement('span', {
		classList: ['form__label-text'],
		textContent: '*',
	}, labelSurnameElem);

	const formGroupNameElem = createElement('div', {
		classList: ['form__group'],
	}, formElem);

	const inputNameElem = createElement('input', {
		classList: ['form__input', 'js-input'],
		attribute: {
			type: 'text',
			name: 'name',
			placeholder: 'Имя*',
		},
	}, formGroupNameElem);

	const labelNameElem = createElement('label', {
		classList: ['form__label'],
		textContent: 'Имя',
	}, formGroupNameElem);

	const labelNameStarTextElem = createElement('span', {
		classList: ['form__label-text'],
		textContent: '*',
	}, labelNameElem);

	const formGroupLastNameElem = createElement('div', {
		classList: ['form__group'],
	}, formElem);

	const inputLastNameElem = createElement('input', {
		classList: ['form__input'],
		attribute: {
			type: 'text',
			name: 'lastname',
			placeholder: 'Отчество',
		},
	}, formGroupLastNameElem);

	const labelLastNameElem = createElement('label', {
		classList: ['form__label'],
		textContent: 'Отчество',
	}, formGroupLastNameElem);

	const formGroupContactsElem = createElement('div', {
		classList: ['form__group', 'form__group--background'],
	}, formElem);

	const formListContactsElem = createElement('ul', {
		classList: ['form__list'],
	}, formGroupContactsElem);

	const buttonAddContactElem = createElement('button', {
		classList: ['form__button-add-contact', 'btn-reset'],
		innerHTML: `${ADD_CONTACTS_ICON}Добавить контакт`,
	}, formGroupContactsElem);

	const listErrors = createElement('ul', {
		classList: ['form__list-errors'],
	}, formElem);

	const buttonSaveClientElem = createElement('button', {
		classList: ['form__button-save', 'button-secondary', 'btn-reset'],
		attribute: {
			type: 'submit',
		},
		textContent: 'Сохранить',
	}, formElem);

	const buttonDeleteClientElem = createElement('button', {
		classList: ['modal__button-delete', 'button-secondary', 'btn-reset', 'modal__button-delete--hidden'],
		textContent: 'Удалить',
	}, modalElem);

	const loadIconElem = createElement('span', {
		classList: ['form__button-load', 'form__button-load--hidden'],
	}, buttonSaveClientElem);

	const buttonCancelClientElem = createElement('button', {
		classList: ['modal__button-cancel', 'btn-reset'],
		textContent: 'Отмена',
	}, modalElem);

	modalElem.addEventListener('click', event => event._isClickWithInModal = true);

	buttonCloseElem.addEventListener('click', () => {
		closeModal.call(modalsOverlayElem);
	});

	buttonCancelClientElem.addEventListener('click', () => {
		closeModal.call(modalsOverlayElem);
	});

	modalsOverlayElem.addEventListener('click', event => {
		if (event._isClickWithInModal) return;
		closeModal.call(modalsOverlayElem);
	});

	body.addEventListener('keydown', function (event) {
		// console.log(event.key);
		if (event.key === 'Escape') closeModal.call(modalsOverlayElem);
	});

	// body.addEventListener('keydown', keyBoardCloseModal);

	inputSurnameElem.addEventListener('input', formRemoveError);

	inputNameElem.addEventListener('input', formRemoveError);

	buttonAddContactElem.addEventListener('click', function (event) {
		event.preventDefault();
		createContactLi(formListContactsElem);
		if (formListContactsElem.childNodes.length === 10) this.classList.add('form__button-add-contact--hidden');
	});

	if (type === 'edit') {
		modalTitleElem.textContent = 'Изменить данные';
		modalTextElem.textContent = `ID: ${clientItem.id}`;
		inputSurnameElem.value = `${clientItem.surname}`;
		inputNameElem.value = `${clientItem.name}`;
		inputLastNameElem.value = `${clientItem.lastName}`;
		buttonCancelClientElem.textContent = 'Удалить клиента';

		buttonCancelClientElem.addEventListener('click', () => {
			onDeleteItem.call(element, clientItem);
			closeModal.call(modalsOverlayElem);
		});

		clientItem.contacts.forEach(el => {
			createContactLi(formListContactsElem, el);
		});

	} else if (type === 'delete') {
		modalElem.classList.add('modal--height');
		modalTitleWrapperElem.classList.add('modal__title-container--center');
		modalTitleElem.textContent = 'Удалить клиента';
		modalDescriptionElem.classList.remove('modal__descr--hideen');
		buttonDeleteClientElem.classList.remove('modal__button-delete--hidden');
		formElem.remove();

		buttonDeleteClientElem.addEventListener('click', () => {
			onDeleteItem.call(element, clientItem);
			closeModal.call(modalsOverlayElem);
		});
	}

	formElem.addEventListener('submit', (event) => {

		event.preventDefault();

		let error = formValidate();

		if (error === 0) {
			loadIconElem.classList.remove('form__button-load--hidden');
			modalElem.classList.add('_sending');

			const clientData = {
				surname: inputSurnameElem.value.trim(),
				name: inputNameElem.value.trim(),
				lastName: inputLastNameElem.value.trim(),
				contacts: [],
				id: modalTextElem.textContent.replace('ID: ', ''),
			};

			formListContactsElem.childNodes.forEach(el => {
				const input = el.querySelector('.form__contact-input');
				const contact = {
					type: el.innerText,
					value: input.value,
				};
				clientData.contacts.push(contact);
			});

			onSave(clientData, { closeModal, element: modalsOverlayElem });
		} else {
			document.querySelector('.form__list-errors').innerHTML = '';
			let listErrors = document.querySelectorAll('.js-input-error');
			for (let i = 0; i < listErrors.length; i++) {

				let value;
				if (listErrors[i].name === 'surname') {
					value = 'Введите фамилию клиента';
				} else if (listErrors[i].name === 'name') {
					value = 'Введите имя клиента'
				} else {
					value = 'Контакт введен неправильно'
				}

				const error = createElement('li', {
					classList: ['form__item-error'],
					textContent: `${value}`,
				}, document.querySelector('.form__list-errors'));
			}
			return;
		}
	});

	return modalsOverlayElem;
}

function createClientTr(clientItem, { onEdit, onDelete }) {

	const dataTimeCreatedAtItem = parseDate(clientItem.createdAt);
	const dataTimeUpdatedAtItem = parseDate(clientItem.updatedAt);

	const clientRow = createElement('tr', {
		classList: ['table__body-row'],
		attribute: {
			'data-id': clientItem.id,
		},
	});

	const cellId = createElement('td', {
		classList: ['table__body-cell'],
		textContent: clientItem.id,
	}, clientRow);

	const cellFio = createElement('td', {
		classList: ['table__body-cell'],
		textContent: `${clientItem.surname} ${clientItem.name} ${clientItem.lastName}`,
	}, clientRow);

	const cellCreatedAt = createElement('td', {
		classList: ['table__body-cell'],
	}, clientRow);

	const dataCreatedAtContainerElem = createElement('div', {
		classList: ['table__body-group-date'],
	}, cellCreatedAt);

	const dataTextCreatedAtElem = createElement('span', {
		classList: ['table__body-date'],
		textContent: dataTimeCreatedAtItem.date,
	}, dataCreatedAtContainerElem);

	const timeTextCreatedAtElem = createElement('span', {
		classList: ['table__body-time'],
		textContent: dataTimeCreatedAtItem.time,
	}, dataCreatedAtContainerElem);

	const cellUpdatedAt = createElement('td', {
		classList: ['table__body-cell'],
	}, clientRow);

	const dataUpdatedAtContainerElem = createElement('div', {
		classList: ['table__body-group-date'],
	}, cellUpdatedAt);

	const dataTextUpdatedAtElem = createElement('span', {
		classList: ['table__body-date'],
		textContent: dataTimeUpdatedAtItem.date,
	}, dataUpdatedAtContainerElem);

	const timeTextUpdatedAtElem = createElement('span', {
		classList: ['table__body-time'],
		textContent: dataTimeUpdatedAtItem.time,
	}, dataUpdatedAtContainerElem);

	const cellContacts = createElement('td', {
		classList: ['table__body-cell'],
	}, clientRow);

	const contactsContainer = createElement('div', {
		classList: ['table__body-group-container'],
	}, cellContacts);

	const contactlList = createElement('ul', {
		classList: ['table__body-group', 'table__body-social'],
	}, contactsContainer);

	const cellActions = createElement('td', {
		classList: ['table__body-cell'],
	}, clientRow);

	const buttonGroup = createElement('div', {
		classList: ['table__body-group-button'],
	}, cellActions);

	const buttonEdit = createElement('button', {
		classList: ['table__body-button-edit', 'btn-reset'],
		attribute: {
			'data-target': 'edit',
		},
		innerHTML: `${EDIT_ICON}Изменить`,
	}, buttonGroup);

	const buttonDelete = createElement('button', {
		classList: ['table__body-button-delete', 'btn-reset'],
		attribute: {
			'data-target': 'delete',
		},
		innerHTML: `${DELETE_ICON}Удалить`,
	}, buttonGroup);

	buttonEdit.addEventListener('click', function () {
		const typeModal = this.dataset.target;
		onEdit({ clientItem, element: clientRow }, typeModal);
	});

	buttonDelete.addEventListener('click', function () {
		const typeModal = this.dataset.target;
		onDelete({ clientItem, element: clientRow }, typeModal);
	});

	clientItem.contacts.forEach(el => {
		const contact = createContact(el, CONTACTS[el.type].icon, CONTACTS[el.type].prefix);
		contactlList.append(contact);
	});

	if (contactlList.childNodes.length > 5) {

		contactlList.childNodes[4].classList.add('table__body-item--hidden');

		const buttonAllContacts = createElement('button', {
			classList: ['table__body-button-all-contacts', 'btn-reset'],
			textContent: `+${Number(contactlList.childNodes.length) - 4}`,
		}, contactsContainer);

		buttonAllContacts.addEventListener('click', (event) => {
			event.currentTarget.previousElementSibling.classList.add('table__body-social--active');
			event.currentTarget.previousElementSibling.childNodes.forEach(el => {
				el.classList.add('table__body-item--visible');
				contactlList.childNodes[4].classList.remove('table__body-item--hidden');
			})

			buttonAllContacts.classList.add('table__body-button-all-contacts--hidden');
		});
	}

	return clientRow;
}

function createContactLi(listContactsElem, contact = null) {

	const contactElem = createElement('li', {
		classList: ['form__item'],
	}, listContactsElem);

	const selectElem = createElement('div', {
		classList: ['form__secelet', 'select'],
	}, contactElem);

	const selectHeaderElem = createElement('div', {
		classList: ['select__header'],
	}, selectElem);

	const selectBodyElem = createElement('div', {
		classList: ['select__body'],
	}, selectElem);

	const selectItemTelElem = createElement('button', {
		classList: ['select__item', 'select__item--selectable', 'btn-reset'],
		textContent: 'Телефон',
	}, selectBodyElem);

	const selectCurrentItemElem = createElement('button', {
		classList: ['select__current', 'btn-reset'],
		textContent: `${selectItemTelElem.textContent}`,
	}, selectHeaderElem);

	const selectItemAddTelElem = createElement('button', {
		classList: ['select__item', 'btn-reset'],
		textContent: 'Доп.телефон',
	}, selectBodyElem);

	const selectItemEmailElem = createElement('button', {
		classList: ['select__item', 'btn-reset'],
		textContent: 'Email',
	}, selectBodyElem);

	const selectItemVkElem = createElement('button', {
		classList: ['select__item', 'btn-reset'],
		textContent: 'Vk',
	}, selectBodyElem);

	const selectItemFacebookElem = createElement('button', {
		classList: ['select__item', 'btn-reset'],
		textContent: 'Facebook',
	}, selectBodyElem);

	const inputGroupElem = createElement('div', {
		classList: ['form__contact-group'],
	}, contactElem);

	const inputElem = createElement('input', {
		classList: ['form__contact-input', 'js-input-contact'],
		attribute: {
			type: 'tel',
			name: 'contact',
			placeholder: 'Введите данные контакта',
		},
	}, inputGroupElem);

	const buttonDeleteContactContainer = createElement('div', {
		classList: ['form__contact-button-container', 'form__contact-button-container--hidden', 'tooltip'],
	}, inputGroupElem);

	const buttonDeleteContact = createElement('button', {
		classList: ['form__contact-button-delete', 'tooltip__button', 'btn-reset'],
		innerHTML: `${DELETE_CONTACT_ICON}`,
	}, buttonDeleteContactContainer);

	const buttonDeleteContactText = createElement('div', {
		classList: ['tooltip__text'],
		textContent: `Удалить\u00A0контакт`,
	}, buttonDeleteContactContainer);

	if (contact !== null) {

		selectCurrentItemElem.textContent = `${contact.type}`;
		inputElem.value = `${contact.value}`;
		inputElem.type = 'text';

		if (contact.type != '') inputElem.type = CONTACTS[contact.type].type;

		buttonDeleteContactContainer.classList.remove('form__contact-button-container--hidden');
	}

	inputElem.addEventListener('input', formRemoveError);

	buttonDeleteContact.addEventListener('click', () => {
		contactElem.remove();
	});

	inputElem.addEventListener('focus', () => {
		buttonDeleteContactContainer.classList.remove('form__contact-button-container--hidden');
	});

	selectCurrentItemElem.addEventListener('click', function (event) {
		event.preventDefault();
		selectToggle.call(selectElem);
	});

	document.addEventListener('click', (event) => {
		if (event.target.classList.contains('select__current')) {
			return;
		} else {
			closeOthersSelects();
		};
	});

	const selectGroupItem = [selectItemTelElem, selectItemAddTelElem, selectItemEmailElem, selectItemVkElem, selectItemFacebookElem];

	selectGroupItem.forEach(el => {
		el.addEventListener('click', function (event) {
			event.preventDefault();
			selectChouse.call(this);
		});
	})

	return contactElem;
}

function createContact(el, icon, prefix = '') {

	const contactElem = createElement('li', {
		classList: ['table__body-item', 'tooltip'],
	});

	const buttonTooltipElem = createElement('button', {
		classList: ['tooltip__button', 'btn-reset'],
		innerHTML: icon,
	}, contactElem);

	const textTooltipElem = createElement('div', {
		classList: ['tooltip__text'],
		attribute: {
			role: 'tooltip',
		},
	}, contactElem);

	const typeTooltipElem = createElement('span', {
		classList: ['tooltip__type'],
		textContent: `${el.type}: `,
	}, textTooltipElem);

	const linkTooltipElem = createElement('a', {
		classList: ['tooltip__link'],
		attribute: {
			href: `${prefix}${el.value}`,
			tabindex: `-1`,
		},
		textContent: el.value,
	}, textTooltipElem);

	return contactElem;
}

function renderTable(arr) {
	let copyArr = [...arr];

	clearList.call(document.querySelector('.table__tbody'))

	copyArr.forEach(el => {
		const clientTrElem = createClientTr(el, handlers);
		document.querySelector('.table__tbody').append(clientTrElem);
	});
}

async function updateClientsInTable() {

	const clientItemList = await fetchGetAllClients();

	let copyArr = [...clientItemList];

	copyArr = sortClients(copyArr);
	disableLoader();
	renderTable(copyArr);
}

function httpErrorHandler(response, { closeModal, element }) {
	if (response.status >= 400) {
		const error = createElement('li', {
			classList: ['form__item-error'],
			textContent: `Ошибка сервера${response.status}, Что-то пошло не так...`,
		}, document.querySelector('.form__list-errors'));

	} else if (response.status >= 200 || response.status < 300) {
		closeModal.call(element);
		updateClientsInTable();
	}
}

// Обработчики
const handlers = {

	async onSave(formData, { closeModal, element }) {

		if (formData.id !== '') {
			const response = await fetchPatchUpdateClient(formData);
			httpErrorHandler(response, { closeModal, element });

		} else if (formData) {
			const response = await fetchPostCreateClient(formData);
			httpErrorHandler(response, { closeModal, element });
		}
	},

	async onEdit({ clientItem, element }, type) {
		startLoading.call(element, type);
		const clientDataItem = await fetchGetClient(clientItem.id);
		window.document.location.hash = clientItem.id;
		addAnimation();
		stopLoading.call(element, type);
		document.getElementById('app').append(createModalWithForm(type, clientDataItem, element, handlers));
		disableScroll();
	},

	async onFilter() {
		const clientItemList = await fetchGetSearchClient(this.value);
		renderSearchList(this, clientItemList);
	},

	async onSort() {
		let search = document.getElementById('filter').value;
		colSort = this.getAttribute('data-column');
		dirSort = !dirSort;
		if (search !== '') {
			const clientItemList = await fetchGetSearchClient(search);
			const arr = sortClients(clientItemList, colSort, dirSort);
			renderTable(arr);
		} else {
			const clientItemList = await fetchGetAllClients();
			const arr = sortClients(clientItemList, colSort, dirSort);
			renderTable(arr);
		}
	},

	async onDeleteItem(clientItem) {
		this.remove();
		await fetchDeleteClient(clientItem.id);
	},

	onDelete({ clientItem, element }, type) {
		startLoading.call(element, type);
		addAnimation();
		stopLoading.call(element, type);
		document.getElementById('app').append(createModalWithForm(type, clientItem, element, handlers));
		disableScroll();
	},

	closeModal() {
		setTimeout(() => {
			this.remove();
		}, WAIT_TIME_MS);
		this.classList.remove('modals-overlay--visible');
		this.firstChild.classList.remove('modal--visible');
		enableScroll();
		window.location.hash = '';
	},
}

// Поиск с автодополнением:
function renderSearchList(selector, clientItemList) {
	const list = document.getElementById('search');

	if (!selector.value === '') setActiveList(false);
	clearList.call(list);
	listItems = [];

	clientItemList.forEach(item => {

		if (selector.value === '') return false

		const formSearchItem = createElement('li', {
			classList: ['form-search__item'],
			attribute: {
				'data-id': `${item.id}`,
			},
			textContent: `${item.surname} ${item.name}`
		}, list);

		listItems.push(formSearchItem);

		formSearchItem.addEventListener('click', function () {
			showClientInTable(this.dataset.id);
			clearList.call(list);
		});
	})

	if (listItems.length > 0) {
		setActiveList(true);
	} else {
		setActiveList(false);
	}

	const tableAllRow = document.querySelectorAll('.table__body-row');
	tableAllRow.forEach(el => {
		el.classList.remove('table__body-row--find');
	})
}

function unfocusAllItems() {
	listItems.forEach(el => { el.classList.remove('form-search__item--focused') });
};

function showClientInTable(clientItemId) {
	const tableAllRow = document.querySelectorAll('.table__body-row');
	tableAllRow.forEach(el => {
		if (el.dataset.id === clientItemId) el.classList.add('table__body-row--find');
		clearList.call(document.getElementById('search'));
	})
}

function focusItem(index) {
	if (!listItems.length) return false;
	if (index > listItems.length - 1) return focusItem(0);
	if (index < 0) return focusItem(listItems.length - 1);
	focusedItem = index;
	unfocusAllItems();
	listItems[focusedItem].classList.add('form-search__item--focused');
}

function selectItem(index) {
	const tableAllRow = document.querySelectorAll('.table__body-row');
	if (!listItems[index]) return false;
	document.getElementById('filter').value = listItems[index].textContent;
	tableAllRow.forEach(el => {
		if (el.dataset.id === listItems[index].dataset.id) el.classList.add('table__body-row--find');
		clearList.call(document.getElementById('search'));
	})
	setActiveList(false);
}

function setActiveList(active = true) {
	if (active) {
		document.getElementById('search').classList.add('form-search__list--active');
	} else {
		document.getElementById('search').classList.remove('form-search__list--active');
	}
}

async function createApp(wrapper) {

	wrapper.append(createHeader(handlers));
	wrapper.append(createMain(handlers));

	updateClientsInTable();

	if (hash) {
		const clientId = hash.replace('#', '');
		const clientDataItem = await fetchGetClient(clientId);
		const element = document.querySelector(`[data-id="${clientId}"]`);
		addAnimation();
		wrapper.append(createModalWithForm('edit', clientDataItem, element, handlers));
		disableScroll();
	}
}

export { createApp };
