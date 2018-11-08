import Renderer from './Renderer';
import StateService from './StateService';
import SELECTORS from './selectors';

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
		}
	}

	handleTaskMoveClick(event) {
		if (!event.target.className.includes(SELECTORS.disabled) &&
			(event.target.className.includes(SELECTORS.btnLeft) ||
			event.target.className.includes(SELECTORS.btnRight))) {
			const id = Number.parseInt(event.target.dataset.id);
			
			if (event.target.className.includes(SELECTORS.btnLeft)) {
				this.taskMoveLeft(id);
			}
			if (event.target.className.includes(SELECTORS.btnRight)) {
				this.taskMoveRight(id);
			}
		}
		event.stopPropagation();
	}

	taskMoveLeft(id) {
		this.stateService.taskMoveLeft(id);
		this.setBoard(false);
	}

	taskMoveRight(id) {
		this.stateService.taskMoveRight(id);
		this.setBoard(false);
	}

	setBoard(delay) {
		const state = this.stateService.getState()
		this.renderer.render(state, delay);
	}

	initEventHandlers() {
		const board = document.getElementsByClassName(SELECTORS.board)[0];
		board.addEventListener('click', (event) => this.handleTaskMoveClick(event));
	}
}
