import Renderer from './Renderer';
import StateService from './services/StateService';
import ColumnService from './services/ColumnService';
import TaskService from './services/TaskService';
import {selectors} from './consts';

export default class MainController {
	constructor() {
		if (!MainController.instance) {
			MainController.instance = this;
		} else {
			return MainController.instance;
		}

		this.columnService = new ColumnService();
		this.taskService = new TaskService();
		this.stateService = new StateService();
		this.renderer = new Renderer();
	}

	async run() {
		await this.columnService.fetch();
		await this.taskService.fetch();
		this.stateService.setState(
			this.columnService.getColumns(),
			this.taskService.getTasks()
		);
		this.initEventHandlers();
		this.setBoard(300);
	}

	async handleTaskMoveClick(event) {
		const id = Number.parseInt(event.target.dataset.id);
		const columnId = event.target.dataset.columnId;
		const disabled = !!event.target.dataset.disabled;
		const move = event.target.dataset.move;

		if (!disabled) {
			if (move === 'left') {
				this.taskMoveLeft(id, columnId);
			}
			if (move === 'right') {
				this.taskMoveRight(id, columnId);
			}
		}

		event.stopPropagation();
	}

	taskMoveLeft(id, columnId) {
		this.stateService.taskMoveLeft(id, columnId);
		this.setBoard();
	}

	taskMoveRight(id, columnId) {
		this.stateService.taskMoveRight(id, columnId);
		this.setBoard();
	}

	setBoard(delay) {
		const state = this.stateService.getState();
		this.renderer.render(state, delay);
	}

	initEventHandlers() {
		const board = document.querySelector(selectors.board);
		board.addEventListener('click', (event) => this.handleTaskMoveClick(event));
	}
}
