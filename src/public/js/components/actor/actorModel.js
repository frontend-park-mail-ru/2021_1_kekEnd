import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK} from '../../utils/codes.js';


/**
 *  Модель страницы актера
 */

export default class ActorModel {
    /**
     * Конструктор
     */
    constructor() {
        this.getMovieData = this.getMovieData.bind(this);
        this.logout = this.logout.bind(this);

        globalEventBus.on('get actor data', this.getActorData);
        globalEventBus.on('logout clicked', this.logout);
    }

    /**
     * Получение информации об актере
     * @param {int} id - id актера
     */
    getActorData(id) {
        /*
        API.getActorData(id)
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        globalEventBus.emit('set actor data',
                            {...res.data, 'isAuthorized': authRes.status === OK});
                    });
            });
        */
        console.log('actor data requested');
    }

    /**
     * Выход со страницы
     */
    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit('logout status', res.status === OK);
            });
    }
}

