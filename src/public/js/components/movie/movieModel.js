import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK} from "../../utils/codes.js";


/**
 *  Модель страницы фильма
 */
export default class MovieModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение информации о фильме
     */
    getMovieData() {
        API.getMovieData()
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        globalEventBus.emit('set movie data',
                            {...res.data, 'isAuthorized': authRes.status === OK});
                    });
            });
    }

    /**
     * Выход со страницы
     */
    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit('logout status', res.status === OK)
            });
    }
}
