import _ from 'underscore';
import boardTemplate from './template';
import {selectors} from './consts';

export default class Renderer {
	constructor() {
		this.board = document.querySelector(selectors.board);
	}
	render(state, delay) {
		this.board.innerHTML = _.template(boardTemplate)(state);
		this.removeCardAnimation(delay);
	}

	// Все ли хорошо с этим куском кода или его можно написать как-то иначе?
	// Не знаю почему, но у меня есть какие-то двоекие чувства на его счет
	removeCardAnimation(delay = 300) {
		const cards = Array.from(document.querySelectorAll(selectors.card));
		if (!delay) {
			cards.forEach(card => {
				card.className = card.className.replace(selectors.animation, '').trim();
			})
		} else {
			setTimeout(() => (cards.forEach(card => {
				return card.className = card.className.replace(selectors.animation, '').trim();
			})), delay);
		}
	}
}
