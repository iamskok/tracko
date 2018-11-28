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
		return tasks.cards;
	}

	put(task, columnId) {
		this.columnService.fetch()
			.columns.forEach(column => {
				if (column.id === columnId) {
					const tasks = this.fetch();
					tasks.push(Object.assign(
						{id: tasks.length},
						task,
						{columnId}
					));
				}
		});
	}

	edit(id, prop) {
		this.fetch().forEach(task => {
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
