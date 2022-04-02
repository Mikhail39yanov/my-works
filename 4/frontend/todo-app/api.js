const URL = `http://localhost:3000/api/todos`;

function getTodoList(owner) {
	return fetch(`${URL}?owner=${owner}`).then(response => response.json())
}

function creteTodoItem({ owner, name }) {
	return fetch(`${URL}`, {
		method: 'POST',
		body: JSON.stringify({
			name,
			owner,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json())
}

async function switchTodoItemDone({ todoItem }) {
	todoItem.done = !todoItem.done;
	fetch(`${URL}/${todoItem.id}`, {
		method: 'PATCH',
		body: JSON.stringify({ done: todoItem.done }),
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

async function deleteTodoItem({ todoItem, element }) {
	if (!confirm('Вы уверены')) {
		return;
	};
	element.remove();
	await fetch(`${URL}/${todoItem.id}`, {
		method: 'DELETE',
	})
}

export {
	getTodoList,
	creteTodoItem,
	switchTodoItemDone,
	deleteTodoItem,
};
