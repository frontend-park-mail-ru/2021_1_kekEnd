import {globalEventBus} from '../../utils/eventbus.js';


export default class ProfileModel {
    constructor() {
        globalEventBus.on('get profile data', this.getProfileData.bind(this));
    }

    getProfileData() {
        const data = {fullname: 'Tom Cruise', email: 'tomcruise@mail.ru',
            watchedMoviesCount: 123, reviewsCount: 10,
            filmImageList: [
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/87b5659d-a159-4224-9bff-d5a5d109a53b/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/73cf2ed0-fd52-47a2-9e26-74104360786a/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/96d93e3a-fdbf-4b6f-b02d-2fc9c2648a18/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4b27e219-a8a5-4d85-9874-57d6016e0837/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/1d36b3f8-3379-4801-9606-c330eed60a01/300x450',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450',
            ],
            bestActorImageList: [
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/2eb2fc4d-a8bd-43b0-83cd-35feacb8ccae/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8faa0fd8-6780-4fc2-84ef-3fb89687bd85/280x420',
                'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/f3270b86-abfb-4fce-8a1b-8ba6901ddcea/280x420',
            ]};

        globalEventBus.emit('set profile data', data);
    }
}
