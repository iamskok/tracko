import tasks from '../tasks';
import ColumnService from './ColumnService';

export default class TaskService {
	constructor() {
		if (!TaskService.instance) {
			TaskService.instance = this;
			this.tasks = [];
			this.columnService = new ColumnService();
		} else {
			return TaskService.instance;
		}
	}

	async fetch() {
		this.tasks = await Promise.resolve(tasks);
	}

	getTasks() {
		return this.tasks;
	}

	getTask(id) {
		return this.tasks.filter(task => task.id === id)[0];
	}

	put(title, columnId) {
		if (this.columnService.getColumn(columnId)) {
			this.tasks.push({
				id: this.tasks.length,
				title,
				columnId
			});
		} else {
			console.error(`TaskService.put: ${columnId} does not exist.`)
		}
	}

	edit(title, id) {
		const task = this.getTask(id);
		task.title = title;
	}

	assignColumn(id, columnId) {
		this.getTask(id).columnId = columnId;
	}
}
