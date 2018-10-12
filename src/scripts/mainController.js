import renderer from './renderer';
import data from '../data.json';

// `.Board-body`
const boardBody = document.getElementsByClassName('Board-body')[0];

window.onload = renderer(data.columns).forEach((column) => {
	boardBody.appendChild(column);
});
