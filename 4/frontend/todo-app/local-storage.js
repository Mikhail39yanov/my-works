function getTodoList(key) {
	let localData = window.localStorage.getItem(key);
	let todoItemList = []

	if (localData !== null && localData !== '' && localData.length > 2) {
		return todoItemList = JSON.parse(localData)
	};
}

function switchTodoItemDone({ todoItem }, key) {
	todoItem.done = !todoItem.done;
	saveList(key);
}

function deleteTodoItem({ todoItem, element }, key) {
	if (!confirm('Вы уверены')) {
		return;
	};
	element.remove();
	saveList(key);
}

function saveList(key) {
	let listArray = document.querySelectorAll('.list-group-item');
	let result = [];

	listArray.forEach(item => {
		result.push({
			name: item.firstChild.textContent,
			done: item.classList.contains('list-group-item-success'),
		});
	})

	window.localStorage.setItem(key, JSON.stringify(result));
};

export {
	getTodoList,
	saveList,
	switchTodoItemDone,
	deleteTodoItem,
};
