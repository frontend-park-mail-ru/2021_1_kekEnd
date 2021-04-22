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
        globalEventBus.on(busEvents.GET_MAIN_PAGE_DATA, this.getMainPageData.bind(this));
        globalEventBus.on(busEvents.GET_MOVIES_BY_GENRES_PREVIEW, this.getMoviesByGenresPreview.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
    }

    /**
     * Получение первой страницы лучших фильмов
     */
    getMainPageData() {
        Promise.all([API.getUser(), API.getBestMovies(1), API.getAllAvailableGenres()])
            .then((responses) => {
                const [userResp, bestMoviesResp, genresResp] = responses;
                globalEventBus.emit(busEvents.SET_MAIN_PAGE_DATA, {
                    'isAuthorized': userResp.status === OK_CODE,
                    'best_movies': bestMoviesResp.data.movies,
                    'available_genres': genresResp.data.sort(),
                });
            });
    }

    /**
     * Получение первой страницы фильмов по выбранным жанрам
     * @param {string[]} genres - список жанров
     */
    getMoviesByGenresPreview(genres) {
        API.getMoviesByGenres(genres, 1)
            .then((res) => {
                globalEventBus.emit(busEvents.SET_MOVIES_BY_GENRES_PREVIEW, res.data.movies);
            });
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

