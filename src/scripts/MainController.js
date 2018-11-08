import Renderer from './Renderer';
import StateService from './StateService';
import ColumnService from './ColumnService';
import TaskService from './TaskService';
import {selectors} from './consts';

export default class MainController {
	constructor() {
		if (!MainController.instance) {
			MainController.instance = this;
		} else {
			return this;
		}
		this.columnService = new ColumnService();
		this.taskService = new TaskService();
		this.stateService = new StateService();
		this.renderer = new Renderer();
		window.onload = () => {
			this.taskService.fetch();
			this.columnService.fetch();
			this.initEventHandlers();
			this.setBoard();
		}
	}

	handleTaskMoveClick(event) {
		if (!event.target.className.includes(selectors.disabled) &&
			(event.target.className.includes(selectors.btnLeft) ||
			event.target.className.includes(selectors.btnRight))) {
			const id = Number.parseInt(event.target.dataset.id);
			
			if (event.target.className.includes(selectors.btnLeft)) {
				this.taskMoveLeft(id);
			}
			if (event.target.className.includes(selectors.btnRight)) {
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
		const board = document.getElementsByClassName(selectors.board)[0];
		board.addEventListener('click', (event) => this.handleTaskMoveClick(event));
	}
}
