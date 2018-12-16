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

	// taskMoveLeft(id, columnId) {
	// 	const state = this.getState();
	// 	for (let i = 0; i < state.columns.length; i++) {
	// 		const column = state.columns[i];
	// 		if (state.columns[0] !== column) {
	// 			if (column.cards) {
	// 				const cardIndex = column.cards.findIndex(card => card.id === id);
	// 				const card = cardIndex !== -1 && column.cards[cardIndex];
	// 				if (card) {
	// 					const prevColumn = state.columns[i - 1];
	// 					if (prevColumn.cards) {
	// 						prevColumn.cards.push(card);
	// 					} else {
	// 						prevColumn.cards = [card];
	// 					}

	// 					return column.cards.splice(cardIndex, 1);
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	taskMoveLeft(id, columnId) {
		const state = this.getState();
		console.log(this.getState());
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
			currentColumn.cards.splice(cardIndex, 1);
		}
		console.log(this.getState());
	}

	taskMoveRight(id, columnId) {
		const state = this.getState();
		for (let i = 0; i < state.columns.length; i++) {
			const column = state.columns[i];
			if (state.columns[state.columns.length - 1] !== column) {
				if (column.cards) {
					const cardIndex = column.cards.findIndex(card => card.id === id);
					const card = cardIndex !== -1 && column.cards[cardIndex];
					if (card) {
						const nextColumn = state.columns[i + 1];
						if (nextColumn.cards) {
							nextColumn.cards.push(card);
						} else {
							nextColumn.cards = [card];
						}

						return column.cards.splice(cardIndex, 1);
					}
				}
			}
		}
	}
}
