import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {OK_CODE} from '../../utils/codes.js';
import {AUTH_ERROR} from '../../utils/errorMessages.js';
import {busEvents} from '../../utils/busEvents.js';


/**
 *  Модель страницы профиля
 */
export default class ProfileModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_PROFILE_DATA, this.getProfileData.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
    }

    /**
     * Получение данных профиля
     */
    getProfileData() {
        // this data is not yet on backend but we need to show some pictures
        const additionalData = {
            favourite_movies: [
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/300.jpg',
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg',
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/302.jpg',
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/303.jpg',
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/304.jpg',
                'https://kinopoiskapiunofficial.tech/images/posters/kp_small/305.jpg',
            ],
            favourite_actors: [
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/2eb2fc4d-a8bd-43b0-83cd-35feacb8ccae/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/0f64539d-b236-4e01-8791-f19233705c59/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/f3270b86-abfb-4fce-8a1b-8ba6901ddcea/280x420',
            ],
        };

        Promise.all([API.getUser(), API.getUserReviews()])
            .then((responses) => {
                if (responses.some((resp) => resp.status !== OK_CODE)) {
                    throw new Error(AUTH_ERROR);
                }
                const [userData, reviews] = responses.map((resp) => resp.data);
                globalEventBus.emit(busEvents.SET_PROFILE_DATA, {
                    ...userData,
                    ...additionalData,
                    'isAuthorized': true,
                    'reviews': reviews,
                });
            })
            .catch((err) => {
                if (err.message === AUTH_ERROR) {
                    globalRouter.pushState(PATHS.login);
                }
            });
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
