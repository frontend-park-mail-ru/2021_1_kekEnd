/**
 * Класс с API методами
 */
export default class Api {
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
     * @returns {Object} - статус запроса и данные
     */
    async asyncRequest(url, method = 'GET', data = null) {
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            body: data,
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
     * @returns {Object} - статус запроса и данные
     */
    signup(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'POST', JSON.stringify(userData));
    }

    /**
     * Логин
     * @param {Object} userData - данные пользователя
     * @returns {Object} - статус запроса и данные
     */
    login(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'POST', JSON.stringify(userData));
    }

    /**
     * Выход со страницы
     * @returns {Object} - статус запроса и данные
     */
    logout() {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'DELETE');
    }

    /**
     * Получить информацию пользователя
     * @returns {Object} - статус запроса и данные
     */
    getUser() {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`);
    }

    /**
     * Изменение данных пользователя
     * @param {Object} newData - новые данные пользователя
     * @returns {Object} - статус запроса и данные
     */
    editUser(newData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'PUT', JSON.stringify(newData));
    }

    /**
     * Изменение данных пользователя
     * @param {Object} formData - данные формы (фото)
     * @returns {Object} - статус запроса и данные
     */
    uploadAvatar(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/avatar`, 'POST', formData,
            {
                'Content-Type': 'multipart/form-data',
            });
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
     * Изменить данные пользователя
     */
    setProfileData() {

    }

    /**
     * Получить информацию о фильме
     * @param {int} id - id фильма
     * @returns {Object} - статус запроса и данные
     */
    getMovieData(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/${id}`);
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

    /**
     * Загрузить аватар пользователя
     */
    uploadProfileAvatar() {

    }

    /**
     * Получить рецензии к фильму
     */
    getReviewsToMovie() {

    }
}

export const API = new Api();
