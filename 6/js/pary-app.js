(() => {
	const ONE_SECOND_TIME_MS = 1000;
	const timer = createTimer(); // доступ к таймеру
	const setka = createBoard(); // доступ к игровому полю
	const buttonPlayAgain = createButtonPlayAgain(); // доступ к кнопке "Сыграть ещё раз"
	const greetings = creatGreetings(); // доступ к поздравлениям

	// Создать заголовок
	const createAppTitle = (title) => {
		const appTitle = document.createElement('h1');

		appTitle.classList.add('title');
		appTitle.innerHTML = title;

		return appTitle;
	};

	// Создать таймер
	function createTimer() {
		const timerCenter = document.createElement('div');
		let counterTimer = document.createElement('div');

		timerCenter.classList.add('flex', 'justify-content-center');
		counterTimer.classList.add('timer', 'pulse');
		counterTimer.textContent = '60';

		timerCenter.append(counterTimer);

		return {
			timerCenter,
			counterTimer,
		};
	}

	// Создать форму
	function createPlayItemForm() {
		// Создаем элементы
		const form = document.createElement('form');
		const input = document.createElement('input');
		const buttonWrapper = document.createElement('div');
		const button = document.createElement('button');

		// Расставляем атрибуты созданным элементам
		form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.setAttribute('placeholder', 'Введить количество карточек');
		input.setAttribute('value', '16');
		input.setAttribute('type', 'number');
		input.setAttribute('min', '4');
		input.setAttribute('max', '16');
		buttonWrapper.classList.add('input-group-append');
		button.classList.add('btn', 'btn-primary');
		button.textContent = 'Начать игру';

		// Добавляем элементы ДОМ
		buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

		// Возвращаем обьект form с доступом к input и button
		return {
			form,
			input,
			button,
		};
	};

	// Создать поле ul
	function createBoard() {
		const setka = document.createElement('ul');
		setka.classList.add('card-grid', 'flex');
		return setka;
	}

	// Создать карточку li
	function createCard() {
		let item = document.createElement('li');
		let frontFace = document.createElement('div');
		let backFace = document.createElement('img');

		item.classList.add('card-4', 'pary-card', 'flip');
		frontFace.classList.add('front-face', 'item');
		backFace.classList.add('back-face');
		backFace.setAttribute('src', 'img/1.png');

		item.append(frontFace);
		item.append(backFace);

		return {
			item,
			frontFace,
			backFace,
		};
	}

	// Создать рандомный массив цифр для карточек
	function createNumberForCards(count) {
		// Создаем новый массив цифр
		let arr = [];

		for (let i = 1; i <= count / 2; i++)	arr.push(i, i);

		// Перемешивание алгоритм Фишера–Йетса
		function shuffle(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
		shuffle(arr);

		return arr;
	}

	// Создать кнопку "Сыграть ещё раз"
	function createButtonPlayAgain() {
		const buttonCenter = document.createElement('div');
		const button = document.createElement('button');

		buttonCenter.classList.add('flex', 'justify-content-center');
		button.classList.add('btn', 'btn-primary', 'hidden', 'mt-2', 'fadeIn');
		button.textContent = 'Сыграть ещё раз';

		buttonCenter.append(button);

		return {
			buttonCenter,
			button,
		};
	}

	// Поздравления или проигрыш
	function creatGreetings() {
		const victory = document.createElement('img');
		const loss = document.createElement('img');
		const youLoss = document.createElement('h2');
		const youVictory = document.createElement('h2');

		victory.classList.add('victory', 'slideRight', 'hidden');
		victory.setAttribute('src', 'img/2.gif');

		youVictory.classList.add('text-victory', 'slideRight', 'hidden');
		youVictory.textContent = `You win!`;

		loss.classList.add('loss', 'slideLeft', 'hidden');
		loss.setAttribute('src', 'img/3.gif');

		youLoss.classList.add('text-loss', 'slideLeft', 'hidden');
		youLoss.textContent = `You've lost!`;

		return {
			victory,
			loss,
			youVictory,
			youLoss,
		};
	}

	let isActiveFlippedCard = false; // активная перевернутая карточка
	let lockBoard = false; // когда перевернуто две активные карточки поле блокируеться(замок)
	let firstCard, secondCard; // значения карточек
	let result = 4; // кол-во карточек
	let count = 0; // кол-во найденых совпадаений
	let timerId; // доступ к таймеру

	// Перевернуть карточку
	function flipCard() {
		if (lockBoard) return;

		this.classList.add('flip');

		if (this === firstCard) return;

		if (!isActiveFlippedCard) {
			isActiveFlippedCard = true;
			firstCard = this;
			return;
		}

		secondCard = this;
		isActiveFlippedCard = false;

		checkCards();
	}

	// Проверка карточек
	function checkCards() {
		if (firstCard.children[0].textContent === secondCard.children[0].textContent) {
			disableCards();
			count = count + 2;
			if (count == result) {
				clearInterval(timerId);
				buttonPlayAgain.button.classList.remove('hidden');
				greetings.victory.classList.remove('hidden');
				greetings.youVictory.classList.remove('hidden');
				timer.counterTimer.textContent = 0;
			}
			return;
		}
		unflipCards();
	}

	// Отключить обработчики если проверка карточек правильна
	function disableCards() {
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);

		resetBoard();
	}

	// Перевернуть карточки если проверка не пройдена
	function unflipCards() {
		lockBoard = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			resetBoard();
		}, 1000);
	}

	// Сброс значения карточек, замка и активной карты
	function resetBoard() {
		isActiveFlippedCard = false;
		lockBoard = false;
		firstCard = null;
		secondCard = null;
		// [isActiveFlippedCard, lockBoard] = [false, false];
		// [firstCard, secondCard] = [null, null];
	}

	document.addEventListener('DOMContentLoaded', () => {

		// Создать игру в пары
		function createParyApp(container, title) {

			const playItemForm = createPlayItemForm();
			// Поздравления или проигрыш
			{
				container.append(greetings.victory);
				container.append(greetings.loss);
				container.append(greetings.youVictory);
				container.append(greetings.youLoss);
			}

			container.append(createAppTitle(title));
			container.append(timer.timerCenter);
			container.append(playItemForm.form);
			container.append(setka);
			container.append(buttonPlayAgain.buttonCenter);

			// Начать игру
			playItemForm.form.addEventListener('submit', function (e) {
				e.preventDefault();
				if (!playItemForm.input.value) return;

				// Проверяем число в инпуте
				if (playItemForm.input.value % 2 == 0 &&
					playItemForm.input.value <= 16
					&& playItemForm.input.value >= 4) {
					result = playItemForm.input.value;
				} else {
					result = 4;
					playItemForm.input.value = result;
					alert(`Количество карточек должно быть:\n-Только чётным числом;\n-Значение должно быть больше или равно 4;\n-Значение должно быть меньше или равно 16.`);
				}

				// Получаем перемешанный массив с цифрами
				let arr = createNumberForCards(playItemForm.input.value);
				// Добавляем карточки на поле
				for (let i = 0; i < arr.length; i++) {
					let cardItem = createCard();
					if (playItemForm.input.value == 6) {
						cardItem.item.classList.remove('card-4');
						cardItem.item.classList.add('card-3');
					}
					if (playItemForm.input.value == 10) {
						cardItem.item.classList.remove('card-4');
						cardItem.item.classList.add('card-5');
					}
					if (playItemForm.input.value == 14) {
						cardItem.item.classList.remove('card-4');
						cardItem.item.classList.add('card-7');
					}
					setka.append(cardItem.item);

					// Добавляем цифры на фронтальные карточки
					let frontItem = document.querySelectorAll('.front-face');
					for (let i = 0; i < frontItem.length; i++) {
						frontItem[i].textContent = arr[i];
					}
				}

				// Повесили обработчики flipCard на карты
				let cards = document.querySelectorAll('.pary-card');
				for (let card of cards) card.addEventListener('click', flipCard);

				// Скрываем форму когда игра началась
				let timerform = setInterval(() => {
					playItemForm.form.classList.add('hidden');
					clearInterval(timerform);
				}, ONE_SECOND_TIME_MS);

				// Показать карты перед стратом игрой и скрываем
				let timeGame = setInterval(() => {
					cards = document.querySelectorAll('.pary-card');
					for (let card of cards) card.classList.remove('flip');
					clearInterval(timeGame);
					// И запустить таймер игры
					timerId = setInterval(() => {
						timer.counterTimer.textContent = timer.counterTimer.textContent - 1;
						if (timer.counterTimer.textContent == 0) {
							clearInterval(timerId);
							for (let card of cards) card.classList.add('flip');
							buttonPlayAgain.button.classList.remove('hidden');
							greetings.loss.classList.remove('hidden');
							greetings.youLoss.classList.remove('hidden');
						};
					}, ONE_SECOND_TIME_MS);
				}, 1500);

			});

			// Запустить игру заново
			buttonPlayAgain.button.addEventListener('click', () => {
				window.location.reload();
			});
		}

		createParyApp(document.getElementById('pary-app'), 'Игра в пары');
	});
})();
