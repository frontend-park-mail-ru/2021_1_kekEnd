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
        globalEventBus.on('edit review', this.editReview.bind(this));
        globalEventBus.on('delete review', this.deleteReview.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение информации о фильме
     * @param {int} id - id фильма
     */
    getMovieData(id) {
        Promise.all([API.getUser(), API.getMovieData(id), API.getMovieReviews(id), API.getUserReviewForMovie(id)])
            .then((responses) => {
                const [userResp, movieDataResp, movieReviewsResp, userReviewResp] = responses;
                let movieData = {
                    ...movieDataResp.data,
                    'isAuthorized': userResp.status === OK_CODE,
                    'userReview': (userReviewResp.status === OK_CODE) ? (userReviewResp.data) : null,
                };
                if (movieReviewsResp.status === OK_CODE) {
                    movieData = {...movieData, ...movieReviewsResp.data};
                }
                globalEventBus.emit('set movie data', movieData);
            });
    }

    addReview(review) {
        API.addReview(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', [res.status === CREATED, review]);
            });
    }

    editReview(review) {
        API.editUserReviewForMovie(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', [res.status === OK_CODE, review]);
            });
    }

    deleteReview(id) {
        API.deleteUserReviewForMovie(id)
            .then((res) => {
                globalEventBus.emit('review deleted', [res.status === OK_CODE, id]);
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
