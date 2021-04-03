import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK_CODE} from '../../utils/codes.js';

export default class MoviesListModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get best movies', this.getBestMovies.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение первой страницы лучших фильмов
     */
    getBestMovies() {
        Promise.all([API.getUser(), API.getBestMovies(1)])
            .then((responses) => {
                const [userResp, bestMoviesResp] = responses;
                globalEventBus.emit('set best movies', {
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
                globalEventBus.emit('logout status', res.status === OK_CODE);
            });
    }
}
