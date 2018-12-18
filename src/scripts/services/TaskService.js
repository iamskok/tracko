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

	getTask(id) {
		if (!this.getTasks()) {
			this.fetch();
		}
		return this.getTasks().filter(task => task.id === id)[0];
	}

	put(task, columnId) {
		if (!this.columnService.getColumns()) {
			this.columnService.fetch();
		}
		this.columnService.getColumns().find(column => {
			if (column.id === columnId) {
				if (!this.getTasks()) {
					this.fetch();
				}
				const tasks = this.getTasks();
				tasks.push(Object.assign({id: tasks.length}, task, {columnId}));
			}
		});
	}

	edit(id, prop) {
		const task = this.getTask(id);
		const taskKeys = Object.keys(task);
		const propKey = Object.keys(prop)[0];
		if (taskKeys.includes(propKey)) {
			Object.assign(task, prop);
		}
	}

	assignColumn(id, columnId) {
		this.getTask(id).columnId = columnId;
	}
}
