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
        let result = {};
        API.getMovieData(id)
            .then((movieData) => {
                result = {...movieData.data};
                return API.getUser();
            })
            .then((authRes) => {
                result.isAuthorized = authRes.status === OK_CODE;
                return API.getMovieReviews(id);
            })
            .then((movieReviews) => {
                result.reviews = movieReviews.data;
                return API.getUserReviewForMovie(id);
            })
            .then((userReviewRes) => {
                result.userReview = (userReviewRes.status === OK_CODE) ? (userReviewRes.data) : null;
                globalEventBus.emit('set movie data', result);
            });
    }

    addReview(review) {
        API.addReview(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', [res.status === CREATED, review]);
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
