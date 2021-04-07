import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK_CODE} from '../../utils/codes.js';
import {busEvents} from '../../utils/busEvents.js';

/**
 * Модель главной страницы
 */
export default class MainModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_MAIN_PAGE_DATA, this.getBestMoviesPreview.bind(this));
        globalEventBus.on(busEvents.GET_MOVIES_BY_GENRES, this.getMoviesByGenres.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
    }

    /**
     * Получение первой страницы лучших фильмов
     */
    getBestMoviesPreview() {
        Promise.all([API.getUser(), API.getBestMovies(1)])
            .then((responses) => {
                const [userResp, bestMoviesResp] = responses;
                globalEventBus.emit(busEvents.SET_MAIN_PAGE_DATA, {
                    'best_movies': bestMoviesResp.data.movies,
                    'isAuthorized': userResp.status === OK_CODE,
                });
            });
    }

    /**
     * Получение первой страницы фильмов по выбранным жанрам
     * @param {Array} genres - список жанров
     */
    getMoviesByGenres(genres) {
        ///TODO: request movies by genres
        console.log('requested movies by genres:' + genres);
    }

    /**
     * Выход со страницы
     */
    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit(busEvents.LOGOUT_STATUS, res.status === OK_CODE);
            });
    }
}

