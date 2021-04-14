import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK_CODE} from '../../utils/codes.js';
import {busEvents} from '../../utils/busEvents.js';


/**
 * Модель страницы списка фильмов
 */
export default class MoviesListModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_BEST_MOVIES_PAGE, this.getBestMovies.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
    }

    /**
     * Получение первой страницы лучших фильмов
     * @param {number} page - номер страницы
     */
    getBestMovies(page=1) {
        Promise.all([API.getUser(), API.getBestMovies(page)])
            .then((responses) => {
                const [userResp, bestMoviesResp] = responses;
                globalEventBus.emit(busEvents.SET_MOVIES_PAGE, {
                    ...bestMoviesResp.data,
                    'isAuthorized': userResp.status === OK_CODE,
                });
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
