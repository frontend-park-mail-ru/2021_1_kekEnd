import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {OK_CODE} from '../../utils/codes';
import {busEvents} from '../../utils/busEvents';


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
        Promise.all([API.getBestMovies(1), API.getAllAvailableGenres()])
            .then((responses) => {
                const [bestMoviesResp, genresResp] = responses;
                globalEventBus.emit(busEvents.SET_MAIN_PAGE_DATA, {
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

