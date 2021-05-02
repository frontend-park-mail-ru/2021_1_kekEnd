import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {busEvents} from '../../utils/busEvents';
import {OK_CODE} from '../../utils/codes';


/**
 *  Модель страницы актера
 */
export default class ActorModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_ACTOR_DATA, this.getActorData.bind(this));
        globalEventBus.on(busEvents.LIKE_ACTOR, this.likeActor.bind(this));
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
     * @param {number} actorID - идентификатор актера
     */
    likeActor(actorID) {
        API.likeActor(actorID)
            .then((res) => {
                globalEventBus.emit(busEvents.LIKE_ACTOR_STATUS, res.status === OK_CODE);
            });
    }
}

