(() => {
	'use strict'

	// Массив студентов
	const students = [
		{ id: 1, name: 'Михаил', surname: 'Янов', middleName: 'Михайлович', fio: 'Янов Михаил Михайлович', dateBirthday: new Date('1991,04,03'), startOfTraining: new Date('2021,06,01'), faculty: 'Frontend-разработчик с нуля до PRO' },
		{ id: 2, name: 'Петр', surname: 'Рудницкий', middleName: 'Францевич', fio: 'Рудницкий Петр Францевич', dateBirthday: new Date('1956,05,09'), startOfTraining: new Date('2017,05,01'), faculty: 'Боевое применение инженерно-саперных(инженерных) соединений, воинских частей и подразделений' },
		{ id: 3, name: 'Светлана', surname: 'Янова', middleName: 'Вадимовна', fio: 'Янова Светлана Вадимовна', dateBirthday: new Date('1986,10,10'), startOfTraining: new Date('2021,08,01'), faculty: 'Excel + Google Таблицы с нуля до PRO' },
	];

	// Создать элемент HTML
	const createElem = (prop) => {

		let el = document.createElement(prop.tag);

		if (prop.classList) el.classList = prop.classList;
		if (prop.htmlFor) el.htmlFor = prop.htmlFor;
		if (prop.id) el.id = prop.id;
		if (prop.column) el.setAttribute('data-column', prop.column);
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

	// Создать форму
	function createFormAddStudent() {

		const form = createElem({
			tag: 'form',
			classList: 'form row g-3 needs-validation mb-3',
			id: 'form',
			noValidate: 'noValidate',
		});

		const blockSurname = createElem({
			tag: 'div',
			classList: 'col-md-4',
		});
		const labelSurname = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationSurname',
			textContent: 'Фамилия',
		});
		const inputSurname = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationSurname',
			type: 'text',
			placeholder: 'Введите фамилию',
			name: 'surname',
			required: 'required',
		});
		const validFeedbackSurname = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackSurname = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Введите фамилию.',
		});

		const blockName = createElem({
			tag: 'div',
			classList: 'col-md-4',
		});
		const labelName = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationName',
			textContent: 'Имя',
		});
		const inputName = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationName',
			type: 'text',
			placeholder: 'Введите имя',
			name: 'name',
			required: 'required',
		});
		const validFeedbackName = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackName = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Введите имя.',
		});

		const blockMiddleName = createElem({
			tag: 'div',
			classList: 'col-md-4',
		});
		const labelMiddleName = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationMiddleName',
			textContent: 'Отчество',
		});
		const inputMiddleName = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationMiddleName',
			type: 'text',
			placeholder: 'Введите отчество',
			name: 'middleName',
			required: 'required',
		});
		const validFeedbackMiddleName = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackMiddleName = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Введите отчество.',
		});

		const blockFaculty = createElem({
			tag: 'div',
			classList: 'col-md-6',
		});
		const labelFaculty = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationFaculty',
			textContent: 'Факультет',
		});
		const inputFaculty = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationFaculty',
			type: 'text',
			placeholder: 'Укажите факультет',
			name: 'faculty',
			required: 'required',
		});
		const validFeedbackFaculty = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackFaculty = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Укажите действующий факульет.',
		});

		const blockDateBirthday = createElem({
			tag: 'div',
			classList: 'col-md-3',
		});
		const labelDateBirthday = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationDateBirthday',
			textContent: 'Дата рождения',
		});
		const inputDateBirthday = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationDateBirthday',
			type: 'date',
			min: '1900-01-01',
			max: new Date().toLocaleDateString().split('.').reverse().join('-'),
			value: '1900-01-01',
			name: 'dateBirthday',
			required: 'required',
		});
		const validFeedbackDateBirthday = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackDateBirthday = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Укажите дату рождения.',
		});

		const blockStartOfTraining = createElem({
			tag: 'div',
			classList: 'col-md-3',
		});
		const labelStartOfTraining = createElem({
			tag: 'label',
			classList: 'form-label',
			htmlFor: 'validationStartOfTraining',
			textContent: 'Год обучения',
		});
		const inputStartOfTraining = createElem({
			tag: 'input',
			classList: 'form-control',
			id: 'validationStartOfTraining',
			type: 'date',
			min: '2000-01-01',
			max: new Date().toLocaleDateString().split('.').reverse().join('-'),
			value: '2000-01-01',
			name: 'startOfTraining',
			required: 'required',
		});
		const validFeedbackStartOfTraining = createElem({
			tag: 'div',
			classList: 'valid-feedback',
			textContent: 'Все хорошо!',
		});
		const invalidFeedbackStartOfTraining = createElem({
			tag: 'div',
			classList: 'invalid-feedback',
			textContent: 'Укажите год обучения.',
		});

		const blockAddButtonStudent = createElem({
			tag: 'div',
			classList: 'col-12',
		});
		const buttonAddButtonStudent = createElem({
			tag: 'button',
			classList: 'btn btn-primary',
			textContent: 'Добавить студента',
		});

		form.append(blockSurname, blockName, blockMiddleName, blockFaculty, blockDateBirthday, blockStartOfTraining, blockAddButtonStudent);
		blockSurname.append(labelSurname, inputSurname, validFeedbackSurname, invalidFeedbackSurname);
		blockName.append(labelName, inputName, validFeedbackName, invalidFeedbackName);
		blockMiddleName.append(labelMiddleName, inputMiddleName, validFeedbackMiddleName, invalidFeedbackMiddleName);
		blockFaculty.append(labelFaculty, inputFaculty, validFeedbackFaculty, invalidFeedbackFaculty);
		blockDateBirthday.append(labelDateBirthday, inputDateBirthday, validFeedbackDateBirthday, invalidFeedbackDateBirthday);
		blockStartOfTraining.append(labelStartOfTraining, inputStartOfTraining, validFeedbackStartOfTraining, invalidFeedbackStartOfTraining);
		blockAddButtonStudent.append(buttonAddButtonStudent);

		return {
			form,
			inputSurname,
			inputName,
			inputMiddleName,
			inputFaculty,
			inputDateBirthday,
			inputStartOfTraining,
			buttonAddButtonStudent,
		};
	}

	// Создать таблицу
	function createTableStudents() {

		const table = createElem({
			tag: 'table',
			classList: 'table table-striped table-hover table-bordered',
			id: 'table',
		});
		const caption = createElem({
			tag: 'caption',
			classList: 'caption-top',
			textContent: 'Таблица студентов',
		});
		const tableHead = document.createElement('thead');
		const tableBody = document.createElement('tbody');
		const sortRow = createElem({
			tag: 'tr',
			classList: 'table-primary',
		});
		const filterRow = createElem({
			tag: 'tr',
			classList: 'table-primary',
		})

		const sortNumber = createElem({
			tag: 'th',
			classList: 'sort',
			id: 'colNumber',
			scope: 'col',
			textContent: '№',
			column: 'id',
		});
		const sortFio = createElem({
			tag: 'th',
			classList: 'sort',
			id: 'colFio',
			scope: 'col',
			textContent: 'ФИО студента',
			column: 'fio',
		});
		const sortFaculty = createElem({
			tag: 'th',
			classList: 'sort',
			id: 'colFaculty',
			scope: 'col',
			textContent: 'Факультет',
			column: 'faculty',
		});
		const sortDateBirthday = createElem({
			tag: 'th',
			classList: 'sort',
			id: 'colDateBirthday',
			scope: 'col',
			textContent: 'Дата\u00A0рождения\u00A0и\u00A0возраст', // литерал Юникода для неразрывного пробела \u00A0
			column: 'dateBirthday',
		});
		const sortStartOfTraining = createElem({
			tag: 'th',
			classList: 'sort',
			id: 'colStartOfTraining',
			scope: 'col',
			textContent: 'Годы обучения',
			column: 'startOfTraining',
		});

		const filterNumber = createElem({
			tag: 'th',
			scope: 'col',
		})
		const filterFio = createElem({
			tag: 'th',
			scope: 'col',
		})
		const filterFaculty = createElem({
			tag: 'th',
			scope: 'col',
		})
		const filterDateBirthday = createElem({
			tag: 'th',
			scope: 'col',
		})
		const filterStartOfTraining = createElem({
			tag: 'th',
			scope: 'col',
		})

		const inputNumber = createElem({
			tag: 'input',
			classList: 'form-control filter',
			id: 'filterNumber',
			column: 'id',
			type: 'search',
			placeholder: '№',
			name: 'searchNumber',
		});
		const inputFio = createElem({
			tag: 'input',
			classList: 'form-control filter',
			id: 'filterFio',
			column: 'fio',
			type: 'search',
			placeholder: 'ФИО студента',
			name: 'searchFio',
		});
		const inputFaculty = createElem({
			tag: 'input',
			classList: 'form-control filter',
			id: 'filterFaculty',
			column: 'faculty',
			type: 'search',
			placeholder: 'Факультет',
			name: 'searchFaculty',
		});
		const inputDateBirthday = createElem({
			tag: 'input',
			classList: 'form-control filter',
			id: 'filterDateBirthday',
			column: 'dateBirthday',
			type: 'date',
			min: '1900-01-01',
			max: new Date().toLocaleDateString().split('.').reverse().join('-'),
			placeholder: 'Дата рождения и возраст',
			name: 'searchDateBirthday',
		});
		const inputStartOfTraining = createElem({
			tag: 'input',
			classList: 'form-control filter',
			id: 'filterStartOfTraining',
			column: 'startOfTraining',
			type: 'date',
			min: '2000-01-01',
			max: new Date().toLocaleDateString().split('.').reverse().join('-'),
			placeholder: 'Годы обучения',
			name: 'searchStartOfTraining',
		});

		table.append(caption);
		table.append(tableHead);
		table.append(tableBody);
		tableHead.append(sortRow, filterRow);
		sortRow.append(sortNumber, sortFio, sortFaculty, sortDateBirthday, sortStartOfTraining);
		filterRow.append(filterNumber, filterFio, filterFaculty, filterDateBirthday, filterStartOfTraining);
		filterNumber.append(inputNumber);
		filterFio.append(inputFio);
		filterFaculty.append(inputFaculty);
		filterDateBirthday.append(inputDateBirthday);
		filterStartOfTraining.append(inputStartOfTraining);

		return {
			table,
			caption,
			tableHead,
			tableBody,
			sortRow,
			sortNumber,
			sortFio,
			sortFaculty,
			sortDateBirthday,
			sortStartOfTraining,
			filterRow,
			filterNumber,
			filterFio,
			filterFaculty,
			filterDateBirthday,
			filterStartOfTraining,
		};
	}

	// Создать студента
	const createStudentTr = (student) => {

		// Возраст студента
		const studentAge = {

			birthDate: {
				year: student.dateBirthday.getFullYear(),
				moth: student.dateBirthday.getMonth(),
				day: student.dateBirthday.getDate(),
			},

			getAge() {
				let now = new Date();
				let born = new Date(
					this.birthDate.year,
					this.birthDate.moth + 1,
					this.birthDate.day
				);
				let diffInMilliseconds = now.getTime() - born.getTime();
				return Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);
			}
		};

		// Курс студента
		const studentCourse = {

			start: student.startOfTraining.getFullYear(),
			end: student.startOfTraining.getFullYear() + 4,

			getCourse() {

				let currentYear = new Date().getFullYear();
				let currentMonth = new Date().getMonth() + 1;
				let currentCourse = currentYear - this.start;

				if (currentCourse < 0) {
					currentCourse = 'Не начат';
				}
				else if (currentCourse === 4 && currentMonth > 9 || currentCourse > 4) {
					this.end = this.start + 4
					currentCourse = 'Закончил';
				}
				else if (currentMonth > 9) {
					currentCourse = currentCourse + 1;
				}
				return currentCourse;
			},
		};

		const studentRow = createElem({
			tag: 'tr',
			classList: 'table-info',
		});

		const studentNumber = createElem({
			tag: 'td',
			scope: 'row',
			textContent: student.id,
		});
		const studentFio = createElem({
			tag: 'td',
			textContent: student.fio,
		});
		const studentFaculty = createElem({
			tag: 'td',
			textContent: student.faculty,
		});
		const studentDateBirthday = createElem({
			tag: 'td',
			textContent: student.dateBirthday.toLocaleDateString()
				+ ' (' + studentAge.getAge() + ' лет)',
		});
		const studentStartOfTraining = createElem({
			tag: 'td',
			textContent: studentCourse.start + '-' + (studentCourse.end)
				+ ' (' + studentCourse.getCourse() + ' курс)',
		});

		studentRow.append(studentNumber, studentFio, studentFaculty, studentDateBirthday, studentStartOfTraining);

		return studentRow;
	}

	// Сортировка студентов
	function sortStudents(arr, column, dir = false) {
		return arr.sort((a, b) => {
			if (dir == true ? a[column] > b[column] : a[column] < b[column]) return -1;
		})
	}

	document.addEventListener('DOMContentLoaded', () => {

		// Создать приложение
		function createApp(container) {

			let dirSort; // флаг направления
			let colSort; // флаг колонки

			const tableStudents = createTableStudents();
			const formAddStudent = createFormAddStudent();

			container.append(formAddStudent.form);
			container.append(tableStudents.table);

			renderTable(students);

			// клики
			(() => {

				// Сортировка
				document.querySelectorAll('.sort').forEach(headSort => headSort.addEventListener('click', function () {
					colSort = this.getAttribute('data-column');
					dirSort = !dirSort;
					renderTable(students);
				}))

				// Фильтр
				document.querySelectorAll('.filter').forEach(headfilter => headfilter.addEventListener('input', function () {
					renderTable(students);
				}))

				// Валидация
				// (() => {

				// 	// Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
				// 	var forms = document.querySelectorAll('.needs-validation')

				// 	// Зацикливайтесь на них и предотвращайте отправку
				// 	Array.prototype.slice.call(forms)
				// 		.forEach(function (form) {
				// 			form.addEventListener('submit', function (event) {
				// 				if (!form.checkValidity()) {
				// 					event.preventDefault()
				// 					event.stopPropagation()
				// 				}

				// 				form.classList.add('was-validated')
				// 			}, false)
				// 		})
				// })()

				// Добавить студента через форму
				document.querySelector('.form').addEventListener('submit', function (e) {

					e.preventDefault();

					formAddStudent.form.classList.add('was-validated')

					if (!formAddStudent.inputSurname.value ||
						!formAddStudent.inputName.value ||
						!formAddStudent.inputMiddleName.value ||
						!formAddStudent.inputFaculty.value) {
						return;
					};

					const item = {
						id: students.length + 1,
						surname: formAddStudent.inputSurname.value.trim(),
						name: formAddStudent.inputName.value.trim(),
						middleName: formAddStudent.inputMiddleName.value.trim(),
						fio: this.surname.value.trim() + ' ' + this.name.value.trim() + ' ' + this.middleName.value.trim(),
						faculty: formAddStudent.inputFaculty.value.trim(),
						dateBirthday: new Date(formAddStudent.inputDateBirthday.value),
						startOfTraining: new Date(formAddStudent.inputStartOfTraining.value),
					};

					students.push(item)

					const studTr = createStudentTr(item);
					tableStudents.tableBody.append(studTr);

					// очистка инпутов
					formAddStudent.inputSurname.value = '';
					formAddStudent.inputName.value = '';
					formAddStudent.inputMiddleName.value = '';
					formAddStudent.inputFaculty.value = '';

					formAddStudent.form.classList.remove('was-validated')
				})
			})()

			// Фильтрация студентов
			function filterStudents(arr) {

				let copyArr = [...arr];

				let filterNumber = document.querySelector('#filterNumber').value;
				let filterFio = document.querySelector('#filterFio').value;
				let filterFaculty = document.querySelector('#filterFaculty').value;
				let filterDateBirthday = document.querySelector('#filterDateBirthday').value;
				let filterStartOfTraining = document.querySelector('#filterStartOfTraining').value;

				copyArr = copyArr.filter(student => String(student.id).includes(filterNumber));
				copyArr = copyArr.filter(student => student.fio.includes(filterFio));
				copyArr = copyArr.filter(student => student.faculty.includes(filterFaculty));
				copyArr = copyArr.filter(student => String(student.dateBirthday.toLocaleDateString().split('.').reverse().join('-')).includes(filterDateBirthday));
				copyArr = copyArr.filter(student => String(student.startOfTraining.getFullYear()).includes(filterStartOfTraining.substr(0, 4)));

				return copyArr;
			}

			// Рендеринг таблицы
			function renderTable(arr) {

				let copyArr = [...arr]; // копия исходного массива со студентами (конкатенация)
				// или
				// let copyArr = Object.assign([], arr);

				copyArr = sortStudents(copyArr, colSort, dirSort);
				copyArr = filterStudents(copyArr);

				tableStudents.tableBody.innerHTML = '';

				for (const item of copyArr) {

					const studTr = createStudentTr(item);
					tableStudents.tableBody.append(studTr);
				}
			}
		}

		createApp(document.getElementById('container'));
	});
})();

