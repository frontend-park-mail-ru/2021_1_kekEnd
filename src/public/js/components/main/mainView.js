import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './main.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';

/**
 * Представление главной страницы
 */
export default class MainView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['main.hbs']);

        globalEventBus.on(busEvents.SET_MAIN_PAGE_DATA, this.setMainPageData.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit(busEvents.GET_MAIN_PAGE_DATA);
    }

    /**
     * Очистить страницу
     */
    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    /**
     * Установка данных главной страницы
     * @param {Object} data - данные главной страницы
     */
    setMainPageData(data) {
        super.render(data);
        this.setEventListeners();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('main-genre-search-button')?.addEventListener('click',
            this.searchMoviesByGenresCallback);
        Array.from(document.getElementsByClassName('main-genre-box'))
            .forEach( (element) => element.addEventListener('click', (event) => {
                const button = event.toElement;
                if (button.classList.contains('genre-selected')) {
                    button.classList.remove('genre-selected');
                } else {
                    button.classList.add('genre-selected');
                }
            }) );
        document.getElementById('logout-button')?.addEventListener('click',
            this.logoutClickedCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('main-genre-search-button')?.removeEventListener('click',
            this.searchMoviesByGenresCallback);
        Array.from(document.getElementsByClassName('main-genre-box'))
            .forEach( (element) => element.removeEventListener('click', (event) => {
                const button = event.toElement;
                if (button.classList.contains('genre-selected')) {
                    button.classList.remove('genre-selected');
                } else {
                    button.classList.add('genre-selected');
                }
            }) );
        document.getElementById('logout-button')?.removeEventListener('click',
            this.logoutClickedCallback);
    }

    /**
     * Колбек нажатия на кнопку поиска фильмов по жанрам
     */
    searchMoviesByGenresCallback() {
        const genres = Array.from(document.getElementsByClassName('main-genre-box'))
            .filter( (element) => element.classList.contains('genre-selected') )
            .map( (element) => element.innerText );
        if (genres.length) {
            console.log('search by genres clicked: ' + genres);
            // /TODO: search by genres
        }
    }

    /**
     * Колбек логаута
     */
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

