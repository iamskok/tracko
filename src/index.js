// Styles
import './styles/generic/common.scss';
import './styles/components/board.scss';
import './styles/components/column.scss';
import './styles/components/card.scss';

// Scripts
import MainController from './scripts/MainController';

const mainController = new MainController();

window.onload = () => {
	const columns = mainController.columnService.fetch();
	const tasks = mainController.taskService.fetch();
	mainController.stateService.setState(columns, tasks);
	mainController.initEventHandlers();
	mainController.setBoard();
}
