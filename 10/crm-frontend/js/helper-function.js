const body = document.body;

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
	document.querySelector('.hero__button').classList.remove('hero__button--hidden');
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

	if (chouse === 'Телефон') {
		currentInput.type = 'tel';
	} else if (chouse == 'Доп.телефон') {
		currentInput.type = 'tel';
	} else if (chouse === 'Email') {
		currentInput.type = 'email';
	} else {
		currentInput.type = 'text';
	}

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
	let timerId;
	clearTimeout(timerId);
	timerId = setTimeout(() => {
		if (type === 'edit') {
			element.querySelector('.table__body-button-edit-icon-load').classList.add('table__body-button-edit-icon-load--hidden');
			element.querySelector('.table__body-button-edit-icon').classList.remove('table__body-button-edit-icon--hidden');
		} else if (type === 'delete') {
			element.querySelector('.table__body-button-delete-icon-load').classList.add('table__body-button-delete-icon-load--hidden');
			element.querySelector('.table__body-button-delete-icon').classList.remove('table__body-button-delete-icon--hidden');
		}
	}, 300);
}

export {
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
};
