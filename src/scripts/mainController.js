import Renderer from './Renderer';
import state from './state';
import data from '../data.json';

class MainController {
	constructor(state) {
		const renderer = new Renderer();
		window.onload = renderer.render(state);
	}

	handleClick(event) {
		if (event.target !== event.currentTarget) {
			// Check if it's "move left" or "move right" button
			if (event.target.parentElement.className.includes('js-Card-buttonContainer--shift')) {
				// Check if the button is not disabled
				if (!event.target.className.includes('js-Card-button-isDisabled')) {
					// Check it it's "move left" button
					if (event.target === event.target.parentElement.childNodes[0]) {
						// console.log('move left');
						this.taskMoveLeft();
					}
					// Check if it's "move right" button
					if (event.target === event.target.parentElement.childNodes[1]) {
						this.taskMoveRight();
					}
				}
			}
		}
		event.stopPropagation();
	}

	taskMoveLeft() {
		console.log('move left');
	}

	taskMoveRight() {
		console.log('move left');
	}
}

const mainController = new MainController(data);
const boardBody = document.querySelector('.js-Board-body');
boardBody.addEventListener('click', (event) => mainController.handleClick(event));
