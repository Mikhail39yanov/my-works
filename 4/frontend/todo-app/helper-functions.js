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

export { createElement }
