import _ from 'underscore';
import board from './template';

export default class Renderer {
	render(state) {
		const boardBody = document.querySelector('.js-Board-body');
		boardBody.innerHTML = _.template(board)(state);
	}

	removeCardAnimation(delay = 300) {
		const cards = Array.from(document.getElementsByClassName('Card'));
		if (!delay) {
			cards.forEach((card) => card.className = card.className.replace('isAnimated', ''));	
		} else {
			setTimeout(() => (cards.forEach((card) => {
				return card.className = card.className.replace('isAnimated', '');
			})), delay);
		}
	}
}
