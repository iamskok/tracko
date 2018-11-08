import _ from 'underscore';
import boardTemplate from './template';
import {selectors} from './consts';

export default class Renderer {
	constructor() {
		this.board = document.getElementsByClassName(selectors.board)[0];
	}
	render(state, delay) {
		this.board.innerHTML = _.template(boardTemplate)(state);
		this.removeCardAnimation(delay);
	}

	removeCardAnimation(delay = 300) {
		const cards = Array.from(document.getElementsByClassName(selectors.card));
		if (!delay) {
			cards.forEach((card) => card.className = card.className.replace(selectors.animated, ''));	
		} else {
			setTimeout(() => (cards.forEach((card) => {
				return card.className = card.className.replace(selectors.animated, '');
			})), delay);
		}
	}
}
