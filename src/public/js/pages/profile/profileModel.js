import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {globalRouter} from '../../utils/router';
import {PATHS} from '../../utils/paths';
import {OK_CODE} from '../../utils/codes';
import {AUTH_ERROR} from '../../utils/errorMessages';
import {busEvents} from '../../utils/busEvents';


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
                {
                    'id': 61,
                    'poster': 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/20287.jpg',
                },
                {
                    'id': 26,
                    'poster': 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/373.jpg',
                },
                {
                    'id': 91,
                    'poster': 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/6264.jpg',
                },
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
