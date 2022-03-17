(() => {
	// 'use strict'
	// import {
	// 	ARROW_ICON,
	// 	ALPHABET_ICON,
	// 	ADD_CLIENT_ICON,
	// 	ADD_CONTACTS_ICON,
	// 	EDIT_ICON,
	// 	DELETE_ICON,
	// 	DELETE_CONTACT_ICON,
	// 	VK_ICON,
	// 	FB_ICON,
	// 	PHONE_ICON,
	// 	MAIL_ICON,
	// 	MAIL_ADD_ICON,
	// } from './data.js';

	// import {
	// 	disableScroll,
	// 	enableScroll,
	// 	parseDate,
	// 	selectToggle,
	// 	selectChouse,
	// 	closeOthersSelects,
	// 	// addAnimation,
	// 	disableLoader,
	// 	startLoading,
	// 	stopLoading,
	// } from './helper-function.js';

	const body = document.body;
	const WAIT_TIME_MS = 300;
	const URL = 'http://localhost:3000/api/clients';
	let hash = window.location.hash;
	let dirSort; // флаг направления
	let colSort; // флаг колонки
	let timerId; // флаг таймера

	const delay = ms => {
		return new Promise(resolve => setTimeout(() => resolve(), ms));
	};

	const debounce = (fn, ms) => {
		let timerId;
		return function () {
			const fnCall = () => { fn.apply(this, arguments) }

			clearTimeout(timerId);
			timerId = setTimeout(fnCall, ms)
		}
	}

	function createElement(tag, options, parent = null) {

		const el = document.createElement(tag);

		for (const [key, value] of Object.entries(options)) {
			if (key === 'classList') {
				for (let i = 0; i < value.length; i++) {
					el.classList.add(value[i]);
				}
			} else if (key === 'attribute') {
				for (const [prop, propVal] of Object.entries(value)) {
					el.setAttribute(prop, propVal);
				}
			} else {
				el[key] = value;
			}
		}

		if (parent !== null) {
			parent.append(el);
		}

		return el;
	}

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
			},
		}, formElem);

		onFilter = debounce(onFilter, WAIT_TIME_MS);
		formInputElem.addEventListener('input', onFilter);

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
				'data-modal': 'add',
			},
			innerHTML: `${ADD_CLIENT_ICON}Добавить клиента`,
		}, heroContainerElem);

		buttonAddClientElem.addEventListener('click', (event) => {
			addAnimation();
			const typeModal = event.target.dataset.modal;
			body.append(createModalWithForm(typeModal, null, null, handlers));
			disableScroll();
		});

		const groupSortCol = [buttonIdElem, buttonFioElem, buttonCreatedAtElem, buttonUpdatedAtElem];
		groupSortCol.forEach(el => {
			el.addEventListener('click', function (event) {

				document.querySelectorAll('[data-column]').forEach(el => {
					el.classList.remove('table__head-button--actve');
				})

				event.currentTarget.classList.add('table__head-button--actve');
				if (el.firstElementChild.classList.contains('table__head-button-icon--up')) {
					el.firstElementChild.classList.add('table__head-button-icon--down');
					el.firstElementChild.classList.remove('table__head-button-icon--up');
				} else {
					el.firstElementChild.classList.add('table__head-button-icon--up');
					el.firstElementChild.classList.remove('table__head-button-icon--down');
				}

				colSort = this.getAttribute('data-column');
				dirSort = !dirSort;

				onSort(colSort, dirSort)
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

		inputSurnameElem.addEventListener('input', () => {
			formRemoveError(inputSurnameElem);
		})

		inputNameElem.addEventListener('input', () => {
			formRemoveError(inputNameElem);
		})

		buttonCloseElem.addEventListener('click', (event) => {
			if (event.target === modalsOverlayElem) closeModal({ element: modalsOverlayElem });
			closeModal({ element: modalsOverlayElem });
		});

		buttonCancelClientElem.addEventListener('click', (event) => {
			if (event.target == modalsOverlayElem) closeModal({ element: modalsOverlayElem });
			closeModal({ element: modalsOverlayElem });
		});

		modalsOverlayElem.addEventListener('click', (event) => {
			if (event.target == modalsOverlayElem) closeModal({ element: modalsOverlayElem });
		});

		body.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') closeModal({ element: modalsOverlayElem });
		});

		buttonAddContactElem.addEventListener('click', (event) => {
			event.preventDefault();
			createContactLi(formListContactsElem);
			if (formListContactsElem.childNodes.length === 10) {
				buttonAddContactElem.classList.add('form__button-add-contact--hidden');
			};
		});


		if (type === 'edit') {
			modalTitleElem.textContent = 'Изменить данные';
			modalTextElem.textContent = `ID: ${clientItem.id}`;
			inputSurnameElem.value = `${clientItem.surname}`;
			inputNameElem.value = `${clientItem.name}`;
			inputLastNameElem.value = `${clientItem.lastName}`;
			buttonCancelClientElem.textContent = 'Удалить клиента';

			buttonCancelClientElem.addEventListener('click', () => {
				onDeleteItem({ clientItem, element })
				closeModal({ element: modalsOverlayElem });
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
				// const element = document.querySelector('[data-id]');
				onDeleteItem({ clientItem, element });
				closeModal({ element: modalsOverlayElem });
			});
		}

		formElem.addEventListener('submit', (event) => {

			event.preventDefault();

			let error = formValidate(formElem);

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
					// console.log(listErrors[i]);
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

	function formValidate(formElem) {
		let error = 0;
		let formRequiredInpute = document.querySelectorAll('.js-input');
		let formRequiredContact = document.querySelectorAll('.js-input-contact');
		// console.log(formRequiredInpute);
		// console.log(formRequiredContact);

		formRequiredInpute.forEach(input => {
			formRemoveError(input);

			if (input.value === '') {
				formAddError(input);
				error++;
			}
		})

		formRequiredContact.forEach(input => {
			formRemoveError(input);
			if (input.type === 'email') {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.type === 'tel') {
				if (telTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		})

		return error;
	}

	function emailTest(input) {
		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return !re.test(String(input.value).toLowerCase());
	}

	function telTest(input) {
		const re = /^\d[\d\(\)\ -]{4,14}\d$/;
		return !re.test(input.value);
	}

	function formAddError(input) {
		input.classList.add('js-input-error');
	}

	function formRemoveError(input) {
		input.classList.remove('js-input-error');
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
			textContent: clientItem.surname + ' ' + clientItem.name + ' ' + clientItem.lastName,
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
				'data-modal': 'edit',
			},
			innerHTML: `${EDIT_ICON}Изменить`,
		}, buttonGroup);

		const buttonDelete = createElement('button', {
			classList: ['table__body-button-delete', 'btn-reset'],
			attribute: {
				'data-modal': 'delete',
			},
			innerHTML: `${DELETE_ICON}Удалить`,
		}, buttonGroup);

		buttonEdit.addEventListener('click', (event) => {
			event.preventDefault();
			const typeModal = event.target.dataset.modal;
			onEdit({ clientItem, element: clientRow }, typeModal, event);
		});

		buttonDelete.addEventListener('click', (event) => {
			event.preventDefault();
			const typeModal = event.target.dataset.modal;
			onDelete({ clientItem, element: clientRow }, typeModal, event);
		});

		clientItem.contacts.forEach(el => {

			if (el.type == 'Телефон') {

				const icon = PHONE_ICON;
				const prefix = 'tel:';
				const contact = createContact(el, icon, prefix);

				contactlList.append(contact);

			} else if (el.type == 'Доп.телефон') {

				const icon = MAIL_ADD_ICON;
				const prefix = 'tel:';
				const contact = createContact(el, icon, prefix);

				contactlList.append(contact);

			} else if (el.type == 'Email') {

				const icon = MAIL_ICON;
				const prefix = 'mailto:';
				const contact = createContact(el, icon, prefix);

				contactlList.append(contact);

			} else if (el.type == 'Vk') {

				const icon = VK_ICON;
				const contact = createContact(el, icon);

				contactlList.append(contact);

			} else if (el.type == 'Facebook') {

				const icon = FB_ICON;
				const contact = createContact(el, icon);

				contactlList.append(contact);
			}
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

		const selectItemTelElem = createElement('div', {
			classList: ['select__item', 'select__item--selectable', 'btn-reset'],
			textContent: 'Телефон',
		}, selectBodyElem);

		const selectCurrentItemElem = createElement('div', {
			classList: ['select__current', 'btn-reset'],
			textContent: `${selectItemTelElem.textContent}`,
		}, selectHeaderElem);

		const selectItemAddTelElem = createElement('div', {
			classList: ['select__item', 'btn-reset'],
			textContent: 'Доп.телефон',
		}, selectBodyElem);

		const selectItemEmailElem = createElement('div', {
			classList: ['select__item', 'btn-reset'],
			textContent: 'Email',
		}, selectBodyElem);

		const selectItemVkElem = createElement('div', {
			classList: ['select__item', 'btn-reset'],
			textContent: 'Vk',
		}, selectBodyElem);

		const selectItemFacebookElem = createElement('div', {
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
			const obj = {
				'Телефон': 'tel',
				'Доп.телефон': 'tel',
				'Email': 'email',
				'Facebook': 'text',
				'Vk': 'text',
			}
			selectCurrentItemElem.textContent = `${contact.type}`;
			inputElem.value = `${contact.value}`;

			inputElem.type = 'text';
			if (contact.type != '') inputElem.type = obj[contact.type];

			buttonDeleteContactContainer.classList.remove('form__contact-button-container--hidden');
		}

		inputElem.addEventListener('input', () => {
			formRemoveError(inputElem);
		});

		buttonDeleteContact.addEventListener('click', (event) => {
			event.preventDefault();
			contactElem.remove();
		});

		inputElem.addEventListener('click', (event) => {
			event.preventDefault();
			buttonDeleteContactContainer.classList.remove('form__contact-button-container--hidden');
		});

		inputElem.addEventListener('input', (event) => {
			event.preventDefault();
			buttonDeleteContactContainer.classList.remove('form__contact-button-container--hidden');
		});

		selectHeaderElem.addEventListener('click', function (event) {
			event.preventDefault();
			selectToggle.call(selectHeaderElem);
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
			el.addEventListener('click', selectChouse);
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

	function renderTable(arr, handlers) {

		let copyArr = [...arr];

		document.querySelector('.table__tbody').innerHTML = '';

		copyArr.forEach(el => {
			const clientTrElem = createClientTr(el, handlers);
			document.querySelector('.table__tbody').append(clientTrElem);
		});
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

		async onEdit({ clientItem, element }, type, event) {
			startLoading(type, event);
			const clientDataItem = await fetchGetClient(clientItem.id);
			window.document.location.hash = clientItem.id;
			addAnimation();
			stopLoading(type, element);
			document.getElementById('app').append(createModalWithForm(type, clientDataItem, element, handlers));
			disableScroll();
		},

		async onFilter(event) {
			let search = event.target.value;
			console.log(search);
			const clientItemList = await fetchGetSearchClient(search);
			renderTable(clientItemList, handlers);
		},

		async onSort(column, dir) {
			let search = document.getElementById('filter').value;
			if (search !== '') {
				const response = await fetch(`${URL}?search=${search}`);
				const clientItemList = await response.json();
				sortClients(column, dir, clientItemList);
			} else {
				const clientItemList = await fetchGetAllClients();
				sortClients(column, dir, clientItemList);
			}
		},

		async onDeleteItem({ clientItem, element }) {
			element.remove();
			await fetch(`${URL}/${clientItem.id}`, {
				method: 'DELETE',
			});
		},

		onDelete({ clientItem, element }, type) {
			startLoading(type, event);
			addAnimation();
			stopLoading(type, element);
			document.getElementById('app').append(createModalWithForm(type, clientItem, element, handlers));
			disableScroll();
		},

		closeModal({ element }) {
			// let timerId;
			clearTimeout(timerId);
			timerId = setTimeout(() => {
				element.remove();
			}, WAIT_TIME_MS);
			document.querySelector('.modals-overlay').classList.remove('modals-overlay--visible');
			document.querySelector('.modal').classList.remove('modal--visible');
			enableScroll();
			window.location.hash = '';
		},
	}

	async function updateClientsInTable() {

		const clientItemList = await fetchGetAllClients();

		colSort = 'id';
		dirSort = false;
		disableLoader();
		renderTable(clientItemList, handlers);
	}

	async function httpErrorHandler(response, { closeModal, element }) {
		if (response.status >= 400) {
			const error = createElement('li', {
				classList: ['form__item-error'],
				// attribute: {
				// 	'data-error': `${input.name}`,
				// },
				textContent: `Ошибка сервера${response.status}, Что-то пошло не так...`,
			}, document.querySelector('.form__list-errors'));
		} else if (response.status >= 200 || response.status < 300) {
			console.log(response.status);
			closeModal({ element });
			updateClientsInTable();
		}
	}

	// запросы на API:
	async function fetchGetAllClients() {
		// await delay(WAIT_TIME_MS);
		const response = await fetch(`${URL}`);
		const clientItemList = await response.json();
		return clientItemList;
	}

	async function fetchGetClient(clientItemId) {
		await delay(WAIT_TIME_MS);
		const response = await fetch(`${URL}/${clientItemId}`);
		const clientDataItem = await response.json();
		return clientDataItem;
	}

	async function fetchGetSearchClient(search) {
		// await delay(WAIT_TIME_MS);
		const response = await fetch(`${URL}?search=${search}`);
		const clientItemList = await response.json();
		return clientItemList;
	}

	async function fetchPostCreateClient(formData) {
		await delay(WAIT_TIME_MS);
		const response = await fetch(`${URL}`, {
			method: 'POST',
			body: JSON.stringify({
				name: formData.name,
				surname: formData.surname,
				lastName: formData.lastName,
				contacts: formData.contacts,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	}

	async function fetchPatchUpdateClient(formData) {
		const response = await fetch(`${URL}/${formData.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				name: formData.name,
				surname: formData.surname,
				lastName: formData.lastName,
				contacts: formData.contacts,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	}

	// helper functions:
	function disableScroll() {
		const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
		const pagePosition = window.scrollY;
		body.classList.add('disable-scroll');
		body.dataset.position = pagePosition;
		body.style.top = -pagePosition + 'px';
		document.querySelectorAll('.fix-block').forEach((el) => {
			el.style.paddingRight = paddingOffset;
		});
		body.style.paddingRight = paddingOffset;
	};

	function enableScroll() {
		const pagePosition = parseInt(body.dataset.position, 10);
		body.style.top = 'auto';
		body.classList.remove('disable-scroll');
		window.scroll({ top: pagePosition, left: 0 });
		body.removeAttribute('data-position');
		document.querySelectorAll('.fix-block').forEach((el) => {
			el.style.paddingRight = '0px';
		});
		body.style.paddingRight = '0px';
	};

	function sortClients(column, dir = false, clientItemList) {
		if (column === 'fio') {
			clientItemList.sort((a, b) => {
				if (dir == true ?
					a.surname.trim().toLowerCase() + ' ' + a.name.trim().toLowerCase() + ' ' + a.lastName.trim().toLowerCase() > b.surname.trim().toLowerCase() + ' ' + b.name.trim().toLowerCase() + ' ' + b.lastName.trim().toLowerCase() :
					a.surname.trim().toLowerCase() + ' ' + a.name.trim().toLowerCase() + ' ' + a.lastName.trim().toLowerCase() < b.surname.trim().toLowerCase() + ' ' + b.name.trim().toLowerCase() + ' ' + b.lastName.trim().toLowerCase()) return -1;
			});
			return renderTable(clientItemList, handlers);
		} else {
			clientItemList.sort((a, b) => {
				if (dir == true ? a[column] > b[column] : a[column] < b[column]) return -1;
			});
			return renderTable(clientItemList, handlers);
		}
	}

	function parseDate(dateString) {
		const date = new Date(dateString).toLocaleDateString();
		const time = new Date(dateString).toLocaleTimeString().slice(0, -3);

		return {
			date,
			time,
		};
	}

	function selectToggle() {

		if (this.parentElement.classList.contains('select--active')) {
			this.parentElement.classList.remove('select--active');
			this.firstElementChild.classList.remove('select__current--active');
		} else {
			closeOthersSelects();
			this.parentElement.classList.add('select--active');
			this.firstElementChild.classList.toggle('select__current--active');
		}

	}

	function selectChouse() {
		const selectGroup = this.closest('.select').querySelector('.select__item--selectable');
		const chouse = this.textContent;
		const select = this.closest('.select');
		const currentChouse = this.closest('.select').querySelector('.select__current');
		const currentInput = this.closest('.form__item').querySelector('.form__contact-input');
		currentChouse.textContent = chouse;
		currentChouse.classList.remove('select__current--active');
		select.classList.remove('select--active');

		const obj = {
			'Телефон': 'tel',
			'Доп.телефон': 'tel',
			'Email': 'email',
			'Facebook': 'text',
			'Vk': 'text',
		}

		currentInput.type = 'text';
		if (chouse != '') currentInput.type = obj[chouse];

		if (selectGroup) {
			selectGroup.classList.remove('select__item--selectable');
		}
		this.classList.add('select__item--selectable');
	}

	function closeOthersSelects() {
		document.querySelectorAll('.select').forEach((el) => {
			el.classList.remove('select--active');
			el.firstElementChild.firstElementChild.classList.remove('select__current--active');
		});
	}

	function addAnimation() {
		// let timerId;
		// clearTimeout(timerId);
		setTimeout(() => {
			document.querySelector('.modals-overlay').classList.add('modals-overlay--visible');
			document.querySelector('.modal').classList.add('modal--visible');
		});
	}

	function disableLoader() {
		document.querySelector('.spiner-container').classList.add('spiner-container--hidden');
		document.querySelector('.js-open-modal-add').classList.remove('hero__button--hidden');
	}

	function startLoading(type, event) {
		if (type === 'edit') {
			event.target.firstElementChild.classList.remove('table__body-button-edit-icon-load--hidden');
			event.target.lastElementChild.classList.add('table__body-button-edit-icon--hidden');
		} else if (type === 'delete') {
			event.target.firstElementChild.classList.remove('table__body-button-delete-icon-load--hidden');
			event.target.lastElementChild.classList.add('table__body-button-delete-icon--hidden');
		}

	}

	function stopLoading(type = null, element) {
		// let timerId;
		// clearTimeout(timerId);
		// timerId = setTimeout(() => {
		if (type === 'edit') {
			element.querySelector('.table__body-button-edit-icon-load').classList.add('table__body-button-edit-icon-load--hidden');
			element.querySelector('.table__body-button-edit-icon').classList.remove('table__body-button-edit-icon--hidden');
		} else if (type === 'delete') {
			element.querySelector('.table__body-button-delete-icon-load').classList.add('table__body-button-delete-icon-load--hidden');
			element.querySelector('.table__body-button-delete-icon').classList.remove('table__body-button-delete-icon--hidden');
		}
		// }, 150);
	}

	async function createApp(wrapper) {

		const header = createHeader(handlers);
		const main = createMain(handlers);

		wrapper.append(header);
		wrapper.append(main);

		updateClientsInTable();

		if (hash) {
			const clientId = hash.replace('#', '');
			const clientDataItem = await fetchGetClient(clientId);
			// const element = document.querySelector(`[data-id]="${clientId}"`);
			const element = document.querySelector(`[data-id]`);
			addAnimation();
			document.getElementById('app').append(createModalWithForm('edit', clientDataItem, element, handlers));
			disableScroll();
		}
	}

	window.createApp = createApp;
})();

// export { createApp };
// createApp(document.getElementById('app'));
