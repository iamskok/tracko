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

		this.taskService.put(
			{
				title: 'TaskService put method'
			},
			'done'
		);
		this.taskService.edit(
			3,
			{
				title: 'TaskService edit method'
			}
		);
	}

	run() {
		const columns = this.columnService.fetch();
		const tasks = this.taskService.fetch();
		this.stateService.setState(columns, tasks);
		this.initEventHandlers();
		this.setBoard();
	}

	handleTaskMoveClick(event) {
		const columns = this.columnService.fetch();
		const tasks = this.taskService.fetch();
		const id = Number.parseInt(event.target.dataset.id);

		tasks.forEach(task => {
			if (task.id === id) {
				columns.forEach((column, index) => {
					if (column.id === task.columnId) {
						if (event.target.className.includes(selectors.btnLeft) &&
							index !== 0) {
							this.taskMoveLeft(id);
						}
						if (event.target.className.includes(selectors.btnRight) &&
							index !== columns.length - 1) {
							this.taskMoveRight(id);
						}
					}
				})
			}
		});

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
		const state = this.stateService.getState();
		this.renderer.render(state, delay);
	}

	initEventHandlers() {
		const board = document.getElementsByClassName(selectors.board)[0];
		board.addEventListener('click', (event) => this.handleTaskMoveClick(event));
	}
}
