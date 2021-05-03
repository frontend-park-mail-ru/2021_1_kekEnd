import {globalEventBus} from './eventbus';
import {CONNECTION_ERROR} from './errorMessages';
import {busEvents} from './busEvents';


/**
 * Класс для работы с API
 */
class Api {
    /**
     * Конструктор
     */
    constructor() {
        this.host = 'localhost';
        this.port = '8080';
    }

    /**
     * Отправка запроса
     * @param {string} url - адрес запроса
     * @param {string} method - метод запроса
     * @param {Object} data - данные запроса
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    async asyncRequest(url, method = 'GET', data = null) {
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            body: data,
        }).catch(() => {
            globalEventBus.emit(busEvents.SHOW_POPUP, {'description': CONNECTION_ERROR});
        });

        let responseData;
        try {
            responseData = await response.json();
        } catch (e) {
            responseData = await response.data;
        }

        return {
            status: response.status,
            data: responseData,
        };
    }

    /**
     * Регистрация
     * @param {Object} userData - данные пользователя
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    signup(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'POST', JSON.stringify(userData));
    }

    /**
     * Логин
     * @param {Object} userData - данные пользователя
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    login(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'POST', JSON.stringify(userData));
    }

    /**
     * Выход со страницы
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    logout() {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'DELETE');
    }

    /**
     * Получить информацию пользователя
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    getUser() {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`);
    }

    /**
     * Изменение данных пользователя
     * @param {Object} newData - новые данные пользователя
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    editUser(newData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'PUT', JSON.stringify(newData));
    }

    /**
     * Изменение данных пользователя
     * @param {Object} formData - данные формы (фото)
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    uploadAvatar(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/avatar`, 'POST', formData,
            {
                'Content-Type': 'multipart/form-data',
            });
    }

    /**
     * Получить информацию о фильме
     * @param {number} id - id фильма
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    getMovieData(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/${id}`);
    }

    /**
     * Отметить фильм просмотренным
     * @param {number} movieId - идентификатор фильма
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    watchMovie(movieId) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/${movieId}/watch`, 'POST');
    }

    /**
     * Убрать отметку "фильм просмотрен"
     * @param {number} movieId - идентификатор фильма
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    unwatchMovie(movieId) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/${movieId}/watch`, 'DELETE');
    }

    /**
     * Получить все рецензии к фильму
     * @param {number} id - id фильма
     * @param {number} page - страница с рецензиями
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и списком рецензий к фильму
     */
    getMovieReviews(id, page=1) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/${id}/reviews?page=${page}`);
    }

    /**
     * Добавление рецензии на фильм
     * @param {Object} formData - данные формы о рецензии
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    addReview(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/reviews`, 'POST', JSON.stringify(formData));
    }

    /**
     * Получение всех рецензий пользователя
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    getUserReviews() {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/reviews`);
    }

    /**
     * Получить рецензию пользователя к фильму
     * @param {number} id - id фильма
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и объектом рецензии
     */
    getUserReviewForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${id}/reviews`);
    }

    /**
     * Редактировать рецензию
     * @param {Object} formData - новые данные формы
     * @return {Promise<{status: number}>} - промис со статусом запроса
     */
    editUserReviewForMovie(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${formData.movie_id}/reviews`, 'PUT', JSON.stringify(formData));
    }

    /**
     * Удаление рецензии
     * @param {number} id - идентификатор фильма
     * @return {Promise<{status: number}>} - промис со статусом запроса
     */
    deleteUserReviewForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${id}/reviews`, 'DELETE');
    }

    /**
     * Добавить оценку фильму
     * @param {number} id - идентификатор фильма
     * @param {number} score - оценка фильма
     * @return {Promise<{status: number}>} - промис со статусом запроса
     */
    addMovieRating(id, score) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings`, 'POST', JSON.stringify({
            'movie_id': id,
            'score': score,
        }));
    }

    /**
     * Получить оценку пользователя к фильму
     * @param {number} id - идентификатор фильма
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и оценкой пользователя
     */
    getUserRatingForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings/${id}`);
    }

    /**
     * Редактировать оценку пользователя к фильму
     * @param {number} id - идентификатор фильма
     * @param {number} newScore - новая оценка
     * @return {Promise<{status: number}>} - промис со статусом запроса
     */
    editUserRatingForMovie(id, newScore) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings`, 'PUT', JSON.stringify({
            'movie_id': id,
            'score': newScore,
        }));
    }

    /**
     * Удалить оценку пользователя к фильму
     * @param {number} id - идентификатор фильма
     * @return {Promise<{status: number}>} - промис со статусом запроса
     */
    deleteUserRatingForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings/${id}`, 'DELETE');
    }

    /**
     * Получение страницы списка лучших фильмов
     * @param {number} page - номер страницы
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и списком фильмов
     */
    getBestMovies(page=1) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies?category=best&page=${page}`);
    }

    /**
     * Получить все доступные для выбора жанры
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и списком жанров
     */
    getAllAvailableGenres() {
        return this.asyncRequest(`http://${this.host}:${this.port}/genres`);
    }

    /**
     * Получение фильмов по заданным жанрам
     * @param {string[]} genres - массив нужных жанров
     * @param {number} page - номер страницы
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и списком фильмов
     */
    getMoviesByGenres(genres, page=1) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies?category=genre&filter=${genres.join('+')}&page=${page}`);
    }

    /**
     * Получить информацию об актере
     * @param {number} id - id актера
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    getActorData(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/actors/${id}`);
    }

    /**
     * Добавить актера в "Избранное"
     * @param {number} id - идентификатор актера
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    likeActor(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/actors/${id}/like`, 'POST');
    }

    /**
     * Убрать актера из "Избранного"
     * @param {number} id - идентификатор актера
     * @return {Promise<{data: *, status: number}>} - промис со статусом запроса и данными
     */
    unlikeActor(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/actors/${id}/like`, 'DELETE');
    }

    /**
     * Создать новую пользовательскую подборку фильмов
     */
    createUserPlaylist() {

    }

    /**
     * Удалить пользовательскую подборку фильмов
     */
    deleteUserPlaylist() {

    }

    /**
     * Получить подборки фильмов пользователся
     */
    getUsersPlaylist() {

    }

    /**
     * Добавить фильм в какую-либо пользовательскую подборку
     */
    addMovieToPlaylist() {

    }

    /**
     * Удалить фильм из пользовательской подборки
     */
    removeMovieFromPlaylist() {

    }

    /**
     * Получить любимые фильмы пользователя
     */
    getBestUsersMovies() {

    }

    /**
     * Добавить фильм в список любимых фильмов пользователя
     */
    addMovieToBestUsersMovies() {

    }

    /**
     * Получить любимых актеров пользователя
     */
    getBestUsersActors() {

    }

    /**
     * Добавить актера в список любимых актеров пользователя
     */
    addActorToBestUsersActors() {

    }

    /**
     * Добавить лайк
     */
    addLike() {

    }

    /**
     * Удалить лайк
     */
    deleteLike() {

    }
}

export const API = new Api();
