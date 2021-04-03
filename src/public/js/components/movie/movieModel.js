import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {CREATED, OK_CODE} from '../../utils/codes.js';
import {objectsMatch} from '../../utils/objectsMatch.js';


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
        globalEventBus.on('send rating', this.addRating.bind(this));
        globalEventBus.on('edit rating', this.editRating.bind(this));
        globalEventBus.on('delete rating', this.deleteRating.bind(this));
        globalEventBus.on('get reviews page', this.getReviewsPage.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
    }

    /**
     * Получение информации о фильме
     * @param {number} id - id фильма
     */
    getMovieData(id) {
        Promise.all([API.getUser(), API.getMovieData(id), API.getMovieReviews(id),
            API.getUserReviewForMovie(id), API.getUserRatingForMovie(id)])
            .then((responses) => {
                const [userResp, movieDataResp, movieReviewsResp, userReviewResp, userRatingResp] = responses;
                const movieData = {
                    ...movieDataResp.data,
                    'isAuthorized': userResp.status === OK_CODE,
                    'userReview': (userReviewResp.status === OK_CODE) ? (userReviewResp.data) : null,
                    'userRating': (userRatingResp.status === OK_CODE) ? (userRatingResp.data) : null,
                };
                if (movieReviewsResp.status === OK_CODE) {
                    movieReviewsResp.data.reviews = movieReviewsResp.data.reviews?.filter((review) => {
                        return !objectsMatch(movieData.userReview, review);
                    });
                    movieData.reviewsData = movieReviewsResp.data;
                }
                globalEventBus.emit('set movie data', movieData);
            });
    }

    /**
     * Создание рецензии
     * @param {Object} review - объект с рецензией
     */
    addReview(review) {
        API.addReview(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', res.status === CREATED, review);
            });
    }

    /**
     * Редактирование рецензии
     * @param {Object} review - объект с рецензией
     */
    editReview(review) {
        API.editUserReviewForMovie(review)
            .then((res) => {
                globalEventBus.emit('review uploaded', res.status === OK_CODE, review);
            });
    }

    /**
     * Удаление рецензии
     * @param {number} id - id рецензии
     */
    deleteReview(id) {
        API.deleteUserReviewForMovie(id)
            .then((res) => {
                globalEventBus.emit('review deleted', res.status === OK_CODE, id);
            });
    }

    /**
     * Получение страницы с рецензиями пользователей
     * @param {number} id - id фильма
     * @param {number} page - номер страницы
     */
    getReviewsPage(id, page) {
        API.getMovieReviews(id, page)
            .then((res) => {
                globalEventBus.emit('set reviews page', res.status === OK_CODE, res.data);
            });
    }

    /**
     * Добавление оценки к фильму
     * @param {number} id - id фильма
     * @param {number} score - оценка от 1 до 10
     */
    addRating(id, score) {
        API.addMovieRating(id, score)
            .then((res) => {
                globalEventBus.emit('rating uploaded', res.status === CREATED, score);
            });
    }

    /**
     * Редактирование оценки к фильму
     * @param {number} id - id фильма
     * @param {number} score - оценка от 1 до 10
     */
    editRating(id, score) {
        API.editUserRatingForMovie(id, score)
            .then((res) => {
                globalEventBus.emit('rating uploaded', res.status === OK_CODE, score);
            });
    }

    /**
     * Удаление оценки к фильму
     * @param {number} id - id фильма
     */
    deleteRating(id) {
        API.deleteUserRatingForMovie(id)
            .then((res) => {
                globalEventBus.emit('rating deleted', res.status === OK_CODE);
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
