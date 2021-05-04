import {globalEventBus} from 'utils/eventbus';
import {API} from 'utils/api';
import {busEvents} from 'utils/busEvents';

/**
 * Модель страницы списка фильмов
 */
export default class MoviesListModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_BEST_MOVIES_PAGE, this.getBestMovies.bind(this));
        globalEventBus.on(busEvents.GET_GENRE_MOVIES_PAGE, this.getGenreMovies.bind(this));
        globalEventBus.on(busEvents.WATCH_MOVIE, this.watchMovie.bind(this));
        globalEventBus.on(busEvents.UNWATCH_MOVIE, this.unwatchMovie.bind(this));
        globalEventBus.on(busEvents.GET_PLAYLIST_DATA_MOVIES_LIST, this.getPlaylists.bind(this));
    }

    /**
     * Получение заданной страницы лучших фильмов
     * @param {number} page - номер страницы
     */
    getBestMovies(page=1) {
        API.getBestMovies(page)
            .then((res) => {
                res.data.type = 'best';
                globalEventBus.emit(busEvents.SET_MOVIES_PAGE, res.data);
            });
    }

    /**
     * Получение заданной страницы фильмов по выбранным жанрам
     * @param {string[]} genres - массив нужных жанров
     * @param {number} page - номер страницы
     */
    getGenreMovies(genres, page=1) {
        API.getMoviesByGenres(genres, page)
            .then((res) => {
                globalEventBus.emit(busEvents.SET_MOVIES_PAGE, {
                    ...res.data,
                    'type': 'genres',
                    'query': `?filter=${genres.join('+')}`,
                    genres,
                });
            });
    }

    /**
     * Отметить фильм как "просмотренный"
     * @param {number} movieId - идентификатор фильма
     */
    watchMovie(movieId) {
        API.watchMovie(movieId).then(() => {});
    }

    /**
     * Отметить фильм как "просмотренный"
     * @param {number} movieId - идентификатор фильма
     */
    unwatchMovie(movieId) {
        API.unwatchMovie(movieId).then(() => {});
    }

    /**
     * Получить плейлисты пользователя
     */
    getPlaylists() {
        API.getPlaylists().then((res) => globalEventBus.emit(busEvents.SET_PLAYLIST_DATA_MOVIES_LIST, res.data));
    }
}

