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
			return this;
		}

		this.columnService = new ColumnService();
		this.taskService = new TaskService();
		this.stateService = new StateService();
		this.renderer = new Renderer();
	}

	run() {
		this.columnService.fetch();
		const columns = this.columnService.getColumns();
		this.taskService.fetch();
		const tasks = this.taskService.getTasks();
		this.stateService.setState(columns, tasks);
		this.initEventHandlers();
		this.setBoard();
	}

	handleTaskMoveClick(event) {
		const columns = this.columnService.getColumns();
		const tasks = this.taskService.getTasks();
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
		this.setBoard(false);
	}

	taskMoveRight(id, columnId) {
		this.stateService.taskMoveRight(id, columnId);
		this.setBoard(false);
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
