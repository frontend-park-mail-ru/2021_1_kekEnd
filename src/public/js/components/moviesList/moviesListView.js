import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './moviesList.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';

export default class MoviesListView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['moviesList.hbs']);

        globalEventBus.on(busEvents.SET_MOVIES_PAGE, this.setBestMovies.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.paginationButtonClickedCallback = this.paginationButtonClicked.bind(this);
        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    render() {
        globalEventBus.emit(busEvents.GET_BEST_MOVIES_PAGE);
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setBestMovies(data) {
        super.render(data);
        this.setEventListeners();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('logout-button')?.addEventListener('click', this.logoutClickedCallback);
        [...document.getElementsByClassName('pagination-button')].forEach((button) => {
            button.addEventListener('click', this.paginationButtonClickedCallback);
        });
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
        [...document.getElementsByClassName('pagination-button')].forEach((button) => {
            button.removeEventListener('click', this.paginationButtonClickedCallback);
        });
    }

    /**
     * Нажатие на кнопку пагинации в списке фильмов
     * @param {Object} event - событие нажатия на кнопку пагинации
     */
    paginationButtonClicked(event) {
        globalEventBus.emit(busEvents.GET_BEST_MOVIES_PAGE, event.target.getAttribute('data-page-index'));
    }

    logoutClicked() {
        globalEventBus.emit(busEvents.LOGOUT_CLICKED);
    }

    /**
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}
