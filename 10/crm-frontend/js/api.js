import { WAIT_TIME_MS, URL } from './config.js';
import {
	delay,
	debounce,
} from './helper-function.js';

async function fetchGetAllClients() {
	const response = await fetch(`${URL}`);
	return await response.json();
}

async function fetchGetClient(clientItemId) {
	await delay(WAIT_TIME_MS);
	const response = await fetch(`${URL}/${clientItemId}`);
	return await response.json();
}

async function fetchGetSearchClient(search) {
	const response = await fetch(`${URL}?search=${search}`);
	return await response.json();
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
	await delay(WAIT_TIME_MS);
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

async function fetchDeleteClient(clientItemId) {
	await fetch(`${URL}/${clientItemId}`, {
		method: 'DELETE',
	});
}

export {
	fetchGetAllClients,
	fetchGetClient,
	fetchGetSearchClient,
	fetchPostCreateClient,
	fetchPatchUpdateClient,
	fetchDeleteClient,
};
