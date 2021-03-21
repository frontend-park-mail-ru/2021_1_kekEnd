import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {OK_CODE} from '../../utils/codes.js';


/**
 *  Модель страницы профиля
 */
export default class ProfileModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get profile data', this.getProfileData.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение данных профиля
     */
    getProfileData() {
        // this data is not yet on backend but we need to show some pictures
        const additionalData = {
            favourite_movies: [
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/14af6019-b2fe-4e1e-bee5-334d9e472d94/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/73cf2ed0-fd52-47a2-9e26-74104360786a/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/96d93e3a-fdbf-4b6f-b02d-2fc9c2648a18/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4b27e219-a8a5-4d85-9874-57d6016e0837/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/1d36b3f8-3379-4801-9606-c330eed60a01/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450',
            ],
            favourite_actors: [
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/2eb2fc4d-a8bd-43b0-83cd-35feacb8ccae/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8faa0fd8-6780-4fc2-84ef-3fb89687bd85/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/f3270b86-abfb-4fce-8a1b-8ba6901ddcea/280x420',
            ],
        };

        API.getUser()
            .then((res) => {
                if (res.status === OK_CODE) {
                    globalEventBus.emit('set profile data', {'isAuthorized': true, ...res.data, ...additionalData});
                } else {
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
                globalEventBus.emit('logout status', res.status === OK_CODE);
            });
    }
}
