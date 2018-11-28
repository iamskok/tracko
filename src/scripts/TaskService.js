import tasks from './tasks';
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
		return tasks;
	}

	put(task, columnId) {
		const columns = this.columnService.fetch().columns;
		columns.forEach(column => {
			if (column.id === columnId) {
				const tasks = this.fetch().cards;
				tasks.push(Object.assign(
					{id: tasks.length},
					task,
					{columnId}
				));
			}
		});
	}

	edit(id, prop) {
		const tasks = this.fetch().cards;
		tasks.forEach(task => {
			if (task.id === id) {
				const taskKeys = Object.keys(task);
				const propKey = Object.keys(prop)[0];
				if (taskKeys.includes(propKey)) {
					Object.assign(task, prop);
				}
			}
		});
	}
}
