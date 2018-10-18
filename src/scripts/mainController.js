import Renderer from './Renderer';
import data from '../data.json';
import State from './state';

const renderer = new Renderer();
const state = new State();
window.onload = renderer.render(data);

const jsBoardBody = document.querySelector('.js-Board-body');
jsBoardBody.addEventListener('click', (event) => handleClick(event));

const handleClick = (event) => {
	if (event.target !== event.currentTarget) {
		// Check if it's "move left" or "move right" button
		if (event.target.parentElement.className.includes('js-Card-buttonContainer--shift')) {
			// Check if the button is not disabled
			if (!event.target.className.includes('js-Card-button-isDisabled')) {
				// Check it it's "move left" button
				if (event.target === event.target.parentElement.childNodes[0]) {
					state.moveTaskLeft();
				}
				// Check if it's "move right" button
				if (event.target === event.target.parentElement.childNodes[1]) {
					state.moveTaskRight();
				}
			}
		}
	}
	event.stopPropagation();
};
