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
     * Обработчик нажатия на кнопку "Лайк"
     * @param {Object} event - событие нажатия
     */
    playlistClicked(event) {
        // TODO: api request
        const movieId = event.target.getAttribute('data-id');
        console.log(`add to playlist movie ${movieId}`);
        if (event.target.checked) {
            // TODO: получить информацию о плейлистах с бекенда
            const playlistsData = {
                movieId: movieId,
                userPlaylists: [
                    {
                        id: 1,
                        playlistName: 'Любимые фильмы',
                        isAdded: true,
                    },
                    {
                        id: 2,
                        playlistName: 'Кино на вечер',
                        isAdded: false,
                    },
                ],
            };
            const widget = new AddToPlaylistWidget(document.getElementById(`add-to-playlist-${movieId}`),
                playlistsData);
            widget.render();
        } else {
            document.getElementById(`add-to-playlist-${movieId}`).innerHTML = '';
        }
    }
}

