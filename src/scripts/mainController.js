import Renderer from './Renderer';
import state from './state';
import StateService from './stateService';

const renderer = new Renderer();

class MainController {
	constructor(state) {
		window.onload = renderer.render(state);
		// Add animation to all Cards
		Array.from(document.getElementsByClassName('Card'))
			.forEach((card) => {
				card.style.animation = 'slide-up 0.3s ease-in';
		});
	}

	handleClick(event) {
		// Check if it's "move left" or "move right" button
		if (event.target.parentElement.className.includes('js-Card-buttonContainer--shift')) {
			// Check if the button is not disabled
			if (!event.target.className.includes('js-Card-button') && 
				!event.target.className.includes('js-isDisabled')) {
				// Get `id` of a clicked card and convert it to integer
				const id = Number.parseInt(event.target.parentElement.parentElement.id);
				// "move left" button
				if (event.target === event.target.parentElement.childNodes[0]) {
					this.taskMoveLeft(id);
				}
				// "move right" button
				if (event.target === event.target.parentElement.childNodes[1]) {
					this.taskMoveRight(id);
				}
			}
		}
		event.stopPropagation();
	}

	taskMoveLeft(id) {
		StateService.taskMoveLeft(id, state);
		this.setBoard(state);
	}

	taskMoveRight(id) {
		StateService.taskMoveRight(id, state);
		this.setBoard(state);
	}

	setBoard(state) {
		renderer.render(state);	
	}
}

const mainController = new MainController(state);
const boardBody = document.querySelector('.js-Board-body');
boardBody.addEventListener('click', (event) => mainController.handleClick(event));
