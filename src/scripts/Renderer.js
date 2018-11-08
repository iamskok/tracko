import _ from 'underscore';
import boardTemplate from './template';
import SELECTORS from './selectors';

export default class Renderer {
	constructor() {
		this.board = (document.getElementsByClassName(SELECTORS.board)[0]); 
	}
	render(state, delay) {
		this.board.innerHTML = _.template(boardTemplate)(state);
		this.removeCardAnimation(delay);
	}

	removeCardAnimation(delay = 300) {
		const cards = Array.from(document.getElementsByClassName(SELECTORS.card));
		if (!delay) {
			cards.forEach((card) => card.className = card.className.replace(SELECTORS.animated, ''));	
		} else {
			setTimeout(() => (cards.forEach((card) => {
				return card.className = card.className.replace(SELECTORS.animated, '');
			})), delay);
		}
	}
}
