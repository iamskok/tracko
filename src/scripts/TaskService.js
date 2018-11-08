import tasks from './tasks';

export default class TaskService {
	fetch() {
		console.log('TaskService.fetch()', tasks);
		return tasks;
	}
}
