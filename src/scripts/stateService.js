/* REVIEW
Зачем и тут и в MainCtrl import state?
Этот класс инициализируется MainCtrl
потом
StateService.setState(state)
* */
import state from './state';

/* REVIEW
не тут - стейт хранится в StateService
* */
const columns = state.columns;

export default class StateService {

    /* REVIEW
	эти методы - не статик
	они должны работать с this.state
	* */

	static taskMoveLeft(id) {
		columns.forEach((column, columnIndex) => {
			if (columns[0] !== column) {
				if (column.cards) {
					column.cards.forEach((card, cardIndex) => {
						if (card.id === id) {
							if (columns[columnIndex - 1].cards) {
								// Add card to the target column card collection
								columns[columnIndex - 1].cards.push(card);
							} else {
								// Create target column card collection and add card
								columns[columnIndex - 1].cards = Array.of();
								columns[columnIndex - 1].cards.push(card);
							}
							// Remove the card from the source column card collecion
							columns[columnIndex].cards.splice(cardIndex, 1);
						}
					});
				}
			}
		});
	}

	static taskMoveRight(id) {
		for (let i = 0; i < columns.length; i++) {
			if (columns[columns.length - 1] !== columns[i]) {
				if (columns[i].cards) {
					for (let j = 0; j < columns[i].cards.length; j++) {
						if (columns[i].cards[j].id === id) {
							if (columns[i + 1].cards) {
								// Add card to the target column card collection
								columns[i + 1].cards.push(columns[i].cards[j]);
							} else {
								// Create target column card collection and add card
								columns[i + 1].cards = Array.of();
								columns[i + 1].cards.push(columns[i].cards[j]);
							}
							// Remove the card from the source column card collecion
							return columns[i].cards.splice(j, 1);
						}
					}
				}
			}
		}
	}
}
