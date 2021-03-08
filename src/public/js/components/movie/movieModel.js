import { globalEventBus } from '../../utils/eventbus.js';
import Api from '../../utils/api.js'


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
        this.api = new Api();
    }

    getMovieData() {
        const data = {
            name: 'Чужой',
            description: 'Группа космонавтов высаживается на неизвестной планете и знакомится с ксеноморфом. Шедевр Ридли Скотта',
            audio: [ 'Русский', 'Английский' ],
            subtitles: [ 'Русские' ],
            quality: 'HD',
            year: 1979,
            country: [ 'Великобритания', 'США' ],
            genre: [ 'Кек' ],
            tagline: 'a',
            director: 'b',
            scriptwriter: 'c',
            producer: 'd',
            operator: 'e',
            composer: 'f',
            artist: 'g',
            editor: 'h',
            budget: { amount: 13.37, currency: 'RUB' },
            duration: '228:1337',
            roles: [ 'first', 'second', 'third' ],
            img_background: (new URL(`https://avatars.mds.yandex.net/get-kinopoisk-blog-post-thumb/23341/a1d4a27776c8c90e336e2cfd152cb3b2/orig`)).toJSON(),
            img_cover: (new URL(`https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/14af6019-b2fe-4e1e-bee5-334d9e472d94/300x450`)).toJSON(),
            img_shots: [ (new URL(`https://cdn21.img.ria.ru/images/156048/39/1560483958_0:26:1157:677_1920x0_80_0_0_179ae68e142011c1b78e4b4e05f8f8b7.jpg`).toJSON()) ]
        };

        let data2 = this.api.getMovieData()
            .then((res) => {
                res.json()
                .then((data3) => {
                    console.log(data3);
                });
            });

        globalEventBus.emit('set movie data', data);
    }

}

