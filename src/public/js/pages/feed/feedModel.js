import {globalEventBus} from 'utils/eventbus';
import {busEvents} from 'utils/busEvents';
import {API} from 'utils/api';

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
        API.getFeed().then((res) => {
            globalEventBus.emit(busEvents.SET_FEED, {
                'feed': [...res.data.recent_reviews, ...res.data.recent_ratings],
            });
        });
    }
}
