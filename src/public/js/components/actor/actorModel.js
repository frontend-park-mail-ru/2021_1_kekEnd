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
     * @param {number} id - id актера
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

        const actors = {
            1: {
                avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/2eb2fc4d-a8bd-43b0-83cd-35feacb8ccae/280x420',
                name: 'Том Круз',
                biography: 'Том — третий ребёнок в семье, у него есть три сестры: Ли Энн, Мариан и Касс. Ли Энн' +
                    ' (англ. Lee Anne Devette) сейчас скрывается от популярности брата в Океании. Мать Тома Мэри Ли ' +
                    'Пфайффер была учителем-дефектологом, а отец Томас Круз Мапотер III — инженером. В поисках ' +
                    'работы семья часто переезжала, что стало одной из причин трудного детства актёра. Когда Тому ' +
                    'было 12 лет, его родители развелись. К 14 годам он сменил 15 школ в США и Канаде. Окончательно ' +
                    'семья Тома осела в Глен Ридж, штат Нью-Джерси, где будущий актёр окончил среднюю школу. В ' +
                    'детстве у него были кривые, неправильно растущие зубы.\n' +
                    '\n' +
                    'Актёрскую карьеру Том начал в 1981 году с небольшой роли в фильме «Бесконечная любовь». ' +
                    'Свою первую главную роль, которая принесла ему известность, он получил в фильме ' +
                    '«Рискованный бизнес» (1983).',
                birthdate: '3 июля, 1962 ',
                origin: 'Сиракьюс, Нью-Йорк, США',
                genres: [
                    'драма',
                    'триллер',
                ],
                movies_count: 286,
                movies_rating: 7.1,
                movies: [
                    {
                        title: 'Грань будущего (2021)',
                        url: '',
                        rating: 7.9,
                    },
                    {
                        title: 'Обливион (2013)',
                        url: '',
                        rating: 7.6,
                    },
                    {
                        title: 'Джек Ричер (2012)',
                        url: '',
                        rating: 7.2,
                    },
                ],
                /* isAuthorized: true,*/
            },

            2: {
                avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/0f64539d-b236-4e01-8791-f19233705c59/280x420',
                name: 'Боб Одинкёрк',
                biography: 'Родители — Барбара Оденкерк и Уолтер Оденкерк, римо-католики немецкого и ирландского ' +
                    'происхождения. Отец работал в печатном бизнесе, шестеро братьев и сестёр, причём один из ' +
                    'братьев, Билл (род. 1965), тоже работает сценаристом-комиком.\n' +
                    '\n' +
                    'Через некоторое время после рождения Боба отец ушёл из семьи, в 1995 году умер от рака. ' +
                    'Также последние годы Уолтер страдал алкоголизмом, что повлияло на Боба: он совершенно не ' +
                    'употребляет спиртного.\n' +
                    '\n' +
                    'Боб учился в колледже Columbia College Chicago, там же впервые попробовал себя в качестве ' +
                    'комика: был ди-джеем и писал сценарии для местной университетской радиостанции, первым учителем ' +
                    'для него стал известный актёр, режиссёр и преподаватель Дел Клоуз.',
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
            },

            3: {
                avatar: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/f3270b86-abfb-4fce-8a1b-8ba6901ddcea/280x420',
                name: 'Киану Ривз',
                biography: 'В детстве Ривзу часто приходилось менять место жительства, переезжая вместе с матерью, ' +
                    'которая после развода в 1966 году стала художником по костюмам. Сначала они перебрались в ' +
                    'Австралию, затем в Нью-Йорк. Там его мать познакомилась с бродвейским и голливудским режиссёром ' +
                    'Полом Аароном и вышла за него замуж. Семья переехала в Торонто; пара развелась в 1971 году. ' +
                    'В 1976 году Патрисия вышла замуж за Роберта Миллера, рок-промоутера; они развелись в 1980 году. ' +
                    'Брак с четвёртым мужем, парикмахером Джеком Бондом, закончился в 1994 году.\n' +
                    '\n' +
                    'Детство и юность Ривза и его сестёр по большей части прошли в Торонто. Его воспитанием в ' +
                    'основном занимались родители матери и няньки. В течение пяти лет он сменил четыре школы, ' +
                    'включая школу искусств в Торонто, откуда он был позднее исключён «из-за излишней непокорности», ' +
                    'как он сам объяснял позднее.',
                birthdate: '2 сентября, 1964',
                origin: 'Бейрут, Ливан',
                genres: [
                    'драма',
                    'комедия',
                    'боевик',
                ],
                movies_count: 238,
                movies_rating: 8.1,
                movies: [
                    {
                        title: 'Матрица (1999)',
                        url: '',
                        rating: 8.5,
                    },
                    {
                        title: 'Джон Уик (2014)',
                        url: '',
                        rating: 6.9,
                    },
                    {
                        title: 'Адвокат дьявола (1997)',
                        url: '',
                        rating: 8.2,
                    },
                ],
                /* isAuthorized: true,*/
            },
        };

        globalEventBus.emit('set actor data', {...actors[id], 'isAuthorized': true});
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

