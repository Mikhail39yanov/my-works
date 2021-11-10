// Представление
let view = {
	displayMessage: function (msg) {
		let messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg;
	},
	displayHit: function (location) {
		let cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');

	},
	displayMiss: function (location) {
		let cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	},
};

// Модель
let model = {
	boardSize: 7, // размер сетки игрового поля
	numShips: 3, // кол-во кораблей
	shipLength: 3, // длина корабля
	shipsSunk: 0, // кол-во потопленных кораблей

	ships: [
		{ locations: ['0', '0', '0'], hits: ['', '', ''], },
		{ locations: ['0', '0', '0'], hits: ['', '', ''], },
		{ locations: ['0', '0', '0'], hits: ['', '', ''], },
	],

	fire: function (guess) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = 'hit';
				view.displayHit(guess);
				view.displayMessage('ПОПАЛ');
				if (this.isSunk(ship)) {
					view.displayMessage('Корабль уничтожен!');
					this.shipsSunk++;
				};
				return true;
			};
		};
		view.displayMiss(guess);
		view.displayMessage('Промахнулся');
		return false;
	},

	isSunk: function (ship) {
		for (let i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== 'hit') {
				return false;
			};
		};
		return true;
	},

	generateShipLocations: function () {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function () {
		let direction = Math.floor(Math.random() * 2);
		let row, col;
		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		let newShipLocations = [];
		for (let i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + '' + (col + i));
			} else {
				newShipLocations.push((row + i) + '' + col);
			}
		}
		return newShipLocations;
	},

	collision: function (locations) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = model.ships[i];
			for (let j = 0; j < this.numShips; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	},
};

// Контроллер
let controller = {
	guesses: 0,
	processGues: function (guess) {
		let location = parseGuess(guess);
		if (location) {
			this.guesses++;
			let hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage('Корабли потоплены, потребовалось ' + this.guesses + ' выстрелов');
			}
		}
	},
};

// Проверка данных
function parseGuess(guess) {
	let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	if (guess === null || guess.length !== 2) {
		alert('Введите правильное значение');
	} else {
		firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert('Введите правильное значение');
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert('Введите правильное значение');
		} else {
			return row + column;
		}
	}
	return null;
};

// Кнопка огонь
function init() {
	let fireButton = document.getElementById('fireButton');
	fireButton.onclick = handFireButton;
	let guessInput = document.getElementById('guessInput');
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
};

function handleKeyPress(e) {
	let fireButton = document.getElementById('fireButton');
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
};

// Инпут
function handFireButton() {
	let guessInput = document.getElementById('guessInput');
	let guess = guessInput.value;
	controller.processGues(guess);
	guessInput.value = '';
};

console.log(model.ships[0]);
console.log(model.ships[1]);
console.log(model.ships[2]);

window.onload = init;