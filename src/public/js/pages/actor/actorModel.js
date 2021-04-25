import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {OK_CODE} from '../../utils/codes';
import {busEvents} from '../../utils/busEvents';


/**
 *  Модель страницы актера
 */
export default class ActorModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_ACTOR_DATA, this.getActorData.bind(this));
        globalEventBus.on(busEvents.LIKE_ACTOR, this.addActorToFavorites.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
    }

    /**
     * Получение информации об актере
     * @param {number} id - id актера
     */
    getActorData(id) {
        API.getActorData(id)
            .then((res) => {
                globalEventBus.emit(busEvents.SET_ACTOR_DATA, res.data);
            });
    }

    /**
     * Добавить актера в избранное
     */
    addActorToFavorites() {
        // TODO: react to server response
        console.log(`add to favorites: ${this.id}`);
        /*
        API.addActorToBestUsersActors(this.id)
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        globalEventBus.emit('added actor to favorites',
                            {...res.data, 'isAuthorized': authRes.status === OK_CODE});
                    });
            });
        */
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

