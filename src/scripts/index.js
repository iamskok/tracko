const cardButtonContainers  = document.getElementsByClassName('Card-buttonContainer');

// Select all 'MOVE RIGHT'/'MOVE LEFT' `Card-button`s
for (let i = 1; i < cardButtonContainers.length; i += 2) {
	// Select all 'MOVE RIGHT' buttons
	const rightButtonDOMTokenList = cardButtonContainers[i].children.item(1).classList;
	// Exclude disabled buttons
	if (!rightButtonDOMTokenList.value.includes('js-Card-button-isDisabled')) {
		cardButtonContainers[i].children.item(1).addEventListener(
			'click',
			// Select card node of a clicked button
			(event) => { 
				console.log('MOVE RIGHT button is clicked',
				event.target.parentNode.parentNode
			)}
		);
	}

	// Select all 'MOVE LEFT' buttons
	const leftButtonDOMTokenList = cardButtonContainers[i].children.item(0).classList;
	// Exclude disabled buttons
	if (!leftButtonDOMTokenList.value.includes('js-Card-button-isDisabled')) {
		cardButtonContainers[i].children.item(0).addEventListener(
			'click',
			// Select card node of a clicked button
			(event) => { 
				console.log('MOVE LEFT button is clicked',
				event.target.parentNode.parentNode
			)}
		);
	}
}
