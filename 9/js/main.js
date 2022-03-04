(() => {
	'use strict'

	document.addEventListener('DOMContentLoaded', () => {

		const body = document.body;
		const burgerOpen = document.querySelector('[data-burger-open]');
		const burgerClose = document.querySelector('[data-burger-close]');
		const menu = document.querySelector('[data-menu]');

		// Основное меню
		burgerOpen.addEventListener('click', showMenu);
		burgerClose.addEventListener('click', closeMenu);

		function showMenu(event) {
			event.stopPropagation();
			disableScroll();
			menu.classList.add('menu--visible');

			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					closeMenu(event);
				};
			});
		};

		function closeMenu() {
			enableScroll();
			menu.classList.remove('menu--visible');
		};

		// Поисковая строка на планшете и мобилке
		const searchOpen = document.querySelector('[data-search-open]');
		const searchForm = document.querySelector('[data-search]');
		const searchClose = document.querySelector('[data-search-close]');

		searchOpen.addEventListener('click', showSearch);
		searchClose.addEventListener('click', closeSearch);

		function showSearch(event) {
			disableScroll();
			searchForm.classList.add('header__form-search--active');

			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					closeSearch(event);
				};
			});
		};

		function closeSearch(event) {
			enableScroll();
			event.preventDefault();
			searchForm.classList.remove('header__form-search--active');
		};

		// Меню с выпадающими списками
		const dropdownButtons = document.querySelectorAll('.header__bot-btn');

		dropdownButtons.forEach((element) => {
			element.addEventListener('click', (event) => {
				event.stopPropagation();
				const dropdown = element.nextElementSibling;

				if (dropdown.classList.contains('is-open-dropdown')) {
					dropdown.classList.remove('is-open-dropdown');
					element.classList.remove('icon-rotate--active');

				} else {
					closeDropdownList();
					dropdown.classList.add('is-open-dropdown');
					element.classList.add('icon-rotate--active');
					getLink(dropdown);
				};
			});
		});

		document.addEventListener('click', (event) => {
			if (event.target.classList.contains('header__bot-dropdown')) {
				return;

			} else {
				closeDropdownList();
			};
		});

		document.addEventListener('keydown', (event) => {

			if (event.key === 'Escape') {
				closeDropdownList();
			};
		});

		function getLink(element) {
			element.querySelectorAll('.header__bot-dropdown-link').forEach((element) => {
				element.addEventListener('click', (event) => {
					event.preventDefault();
					closeDropdownList();
				});
			});
		};

		function closeDropdownList() {
			dropdownButtons.forEach((element) => {
				element.classList.remove('icon-rotate--active');
				element.nextElementSibling.classList.remove('is-open-dropdown');
			});
		};

		// Слайдер Hero
		const heroSlider = new Swiper(document.querySelector('.swiper'), {
			allowTouchMove: false,
			loop: true,
			effect: 'fade',
			speed: 3000,
			autoplay: {
				delay: 2000
			},
		});

		// Селект Gallery
		document.querySelectorAll('.select').forEach(el => {
			const choices = new Choices(el, {
				searchEnabled: false,
				itemSelectText: "",
				shouldSort: false,
				position: 'bottom',
			});

			const ariaLabel = el.getAttribute('aria-label');
			el.closest('.choices').setAttribute('aria-label', ariaLabel);
		});

		// Слайдер Gallery
		const gallerySlider = new Swiper(document.querySelector('.swiper1'), {
			slidesPerView: 1,
			spaceBetween: 15,
			keyboard: true,
			a11y: false,

			grid: {
				rows: 1,
				fill: "row"
			},
			pagination: {
				el: '.gallery__swiper-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.gallery__swiper-button-next',
				prevEl: '.gallery__swiper-button-prev',
			},
			breakpoints: {
				426: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 38,
				},
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 38,
				},
				1024: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 34,
				},
				1025: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
				},
			},
		});

		// Модальное окно
		const btnsOpenPicture = document.querySelectorAll('.gallery__slide');
		const modalOverlay = document.querySelector('.modal-overlay');
		const modal = document.querySelector('.modal');
		const modalClose = document.querySelector('.modal-close-btn');
		const pictureWrapper = document.querySelector('.modal-picture-info__left');

		btnsOpenPicture.forEach((el) => {
			el.addEventListener('click', (event) => {
				const imgElement = event.currentTarget.querySelector('.gallery__image');
				const pathImg = imgElement.getAttribute('src');
				pictureWrapper.style.backgroundImage = `url("${pathImg}")`;
				openModal();
			});
		});

		modalClose.addEventListener('click', closeModal);

		body.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				closeModal();
			};
		});

		function openModal() {
			modal.classList.add('modal--visible');
			modalOverlay.classList.add('modal__overlay--visible');
			disableScroll();
		};

		function closeModal() {
			enableScroll();
			modal.classList.remove('modal--visible');
			modalOverlay.classList.remove('modal__overlay--visible');
		};

		// Аккордион Catalog
		$(function () {
			$("#accordion").accordion({
				collapsible: true,
				active: 0,
				icons: false,
				heightStyle: 'content',
			});
		});

		// Табы Catalog
		const linksPainters = document.querySelectorAll('[data-path]');

		linksPainters.forEach(el => {
			el.addEventListener('click', (event) => {
				const path = event.currentTarget.dataset.path;
				const pathElement = document.querySelector(`[data-target="${path}"]`);

				document.querySelectorAll('.catalog__right-link--active').forEach(el => {
					el.classList.remove('catalog__right-link--active');
				})

				event.currentTarget.classList.add('catalog__right-link--active');

				document.querySelectorAll('.catalog__left').forEach(el => {
					el.classList.remove('animate__animated');
					el.classList.remove('catalog__left--active');
					el.classList.remove('animate__fadeInLeft');
				})

				pathElement.classList.add('animate__animated');
				pathElement.classList.add('catalog__left--active');
				pathElement.classList.add('animate__fadeInLeft');
			});
		});

		// Скролл на мобильной версии к художникам
		const MOBILE_WIDTH = 768;

		linksPainters.forEach(el => {
			el.addEventListener('click', function (event) {
				event.preventDefault();
				const path = event.currentTarget.dataset.path;
				const painter = document.querySelector(`[data-target="${path}"]`);
				scrollToContent(true, painter);
			});
		});

		function getWindowWidth() {
			return Math.max(
				body.scrollWidth,
				document.documentElement.scrollWidth,
				body.offsetWidth,
				document.documentElement.offsetWidth,
				body.clientWidth,
				document.documentElement.clientWidth,
			);
		};

		function scrollToContent(isMobile, painter) {

			if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
				return;
			};

			const elementPosition = painter.getBoundingClientRect().top;

			window.scrollBy({
				top: elementPosition,
				behavior: 'smooth',
			});
		};

		// Слайдер Events
		const eventsSlider = new Swiper(document.querySelector('.swiper-4'), {
			containerModifierClass: 'swiper-4-',
			wrapperClass: 'swiper-4-wrapper',
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 30,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
			},
			breakpoints: {
				425: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 30,
				},
				576: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 34,
				},
				850: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 27,
				},
				1025: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
					navigation: {
						nextEl: '.events__swiper-button-next',
						prevEl: '.events__swiper-button-prev',
					},
				},
			}
		});

		// Слайдер Projects
		const projectsSlider = new Swiper(document.querySelector('.swiper2'), {
			slidesPerView: 1,
			spaceBetween: 20,
			keyboard: true,
			navigation: {
				nextEl: '.projects__swiper-button-next',
				prevEl: '.projects__swiper-button-prev',
			},
			breakpoints: {
				426: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 34,
				},
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 34,
				},
				1024: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 50,
				},
				1025: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 50,
				},
			}
		});

		// Тултипы Projects
		const tooltips = document.querySelectorAll('.content__btn');

		tooltips.forEach((el) => {
			el.addEventListener('click', () => {
				el.childNodes[1].classList.toggle('tooltip-icon--purple');
				el.childNodes[1].childNodes[3].classList.toggle('tooltip-icon--white');
			});
		});

		tippy('#tippy-1', {
			hideOnClick: "toggle",
			trigger: 'click',
			allowHTML: true,
			content: '<button>Пример современных тенденций - современная методология разработки</button>',
			placement: 'top',
			maxWidth: 257,
			duration: 300,
			interactive: true,
			animation: 'scale',
		});

		tippy('#tippy-2', {
			hideOnClick: "toggle",
			trigger: 'click',
			allowHTML: true,
			content: '<button>Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции</button>',
			placement: 'top',
			maxWidth: 242,
			duration: 300,
			interactive: true,
			animation: 'scale',
		});

		tippy('#tippy-3', {
			hideOnClick: "toggle",
			trigger: 'click',
			allowHTML: true,
			content: '<button>В стремлении повысить качество</button>',
			placement: 'top',
			maxWidth: 242,
			duration: 300,
			interactive: true,
			animation: 'scale',
		});

		// Карта яндекс
		function init() {
			const myMap = new ymaps.Map("map", {
				center: [55.75, 37.60],
				zoom: 14,
				controls: [],
			});

			const myPlacemark = new ymaps.Placemark([55.75, 37.60], {}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/main/contacts/3.svg',
				iconImageSize: [20, 20],
				iconImageOffset: [0, 0],
			});

			myMap.controls.add('geolocationControl', {
				float: 'right',
				position: {
					bottom: '280px',
					right: '20px',
				},
			});

			myMap.controls.add('zoomControl', {
				size: 'small',
				float: 'none',
				position: {
					bottom: '320px',
					right: '20px',
				},
			});
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom']);
		};

		ymaps.ready(init);


		// InputMask
		const selector = document.querySelectorAll(`input[type='tel']`);
		const im = new Inputmask('+7 (999) 999-99-99');
		im.mask(selector);

		// Validate
		const validateForm = function (selector, rules, successModal, yaGoal) {
			new window.JustValidate(selector, {
				rules: rules,
				messages: {
					name: {
						required: 'Недопустимый&nbsp;формат',
						minLength: 'Недопустимый&nbsp;формат',
						maxLength: 'Недопустимый&nbsp;формат',
					},
					tel: {
						required: 'Недопустимый&nbsp;формат',

					},
				},
				colorWrong: '#D11616',



				submitHandler: function (form) {
					let formData = new FormData(form);
					let xhr = new XMLHttpRequest();

					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								console.log('Отправлено');
							};
						};
					};

					xhr.open('POST', 'mail.php', true);
					xhr.send(formData);

					form.reset();
				},
			});
		};

		validateForm('.contacts-form', {
			name: {
				required: true,
				minLength: 3,
				maxLength: 10,
			},
			tel: {
				required: true,
			},
		}, '.thaks-popup',
			'send goal',
		);

		// Плавный Скролл к секциям
		const links = document.querySelectorAll('[data-link]');

		links.forEach((el) => {
			el.addEventListener('click', (event) => {
				event.preventDefault();

				if (menu.classList.contains('menu--visible')) {
					closeMenu();
				};
				const path = el.dataset.link;
				showSection(path);
			});
		});

		function showSection(path) {
			const targetSection = document.getElementById(path);

			targetSection.scrollIntoView({
				behavior: 'smooth'
			});
		};

		let fixBlocks = document.querySelectorAll('.fix-block');

		function disableScroll() {
			const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
			const pagePosition = window.scrollY;
			body.classList.add('disable-scroll');
			body.dataset.position = pagePosition;
			body.style.top = -pagePosition + 'px';
			fixBlocks.forEach((el) => {
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
			fixBlocks.forEach((el) => {
				el.style.paddingRight = '0px';
			});
			body.style.paddingRight = '0px';
		};
	});
})();
