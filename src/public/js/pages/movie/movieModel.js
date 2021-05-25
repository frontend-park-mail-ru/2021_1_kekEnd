import {globalEventBus} from 'utils/eventbus';
import {API} from 'utils/api';
import {CREATED, OK_CODE} from 'utils/codes';
import {objectsMatch} from 'utils/objectsMatch';
import {busEvents} from 'utils/busEvents';


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
        globalEventBus.on(busEvents.GET_PLAYLIST_DATA_MOVIE, this.getPlaylistsForMovie.bind(this));
        globalEventBus.on(busEvents.WATCH_MOVIE_MOVIE_PAGE, this.watchMovie.bind(this));
        globalEventBus.on(busEvents.UNWATCH_MOVIE_MOVIE_PAGE, this.unwatchMovie.bind(this));
        globalEventBus.on(busEvents.GET_SIMILAR_MOVIES, this.getSimilarMovies.bind(this));
    }

    /**
     * Получение информации о фильме
     * @param {number} id - id фильма
     */
    getMovieData(id) {
        Promise.all([API.getMovieData(id), API.getMovieReviews(id),
            API.getUserReviewForMovie(id), API.getUserRatingForMovie(id)])
            .then((responses) => {
                const [movieDataResp, movieReviewsResp, userReviewResp, userRatingResp] = responses;
                const movieData = {
                    ...movieDataResp.data,
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
            });
    }

    /**
     * Получить плейлисты пользоватя с информацией о наличии фильма в каждом плейлисте
     * @param {number} movieId
     */
    getPlaylistsForMovie(movieId) {
        API.getPlaylistsForMovie(movieId).then((res) =>
            globalEventBus.emit(busEvents.SET_PLAYLIST_DATA_MOVIE, res.data));
    }

    /**
     * Отметить фильм как "просмотренный"
     * @param {number} movieId - идентификатор фильма
     */
    watchMovie(movieId) {
        API.watchMovie(movieId).then(() => {});
    }

    /**
     * Удалить отметку фильма как "просмотренный"
     * @param {number} movieId - идентификатор фильма
     */
    unwatchMovie(movieId) {
        API.unwatchMovie(movieId).then(() => {});
    }

    /**
     * Получить список похожих фильмов
     * @param {number} movieId - идентификатор фильма
     */
    getSimilarMovies(movieId) {
        API.getSimilarMovies(movieId).then((res) =>
            globalEventBus.emit(busEvents.SET_SIMILAR_MOVIES, res.data));
    }
}
