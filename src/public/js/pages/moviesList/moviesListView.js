import {globalEventBus} from 'utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from 'utils/busEvents';
import {Navbar} from 'components/navbar';
import {userMeta} from 'utils/userMeta';
import {AddToPlaylistWidget} from 'components/addToPlaylist';
import './moviesList.tmpl';

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
        globalEventBus.on(busEvents.SET_PLAYLIST_DATA_MOVIES_LIST, this.displayPlaylists.bind(this));

        this.watchedClickedCallback = this.watchedClicked.bind(this);
        this.playlistClickedCallback = this.playlistClicked.bind(this);
    }

    /**
     * Открытие нужной страницы в зависимости от параметров
     * @param {Object} params - параметры страницы
     */
    render(params) {
        const [category, page, query] = params.split('/');
        switch (category) {
        case 'best':
            globalEventBus.emit(busEvents.GET_BEST_MOVIES_PAGE, page);
            break;
        case 'genre':
            globalEventBus.emit(busEvents.GET_GENRE_MOVIES_PAGE, query.slice('?filter='.length).split('+'), page);
            break;
        }
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        this.currentPlaylistWidget = null;
        super.hide(this);
    }

    /**
     * Запуск рендера и подписки на события
     * @param {Object} data - данные о списке фильмов
     */
    setMovies(data) {
        super.render(data);

        this.navbarComponent = new Navbar(document.getElementById('navbar'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarComponent.render();

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

        this.navbarComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        [...document.getElementsByClassName('buttons__input-watched')]
            .forEach((element) => element.removeEventListener('click', this.watchedClickedCallback));
        [...document.getElementsByClassName('buttons__input-playlist')]
            .forEach((element) => element.removeEventListener('click', this.playlistClickedCallback));

        this.navbarComponent.removeEventListeners();
        this.currentPlaylistWidget?.hide();
    }

    /**
     * Обработчик нажатия на кнопку "Просмотрено"
     * @param {Object} event - событие нажатия
     */
    watchedClicked(event) {
        // TODO: api request
        const movieId = event.target.getAttribute('data-id');
        console.log(`watched movie ${movieId}`);
    }

    /**
     * Обработчик нажатия на кнопку "Добавить в плейлист"
     * @param {Object} event - событие нажатия
     */
    playlistClicked(event) {
        this.movieId = event.target.getAttribute('data-id');
        this.currentPlaylistWidget?.hide();
        this.currentPlaylistWidget = null;
        if (event.target.checked) {
            globalEventBus.emit(busEvents.GET_PLAYLIST_DATA_MOVIES_LIST, this.movieId);
        }
    }

    /**
     * Отобразить виджет со списком плейлистов
     * @param {Object} playlists - информация о плейлистах
     */
    displayPlaylists(playlists) {
        const playlistsData = {
            'playlists': playlists,
            'movieId': this.movieId,
        };
        this.currentPlaylistWidget = new AddToPlaylistWidget(document.getElementById(`add-to-playlist-${this.movieId}`),
            playlistsData);
        this.currentPlaylistWidget.render();
        this.currentPlaylistWidget.setEventListeners();
    }
}

