import Renderer from './Renderer';
import data from '../data.json';

const renderer = new Renderer();
window.onload = renderer.render(data);
