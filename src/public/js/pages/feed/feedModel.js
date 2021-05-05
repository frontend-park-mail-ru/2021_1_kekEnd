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
        /*
        feed: [
                {
                    id: 1,
                    itemType: 'review',
                    username: 'sampleuser',
                    avatar: 'http://89.208.198.186:8080/avatars/default.jpeg',
                    review: {
                        author: 'sampleuser',
                        content: '121',
                        id: '2',
                        movie_id: '26',
                        review_type: 'positive',
                        title: '213',
                    },
                },
                {
                    id: 2,
                    itemType: 'rating',
                    username: 'sampleuser',
                    avatar: 'http://89.208.198.186:8080/avatars/default.jpeg',
                    rating: {
                        movie_title: 'Матрица',
                        movie_id: '2',
                        score: 10,
                    },
                },
            ],
         */
        API.getFeed().then((res) => globalEventBus.emit(busEvents.SET_FEED, res.data));
    }
}
