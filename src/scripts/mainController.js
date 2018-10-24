import Renderer from './Renderer';
import state from './state';
import data from '../data.json';

class MainController {
	constructor(state) {
		const renderer = new Renderer();
		window.onload = renderer.render(state);
	}

	handleClick(event) {
		// Check if it's "move left" or "move right" button
		if (event.target.parentElement.className.includes('js-Card-buttonContainer--shift')) {
			// Check if the button is not disabled
			if (!event.target.className.includes('js-Card-button-isDisabled')) {
				// Get `id` of a clicked card 
				const id = event.target.parentElement.parentElement.id;
				// Check it it's "move left" button
				if (event.target === event.target.parentElement.childNodes[0]) {
					this.taskMoveLeft(id);
				}
				// Check if it's "move right" button
				if (event.target === event.target.parentElement.childNodes[1]) {
					this.taskMoveRight(id);
				}
			}
		}
		event.stopPropagation();
	}

	taskMoveLeft(id) {
		console.log('move left', 'id:', id);
	}

	taskMoveRight(id) {
		console.log('move right', 'id:', id);
	}
}

const mainController = new MainController(data);
const boardBody = document.querySelector('.js-Board-body');
boardBody.addEventListener('click', (event) => mainController.handleClick(event));
