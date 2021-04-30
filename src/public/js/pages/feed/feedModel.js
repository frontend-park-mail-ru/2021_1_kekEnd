import {globalEventBus} from '../../utils/eventbus';
import {busEvents} from '../../utils/busEvents';

/**
 *  Модель страницы "Лента"
 */
export default class FeedModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_FEED, this.getFeed.bind(this));
    }

    /**
     * Получение ленты пользователя
     */
    getFeed() {
        globalEventBus.emit(busEvents.SET_FEED, {

        });
    }
}
