import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK_CODE} from '../../utils/codes.js';


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
     * @param {int} id - id актера
     */
    getActorData(id) {
        this.id = id;

        /*
        API.getActorData(id)
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        globalEventBus.emit('set actor data',
                            {...res.data, 'isAuthorized': authRes.status === OK_CODE});
                    });
            });
        */

        const data = {
            avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/0f64539d-b236-4e01-8791-f19233705c59/280x420',
            name: 'Боб Одинкёрк',
            biography: 'Родился, ..., снимается в фильмах и сериалах',
            birthdate: '22 октября, 1962',
            origin: 'Напервилль, Иллинойс, США',
            genres: [
                'комедия',
                'драма',
                'мультфильм',
            ],
            movies_count: 187,
            movies_rating: 10,
            movies: [
                {
                    title: 'Никто (2021)',
                    url: '',
                    rating: 7.5,
                },
                {
                    title: 'Отмена (сериал, 2019)',
                    url: '',
                    rating: 7.6,
                },
                {
                    title: 'Маленькие женщины (2019)',
                    url: '',
                    rating: 7.6,
                },
            ],
            /* isAuthorized: true,*/
        };
        globalEventBus.emit('set actor data', data);
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

