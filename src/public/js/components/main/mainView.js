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

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => element.addEventListener('click', this.selectGenresListener));

        document.getElementById('logout-button')?.addEventListener('click',
            this.logoutClickedCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('main-genre-search-button')?.removeEventListener('click',
            this.searchMoviesByGenresCallback);

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => element.removeEventListener('click', this.selectGenresListener));

        document.getElementById('logout-button')?.removeEventListener('click',
            this.logoutClickedCallback);
    }

    /**
     * Колбек нажатия на кнопку поиска фильмов по жанрам
     */
    searchMoviesByGenresCallback() {
        const genres = [...document.getElementsByClassName('genres-list__item-box')]
            .filter((element) => element.classList.contains('genre-selected'))
            .map((element) => element.getAttribute('data-genre'));
        if (genres.length) {
            document.getElementById('main-genre-search-button').href = `/movies/genre/1/?filter=${genres.join('+')}`;
        }
    }

    /**
     * Обработка нажатия логаута
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

    /**
     * Логика клика на кнопку жанра
     * @param {Object} event - объект события
     */
    selectGenresListener(event) {
        const button = event.target;
        if (button.classList.contains('genre-selected')) {
            button.classList.remove('genre-selected');
        } else {
            button.classList.add('genre-selected');
        }
    }
}
