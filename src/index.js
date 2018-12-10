// Styles
import './styles/generic/common.scss';
import './styles/components/board.scss';
import './styles/components/column.scss';
import './styles/components/card.scss';

// Scripts
import MainController from './scripts/MainController';

const mainController = new MainController();

window.onload = () => {
	mainController.run();
}
