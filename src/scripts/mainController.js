import Renderer from './Renderer';
import StateService from './stateService';

export default class MainController {
	constructor() {
		if (!MainController.instance) {
			MainController.instance = this;
		} else {
			return this;
		}
		
		this.stateService = new StateService();
		this.renderer = new Renderer();

		window.onload = () => {
			this.initEventHandlers();
			this.setBoard();
			this.removeCardAnimation();
		}

		return MainController.instance;
	}

	handleTaskMoveClick(event) {
		const SELECTORS = {
			disabled: 'isDisabled',
			left: 'js-Card-button--left',
			right: 'js-Card-button--right'
		};

		// Check if it's a button and it's not disabled
		if (!event.target.className.includes(SELECTORS.disabled) &&
			(event.target.className.includes(SELECTORS.left) ||
			event.target.className.includes(SELECTORS.right))) {
			// Convert ID (string => integer)
			const id = Number.parseInt(event.target.dataset.id);
			
			if (event.target.className.includes(SELECTORS.left)) {
				this.taskMoveLeft(id);
			}
			if (event.target.className.includes(SELECTORS.right)) {
				this.taskMoveRight(id);
			}
		}
		event.stopPropagation();
	}

	taskMoveLeft(id) {
		this.stateService.taskMoveLeft(id);
		this.setBoard();
		this.removeCardAnimation(false);
	}

	taskMoveRight(id) {
		this.stateService.taskMoveRight(id);
		this.setBoard();
		this.removeCardAnimation(false);
	}

	setBoard() {
		const state = this.stateService.getState()
		this.renderer.render(state);
	}

	initEventHandlers() {
		const boardBody = document.querySelector('.js-Board-body');
		boardBody.addEventListener('click', (event) => this.handleTaskMoveClick(event));
	}

	removeCardAnimation(delay) {
		this.renderer.removeCardAnimation(delay);
	}
}
