import { body } from './config.js';
import { CONTACTS } from './data.js';

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

function clearList() {
	this.innerHTML = '';
}

function sortClients(clientItemList, column = 'id', dir = false) {
	if (column === 'fio') {
		return clientItemList.sort((a, b) => {
			let fullnameA = `${a.surname} ${a.name} ${a.lastName}`.toLowerCase();
			let fullnameB = `${b.surname} ${b.name} ${b.lastName}`.toLowerCase();
			if (dir === true ? fullnameA > fullnameB : fullnameA < fullnameB) return -1;
		});
	} else {
		return clientItemList.sort((a, b) => {
			if (dir === true ? a[column] > b[column] : a[column] < b[column]) return -1;
		});
	}
}

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

function parseDate(dateString) {
	const date = new Date(dateString).toLocaleDateString();
	const time = new Date(dateString).toLocaleTimeString().slice(0, -3);

	return {
		date,
		time,
	};
}

function selectToggle() {

	if (this.classList.contains('select--active')) {
		closeOthersSelects();
	} else {
		closeOthersSelects();
		this.closest('.select').classList.add('select--active');
		this.querySelector('.select__current').classList.toggle('select__current--active');
	}
}

function selectChouse() {
	// Рабата с выбранными элементами
	const chouseText = this.textContent;
	const currentChouse = this.closest('.select').querySelector('.select__current');
	currentChouse.textContent = chouseText;

	// Присвоить тип инпуту
	const currentInput = this.closest('.form__item').querySelector('.form__contact-input');
	currentInput.type = 'text';
	if (chouseText !== '') currentInput.type = CONTACTS[chouseText].type;

	// Замена скрытого элемента в списке
	const hideChouse = this.closest('.select').querySelector('.select__item--selectable');
	if (hideChouse) {
		hideChouse.classList.remove('select__item--selectable');
		this.classList.add('select__item--selectable');
	}

	closeOthersSelects();
}

function closeOthersSelects() {
	document.querySelectorAll('.select').forEach((el) => {
		el.classList.remove('select--active');
		el.querySelector('.select__current').classList.remove('select__current--active');
	});
}

function addAnimation() {
	let timerId;
	clearTimeout(timerId);
	setTimeout(() => {
		document.querySelector('.modals-overlay').classList.add('modals-overlay--visible');
		document.querySelector('.modal').classList.add('modal--visible');
	});
}

function disableLoader() {
	document.querySelector('.spiner-container').classList.add('spiner-container--hidden');
	document.querySelector('.js-open-modal-add').classList.remove('hero__button--hidden');
}

function startLoading(type) {
	if (type === 'edit') {
		this.querySelector('.table__body-button-edit-icon-load').classList.remove('table__body-button-edit-icon-load--hidden');
		this.querySelector('.table__body-button-edit-icon').classList.add('table__body-button-edit-icon--hidden');
	} else if (type === 'delete') {
		this.querySelector('.table__body-button-delete-icon-load').classList.remove('table__body-button-delete-icon-load--hidden');
		this.querySelector('.table__body-button-delete-icon').classList.add('table__body-button-delete-icon--hidden');
	}

}

function stopLoading(type) {
	if (type === 'edit') {
		this.querySelector('.table__body-button-edit-icon-load').classList.add('table__body-button-edit-icon-load--hidden');
		this.querySelector('.table__body-button-edit-icon').classList.remove('table__body-button-edit-icon--hidden');
	} else if (type === 'delete') {
		this.querySelector('.table__body-button-delete-icon-load').classList.add('table__body-button-delete-icon-load--hidden');
		this.querySelector('.table__body-button-delete-icon').classList.remove('table__body-button-delete-icon--hidden');
	}
}

function formValidate() {
	let error = 0;
	let formRequiredInpute = document.querySelectorAll('.js-input');
	let formRequiredContact = document.querySelectorAll('.js-input-contact');

	formRequiredInpute.forEach(input => {
		formRemoveError.call(input);

		if (input.value === '') {
			formAddError.call(input);
			error++;
		}
	})

	formRequiredContact.forEach(input => {
		formRemoveError.call(input);
		if (input.type === 'email') {
			if (emailTest.call(input)) {
				formAddError.call(input);
				error++;
			}
		} else if (input.type === 'tel') {
			if (telTest.call(input)) {
				formAddError.call(input);
				error++;
			}
		} else {
			if (input.value === '') {
				formAddError.call(input);
				error++;
			}
		}
	})

	return error;
}

function emailTest() {
	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return !re.test(String(this.value).toLowerCase());
}

function telTest() {
	const re = /^\d[\d\(\)\ -]{4,14}\d$/;
	return !re.test(this.value);
}

function formAddError() {
	this.classList.add('js-input-error');
}

function formRemoveError() {
	this.classList.remove('js-input-error');
}

const delay = ms => {
	return new Promise(resolve => setTimeout(() => resolve(), ms));
};

const debounce = (fn, ms) => {
	let timerId;
	return function () {
		const fnCall = () => {
			fn.apply(this, arguments)
		}

		clearTimeout(timerId);
		timerId = setTimeout(fnCall, ms)
	}
}

export {
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
};
