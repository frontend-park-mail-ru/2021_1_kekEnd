import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {CREATED, OK_CODE} from '../../utils/codes.js';


/**
 *  Модель страницы фильма
 */
export default class MovieModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
        globalEventBus.on('send review', this.addReview.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение информации о фильме
     * @param {int} id - id фильма
     */
    // TODO: отрефакторить
    getMovieData(id) {
        API.getMovieData(id)
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        API.getMovieReviews(id)
                            .then((movieReviews) => {
                                API.getUserReviewForMovie(id)
                                    .then((userReviewRes) => {
                                        const reviews = {'reviews': movieReviews.data};
                                        globalEventBus.emit('set movie data',
                                            {
                                                ...res.data, ...reviews, 'isAuthorized': authRes.status === OK_CODE,
                                                'userReview':
                                                    (userReviewRes.status === OK_CODE) ? (userReviewRes.data) : null,
                                            });
                                    });
                            });
                    });
            });
    }

    addReview(review) {
        API.addReview(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', res.status === CREATED);
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
