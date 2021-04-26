import {globalEventBus} from '../../utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from '../../utils/busEvents';
import './main.tmpl';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';
import {Carousel} from '../../components/carousel';

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

        this.searchMoviesByGenresCallback = this.searchMoviesByGenres.bind(this);
        this.searchMoviesByGenresPreviewCallback = this.searchMoviesByGenresPreview.bind(this);
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

        this.navbarRightComponent = new NavbarRight(document.getElementById('header'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarRightComponent.render();

        this.bestMoviesCarousel = new Carousel(document.getElementById('best-movies-carousel'),
            {'itemsType': 'movies', 'items': {...this.data.best_movies}});
        this.bestMoviesCarousel.render();

        this.genreMoviesCarousel = new Carousel(document.getElementById('genre-movies-carousel'),
            {'itemsType': 'movies', 'items': {...this.data.movies_by_genres_preview}});
        this.genreMoviesCarousel.render();

        this.setEventListeners();
    }

    /**
     * Показать превью фильмов по выбранным жанрам
     * @param {Object} data - список фильмов
     */
    setMoviesByGenresPreview(data) {
        this.data.movies_by_genres_preview = (data !== null) ? data : [];
        // TODO: плохой перерендер всей страницы
        // TODO: сохранять позицию скролла других каруселей
        this.setMainPageData(this.data);
        this.selectChosenGenres(this.data.selected_genres);
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('main-genre-search-button')?.addEventListener('click',
            this.searchMoviesByGenresCallback);

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => {
                element.addEventListener('click', this.selectGenresListener);
                element.addEventListener('click', this.searchMoviesByGenresPreviewCallback);
            });

        this.navbarRightComponent.setEventListeners();
        this.bestMoviesCarousel.setEventListeners();
        this.genreMoviesCarousel.setEventListeners();
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
            .forEach((element) => {
                element.removeEventListener('click', this.selectGenresListener);
                element.removeEventListener('click', this.searchMoviesByGenresPreviewCallback);
            });

        this.navbarRightComponent.removeEventListeners();
        this.bestMoviesCarousel.removeEventListeners();
        this.genreMoviesCarousel.removeEventListeners();
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
}
