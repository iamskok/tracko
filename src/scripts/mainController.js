import Renderer from './Renderer';
import state from './state';
import StateService from './stateService';

/* REVIEW
Не тут
* */
const renderer = new Renderer();

class MainController {
    constructor(state) {
        window.onload = renderer.render(state);
        this.removeCardAnimation(state);
        /* REVIEW
        MainController не занимается фигней типа добавления стилей, тем более инлайн-стилей.
        MainController.constructor вызывается до того, как на страницу подъедут таски и проч
        (это сейчас они замоканы, потом-то с сервера ехать будут),
        поэтому document.getElementsByClassName('Card') - ничего не вернет.
        Еще раз - не работа это для контроллера.
        * */

        // Get an array of all cards
        // const cards = Array.from(document.getElementsByClassName('Card'));
        // Add animation to all Cards
        // cards.forEach((card) => {
            /* REVIEW
            Инлайн стили - прибежище судного дня и порой его же причина =)
            Нужна анимация - суй ее в стили.
            * */
            // card.style.animation = 'slide-up 0.3s ease-in';
        // });
        // Remove animation from all Cards
        // setTimeout(() => cards.forEach((card) => card.removeAttribute('style')), 300);
    }

    handleClick(event) {
        // Check if it's "move left" or "move right" button
        /* REVIEW
        Выноси имена классов в переменные и с нимн работай. 1 опечатка и с ума сойдешь искать где ошибка,
        а опечатки оч фигово отыскиваются
        * */
        if (event.target.parentElement.className.includes('js-Card-buttonContainer--shift')) {
            // Check if the button is not disabled
            if (!event.target.className.includes('js-Card-button') &&
                !event.target.className.includes('js-isDisabled')) {
                // Get `id` of a clicked card and convert it to integer
                /* REVIEW
                добавится еще 1 врапер для кнопок - и не будет у  .parentElement.parentElement id'шника
                ты прямо в кнопку можешь записать id и брать оттуда же
                * */
                const id = Number.parseInt(event.target.parentElement.parentElement.id);
                // "move left" button

                /* REVIEW
                .childNodes[x] тоже избегай
                просто проверь класс типа js-move-xxx и все
                * */
                if (event.target === event.target.parentElement.childNodes[0]) {
                    this.taskMoveLeft(id);
                }
                // "move right" button
                if (event.target === event.target.parentElement.childNodes[1]) {
                    this.taskMoveRight(id);
                }
            }
        }
        event.stopPropagation();
    }

    taskMoveLeft(id) {
        /* REVIEW
        StateService больше знает про state, чем кто либо. Не надо в него пихать взятый непойми откуда стейт =)
        Интерфейс должен быть StateService.taskMoveLeft(id);
        * */
        StateService.taskMoveLeft(id, state);
        this.setBoard(state);
    }

    taskMoveRight(id) {
        StateService.taskMoveRight(id, state);
        this.setBoard(state);
    }

    setBoard(state) {
        /* REVIEW
        const state = StateService.getState();
        Renderer.render(state)
        * */
        renderer.render(state);
    }

    removeCardAnimation(state) {
        renderer.removeCardAnimation(state);
    }
}

/* REVIEW
Если кому-то еще понадобится дернуть MainController и он его импортнет, то вот это
const mainController = new MainController(state)
все попортит.
Делай синглтоном или (advanced) dependency injection
пока лучше синглтоном
*/
const mainController = new MainController(state);
const boardBody = document.querySelector('.js-Board-body');
boardBody.addEventListener('click', (event) => mainController.handleClick(event));
