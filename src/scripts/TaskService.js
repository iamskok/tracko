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

	edit(id, prop) {
		const tasks = this.fetch();
		tasks.cards.forEach(task => {
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
