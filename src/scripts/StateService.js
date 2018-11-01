import state from './state';

export default class StateService {
	constructor() {
		this.state = state;
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}

	taskMoveLeft(id) {
		for (let i = 0; i < state.columns.length; i++) {
			const column = state.columns[i];
			if (state.columns[0] !== column) {
				if (column.cards) {
					const cardIndex = column.cards.findIndex(card => card.id === id);
					const card = cardIndex !== -1 && column.cards[cardIndex];
					if (card) {
						const prevColumn = state.columns[i - 1];
						if (prevColumn.cards) {
							prevColumn.cards.push(card);
						} else {
							prevColumn.cards = [card];
						}

						return column.cards.splice(cardIndex, 1);
					}
				}
			}
		}
	}

	taskMoveRight(id) {
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
