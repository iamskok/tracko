import TaskService from './TaskService.js';
import ColumnService from './ColumnService.js';

export default class StateService {
	setState(columns, tasks) {
		const state = {};
		state.columns = [];
		Object.assign(state.columns, columns);
		state.columns.forEach(column => {
			tasks.forEach(task => {
				if (task.columnId === column.id) {
					if (Array.isArray(column.cards)) {
						column.cards.push(task);
					} else {
						column.cards = [task];
					}
				}
			});
		});

		this.state = state;
	}

	getState() {
		return this.state;
	}

	setTask(task) {
		this.columnService = new ColumnService();
		this.taskService = new TaskService();
		const id = task.id;
		if (this.columnService.getColumn(task.columnId)) {
			if (!this.taskService.getTasks()) {
				this.taskService.fetch();
			}
			if (this.taskService.getTasks().map(task => task.id !== id)) {
				this.taskService.getTasks().push(task);
			}
		}
	}

	taskMoveLeft(id, columnId) {
		this.taskService = new TaskService();
		const state = this.getState();
		const columns = state.columns;
		const columnIds = columns.map(column => column.id);
		const firstColumnId = columnIds[0];
		if (firstColumnId !== columnId) {
			const currentColumnIndex = columnIds.indexOf(columnId);
			const currentColumn = columns[currentColumnIndex];
			const cardIndex = currentColumn.cards.findIndex(card => card.id === id);
			const card = cardIndex !== -1 && currentColumn.cards[cardIndex];
			const leftColumn = columns[currentColumnIndex - 1];
			if (leftColumn.cards) {
				leftColumn.cards.push(card);
			} else {
				leftColumn.cards = [card];
			}
			// Для строчек 54-58 я предпочел бы создать переменную `cardCollection`, 
			// чтобы избежать повторений, но в этом случае я получаю следующую ошибку, 
			// почему она происходит? Гуглинг не ошибки не дал никакого внятного ответа
			//
			// Uncaught Error: "cardCollection" is read-only
			//     at _readOnlyError (StateService.js:4)
			//     at StateService.taskMoveLeft (StateService.js:69)
			//     at MainController.taskMoveLeft (MainController.js:74)
			//     at MainController.handleTaskMoveClick (MainController.js:61)
			//     at HTMLElement.eval (MainController.js:96)
			//
			// Код из-за которого происходит данная ошибка:
			//
			// const cardCollection = leftColumn.cards;
			// if (cardCollection) {
			// 	cardCollection.push(card);
			// } else {
			// 	cardCollection = [card];
			// }
			currentColumn.cards.splice(cardIndex, 1);
			this.taskService.assignColumn(id, leftColumn.id);
		}
	}

	taskMoveRight(id, columnId) {
		this.taskService = new TaskService();
		const state = this.getState();
		const columns = state.columns;
		const columnIds = columns.map(column => column.id);
		const lastColumnId = columnIds[columnIds.length - 1];
		if (lastColumnId !== columnId) {
			const currentColumnIndex = columnIds.indexOf(columnId);
			const currentColumn = columns[currentColumnIndex];
			const cardIndex = currentColumn.cards.findIndex(card => card.id === id);
			const card = cardIndex !== -1 && currentColumn.cards[cardIndex];
			const rightColumn = columns[currentColumnIndex + 1];
			if (rightColumn.cards) {
				rightColumn.cards.push(card);
			} else {
				rightColumn.cards = [card];
			}
			currentColumn.cards.splice(cardIndex, 1);
			this.taskService.assignColumn(id, rightColumn.id);
		}
	}
}
