import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK_CODE} from '../../utils/codes.js';

export default class MainModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get main page data', this.getBestMoviesPreview.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение первой страницы лучших фильмов
     */
    getBestMoviesPreview() {
        API.getBestMovies(1)
            .then((res) => {
                globalEventBus.emit('set main page data', res.status === OK_CODE);
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
