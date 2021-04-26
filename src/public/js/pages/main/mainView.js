import {globalEventBus} from '../../utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from '../../utils/busEvents';
import {scrollCarousel} from '../../utils/carousel';
import './main.tmpl';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';

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

        this.navbarRightComponent = new NavbarRight(document.getElementById('header'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarRightComponent.render();

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
        document.getElementById('main-genre-search-button')?.addEventListener('click',
            this.searchMoviesByGenresCallback);

        [...document.getElementsByClassName('genres-list__item-box')]
            .forEach((element) => {
                element.addEventListener('click', this.selectGenresListener);
                element.addEventListener('click', this.searchMoviesByGenresPreviewCallback);
            });

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

        this.navbarRightComponent.setEventListeners();
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

        [...document.getElementsByClassName('main__slider')]
            .forEach((element) => {
                const leftArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
                const rightArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
                element.removeEventListener('scroll', this.carouselScrolledCallback);
                leftArrow.removeEventListener('click', this.leftArrowClickedCallback);
                rightArrow.removeEventListener('click', this.rightArrowClickedCallback);
            });

        this.navbarRightComponent.removeEventListeners();
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

    /**
     * Обработка нажатия на стрелку "назад" в карусели
     * @param {Object} event - событие клика
     */
    leftArrowClicked = (event) => {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft - carousel.offsetWidth + 50, behavior: 'smooth'});
    }

    /**
     * Обработка нажатия на стрелку "вперед" в карусели
     * @param {Object} event - событие клика
     */
    rightArrowClicked = (event) => {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft + carousel.offsetWidth - 50, behavior: 'smooth'});
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
