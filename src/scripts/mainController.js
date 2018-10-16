import Renderer from './Renderer';
import data from '../data.json';

// `.Board-body`
const boardBody = document.getElementsByClassName('Board-body')[0];
const renderer = new Renderer();
window.onload = boardBody.innerHTML = renderer.render(data);
