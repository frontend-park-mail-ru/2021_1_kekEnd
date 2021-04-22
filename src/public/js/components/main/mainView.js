import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './main.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';
import {scrollCarousel} from '../../utils/carousel.js';

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
        globalEventBus.on(busEvents.SET_MOVIES_BY_GENRES_PREVIEW, this.setMoviesByGenresPreview.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.searchMoviesByGenresCallback = this.searchMoviesByGenres.bind(this);
        this.searchMoviesByGenresPreviewCallback = this.searchMoviesByGenresPreview.bind(this);
        this.logoutClickedCallback = this.logoutClicked.bind(this);
        this.carouselScrolledCallback = this.carouselScrolled.bind(this);
        this.leftArrowClickedCallback = this.leftArrowClicked.bind(this);
        this.rightArrowClickedCallback = this.rightArrowClicked.bind(this);
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit(busEvents.GET_MAIN_PAGE_DATA);
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        super.hide(this);
    }

    /**
     * Установка данных главной страницы
     * @param {Object} data - данные главной страницы
     */
    setMainPageData(data) {
        this.data = data;
        super.render(this.data);
        this.setEventListeners();
    }

    /**
     * Показать превью фильмов по выбранным жанрам
     * @param {Object} data - список фильмов
     */
    setMoviesByGenresPreview(data) {
        this.data.movies_by_genres_preview = (data !== null) ? data : [];
        super.render(this.data);
        this.setEventListeners();
        this.selectChosenGenres(this.data.selected_genres);
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('main-genre-get-preview')?.addEventListener('click',
            this.searchMoviesByGenresPreviewCallback);

        document.getElementById('main-genre-search-button')?.addEventListener('click',
            this.searchMoviesByGenresCallback);

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => element.addEventListener('click', this.selectGenresListener));

        document.getElementById('logout-button')?.addEventListener('click',
            this.logoutClickedCallback);

        [...document.getElementsByClassName('main__slider')]
            .forEach((element) => {
                const leftArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
                const rightArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
                if (element.offsetWidth === element.scrollWidth) {
                    // все элементы целиком вмещаются, стрелки прокрутки не нужны
                    rightArrow.classList.add('carousel-arrows__arrow_hidden');
                }
                element.addEventListener('scroll', this.carouselScrolledCallback);
                leftArrow.addEventListener('click', this.leftArrowClickedCallback);
                rightArrow.addEventListener('click', this.rightArrowClickedCallback);
            });
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('main-genre-get-preview')?.removeEventListener('click',
            this.searchMoviesByGenresPreviewCallback);

        document.getElementById('main-genre-search-button')?.removeEventListener('click',
            this.searchMoviesByGenresCallback);

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => element.removeEventListener('click', this.selectGenresListener));

        document.getElementById('logout-button')?.removeEventListener('click',
            this.logoutClickedCallback);

        [...document.getElementsByClassName('main__slider')]
            .forEach((element) => {
                const leftArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
                const rightArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
                element.removeEventListener('scroll', this.carouselScrolledCallback);
                leftArrow.removeEventListener('click', this.leftArrowClickedCallback);
                rightArrow.removeEventListener('click', this.rightArrowClickedCallback);
            });
    }

    /**
     * Колбек нажатия на кнопку "показать" в поиске фильмов по жанрам
     */
    searchMoviesByGenresPreview() {
        const genres = this.getSelectedGenres();
        this.data.selected_genres = genres;
        if (genres.length) {
            globalEventBus.emit(busEvents.GET_MOVIES_BY_GENRES_PREVIEW, genres);
        }
    }

    /**
     * Колбек нажатия на кнопку "смотреть все" в поиске фильмов по жанрам
     */
    searchMoviesByGenres() {
        const genres = this.data.selected_genres;
        if (genres.length) {
            document.getElementById('main-genre-search-button').href += genres.join('+');
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
    selectGenresListener = (event) => {
        const button = event.target;
        if (button.classList.contains('genre-selected')) {
            button.classList.remove('genre-selected');
        } else {
            button.classList.add('genre-selected');
        }
    }

    /**
     * После ререндера отметить выбранные жанры
     * @param {string[]} genres - список выбранных жанров
     */
    selectChosenGenres = (genres) => {
        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((genre) => {
                if (genres.includes(genre.innerText)) {
                    genre.classList.add('genre-selected');
                }
            });
    }

    /**
     * Получение выбранных жанров
     * @return {(string|string|*)[]} - список выбранных пользователем жанров
     */
    getSelectedGenres = () => {
        return [...document.getElementsByClassName('genres-list__item-box')]
            .filter((element) => element.classList.contains('genre-selected'))
            .map((element) => element.innerText);
    }

    /**
     * Обработка нажатия на стрелку "назад" в карусели
     * @param {Object} event - событие клика
     */
    leftArrowClicked = (event) => {
        // const carousel = event.target.parentElement.previousElementSibling;
        console.log('scrolling to left');
    }

    /**
     * Обработка нажатия на стрелку "вперед" в карусели
     * @param {Object} event - событие клика
     */
    rightArrowClicked = (event) => {
        // const carousel = event.target.parentElement.previousElementSibling;
        console.log('scrolling to right');
    }

    /**
     * Обработка скролла в карусели
     * @param {Object} event - событие скролла
     */
    carouselScrolled = (event) => {
        const carousel = event.target;
        const leftArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
        const rightArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
        scrollCarousel(carousel, leftArrow, rightArrow);
    }
}
