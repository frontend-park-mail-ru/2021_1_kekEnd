import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {CREATED, OK_CODE} from '../../utils/codes.js';
import {objectsMatch} from '../../utils/objectsMatch.js';
import {busEvents} from '../../utils/busEvents.js';
import {CONNECTION_ERROR} from '../../utils/errorMessages.js';


/**
 *  Модель страницы фильма
 */
export default class MovieModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.GET_MOVIE_DATA, this.getMovieData.bind(this));
        globalEventBus.on(busEvents.SEND_REVIEW, this.addReview.bind(this));
        globalEventBus.on(busEvents.EDIT_REVIEW, this.editReview.bind(this));
        globalEventBus.on(busEvents.DELETE_REVIEW, this.deleteReview.bind(this));
        globalEventBus.on(busEvents.SEND_RATING, this.addRating.bind(this));
        globalEventBus.on(busEvents.EDIT_RATING, this.editRating.bind(this));
        globalEventBus.on(busEvents.DELETE_RATING, this.deleteRating.bind(this));
        globalEventBus.on(busEvents.GET_REVIEWS_PAGE, this.getReviewsPage.bind(this));
        globalEventBus.on(busEvents.LOGOUT_CLICKED, this.logout.bind(this));
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
                globalEventBus.emit(busEvents.SET_MOVIE_DATA, movieData);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
            });
    }

    /**
     * Создание рецензии
     * @param {Object} review - объект с рецензией
     */
    addReview(review) {
        API.addReview(review)
            .then((res) => {
                globalEventBus.emit(busEvents.REVIEW_UPLOADED, res.status === CREATED, review);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
            });
    }

    /**
     * Редактирование рецензии
     * @param {Object} review - объект с рецензией
     */
    editReview(review) {
        API.editUserReviewForMovie(review)
            .then((res) => {
                globalEventBus.emit(busEvents.REVIEW_UPLOADED, res.status === OK_CODE, review);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
            });
    }

    /**
     * Удаление рецензии
     * @param {number} id - id рецензии
     */
    deleteReview(id) {
        API.deleteUserReviewForMovie(id)
            .then((res) => {
                globalEventBus.emit(busEvents.REVIEW_DELETED, res.status === OK_CODE, id);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
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
                globalEventBus.emit(busEvents.SET_REVIEWS_PAGE, res.status === OK_CODE, res.data);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
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
                globalEventBus.emit(busEvents.RATING_UPLOADED, res.status === CREATED, score);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
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
                globalEventBus.emit(busEvents.RATING_UPLOADED, res.status === OK_CODE, score);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
            });
    }

    /**
     * Удаление оценки к фильму
     * @param {number} id - id фильма
     */
    deleteRating(id) {
        API.deleteUserRatingForMovie(id)
            .then((res) => {
                globalEventBus.emit(busEvents.RATING_DELETED, res.status === OK_CODE);
            })
            .catch(() => {
                globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
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
