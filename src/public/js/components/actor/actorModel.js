import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {OK_CODE} from '../../utils/codes';


/**
 *  Модель страницы актера
 */
export default class ActorModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get actor data', this.getActorData.bind(this));
        globalEventBus.on('add actor to favorites', this.addActorToFavorites.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение информации об актере
     * @param {number} id - id актера
     */
    getActorData(id) {
        Promise.all([API.getUser(), API.getActorData(id)])
            .then((responses) => {
                const [authResp, actorDataResp] = responses;
                globalEventBus.emit('set actor data',
                    {...actorDataResp.data, 'isAuthorized': authResp.status === OK_CODE});
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
                globalEventBus.emit('logout status', res.status === OK_CODE);
            });
    }
}

