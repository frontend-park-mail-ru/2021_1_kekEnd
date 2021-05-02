import {globalEventBus} from '../../utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from '../../utils/busEvents';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';
import './moviesList.tmpl';
import {AddToPlaylistWidget} from '../../components/addToPlaylist';

/**
 * Представление страницы списка фильмов
 */
export default class MoviesListView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['moviesList.hbs']);

        globalEventBus.on(busEvents.SET_MOVIES_PAGE, this.setMovies.bind(this));
        globalEventBus.on(busEvents.SET_USER_PLAYLISTS, this.displayPlaylists.bind(this));

        this.watchedClickedCallback = this.watchedClicked.bind(this);
        this.playlistClickedCallback = this.playlistClicked.bind(this);
    }

    /**
     * Открытие нужной страницы в зависимости от параметров
     * @param {Object} params - параметры страницы
     */
    render(params) {
        const [category, page, query] = params.split('/');
        if (category === 'best') {
            globalEventBus.emit(busEvents.GET_BEST_MOVIES_PAGE, page);
            return;
        }
        if (category === 'genre') {
            const genres = query.slice('?filter='.length).split('+');
            globalEventBus.emit(busEvents.GET_GENRE_MOVIES_PAGE, genres, page);
        }
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        super.hide(this);
    }

    /**
     * Запуск рендера и подписки на события
     * @param {Object} data - данные о списке фильмов
     */
    setMovies(data) {
        super.render(data);

        this.navbarRightComponent = new NavbarRight(document.getElementById('header'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarRightComponent.render();

        this.setEventListeners();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        [...document.getElementsByClassName('buttons__input-watched')]
            .forEach((element) => element.addEventListener('click', this.watchedClickedCallback));
        [...document.getElementsByClassName('buttons__input-playlist')]
            .forEach((element) => element.addEventListener('click', this.playlistClickedCallback));

        this.navbarRightComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        [...document.getElementsByClassName('buttons__input-watched')]
            .forEach((element) => element.removeEventListener('click', this.watchedClickedCallback));
        [...document.getElementsByClassName('buttons__input-playlist')]
            .forEach((element) => element.removeEventListener('click', this.playlistClickedCallback));

        this.navbarRightComponent.removeEventListeners();
        this.currentPlaylistWidget?.hide();
    }

    /**
     * Обработчик нажатия на кнопку "Просмотрено"
     * @param {Object} event - событие нажатия
     */
    watchedClicked(event) {
        const checkbox = event.target;
        const movieId = checkbox.getAttribute('data-id');
        if (checkbox.checked) {
            globalEventBus.emit(busEvents.WATCH_MOVIE, movieId);
            return;
        }
        globalEventBus.emit(busEvents.UNWATCH_MOVIE, movieId);
    }

    /**
     * Обработчик нажатия на кнопку "Добавить в плейлист"
     * @param {Object} event - событие нажатия
     */
    playlistClicked(event) {
        const movieId = event.target.getAttribute('data-id');

        this.currentPlaylistWidget?.hide();
        this.currentPlaylistWidget = null;

        if (event.target.checked) {
            globalEventBus.emit(busEvents.GET_USER_PLAYLISTS, movieId);
        }
    }

    /**
     * Отобразить виджет со списком плейлистов
     * @param {Object} data - информация о плейлистах
     */
    displayPlaylists(data) {
        this.currentPlaylistWidget = new AddToPlaylistWidget(document.getElementById(`add-to-playlist-${data.movieId}`),
            data);
        this.currentPlaylistWidget.render();
        this.currentPlaylistWidget.setEventListeners();
    }
}

