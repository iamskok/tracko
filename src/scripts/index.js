import data from '../data.json';

// `.Board-body`
const boardBody = document.getElementsByClassName('Board-body')[0];

const createColumns = (data) => {
	const columnCollection = [];

	// Loop over all column's data
	data.forEach((columnData) => {
		// `.Column`
		const column = document.createElement('section');
		column.setAttribute('id', columnData.id);
		column.className = 'Column';

		// `.Column-header`
		const columnHeader = document.createElement('h2');
		columnHeader.className = 'Column-header';
		columnHeader.textContent = columnData.title;
		column.appendChild(columnHeader);

		const cardCollection = [];

		// Check if cards exist in a column
		if (columnData.cards) {
			// Loop over all card's data in a column
			columnData.cards.forEach((cardData) => {
				// `.Card`
				const card = document.createElement('div');
				card.className = 'Card';

				// Top `.Card-buttonContainer`
				const cardButtonContainerTop = document.createElement('div');
				cardButtonContainerTop.className = 'Card-buttonContainer';

				// Edit `.Card-button`
				const editButton = document.createElement('button');
				editButton.className = 'Card-button';
				editButton.textContent = 'edit';

				// Remove `.Card-button`
				const removeButton = document.createElement('button');
				removeButton.className = 'Card-button';
				removeButton.textContent = 'remove';

				// Composite top `.Card-buttonContainer`
				cardButtonContainerTop.appendChild(editButton);
				cardButtonContainerTop.appendChild(removeButton);

				// Composite `.Card`
				card.appendChild(cardButtonContainerTop);

				// `.Card-header`
				const cardHeader = document.createElement('h3');
				cardHeader.className = 'Card-header';
				cardHeader.textContent = cardData.title;
				card.appendChild(cardHeader);

				// `.Card-time`
				if (cardData.time) {
					const cardTime = document.createElement('span');
					cardTime.className = 'Card-time';
					cardTime.textContent = cardData.time;
					card.appendChild(cardTime);
				}

				// Bottom `.Card-buttonContainer`
				const cardButtonContainerBottom = document.createElement('div');
				cardButtonContainerBottom.className = 'Card-buttonContainer';

				// Move left `.Card-button`
				const leftButton = document.createElement('button');
				leftButton.className = 'Card-button';
				leftButton.textContent = 'move left';

				// Add `.isDisabled` class for 'move left' buttons in the first column
				if (data[0] === columnData) {
					leftButton.className += ' isDisabled';
				}

				// Move right `.Card-button`
				const rightButton = document.createElement('button');
				rightButton.className = 'Card-button';
				rightButton.textContent = 'move right';

				// Add `.isDisabled` class for 'move right' buttons in the last column
				if (data[data.length - 1] === columnData) {
					rightButton.className += ' isDisabled';
				}

				// Composite bottom `.Card-buttonContainer`
				cardButtonContainerBottom.appendChild(leftButton);
				cardButtonContainerBottom.appendChild(rightButton);

				// Composite `.Card`
				card.appendChild(cardButtonContainerBottom);

				cardCollection.push(card);
			});
		}

		// Composite all cards in a column
		cardCollection.forEach((cardData) => {
			column.appendChild(cardData);
		});

		// `.Column-button`
		if (columnData.button) {
			const columnButton = document.createElement('button');
			columnButton.className = 'Column-button';
			columnButton.textContent = columnData.button;
			column.appendChild(columnButton);
		}

		// Add all columns in column collection
		columnCollection.push(column);
	});

	return columnCollection;
}

// Loop over column's data and append it inside `.Board-body`
createColumns(data.columns).forEach((column) => {
	boardBody.appendChild(column);
});
