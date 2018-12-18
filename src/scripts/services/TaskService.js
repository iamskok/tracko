import tasks from '../tasks';
import ColumnService from './ColumnService';

export default class TaskService {
	constructor() {
		if (!TaskService.instance) {
			TaskService.instance = this;
		} else {
			return this;
		}

		this.columnService = new ColumnService();
	}

	fetch() {
		this.tasks = tasks.cards;
	}

	getTasks() {
		return this.tasks;
	}

	put(task, columnId) {
		this.columnService.fetch();
		this.columnService.getColumns().find(column => {
			if (column.id === columnId) {
				this.fetch();
				const tasks = this.getTasks();
				this.tasks.push(Object.assign({id: tasks.length}, task, {columnId}));
			}
		});
	}

	edit(id, prop) {
		this.fetch();
		this.getTasks().find(task => {
			if (task.id === id) {
				const taskKeys = Object.keys(task);
				const propKey = Object.keys(prop)[0];
				if (taskKeys.includes(propKey)) {
					Object.assign(task, prop);
				}
			}
		});
	}

	assignColumn(taskId, columnId) {
		this.fetch();
		this.getTasks().filter(task => task.id === taskId)[0].columnId = columnId;
	}
}
