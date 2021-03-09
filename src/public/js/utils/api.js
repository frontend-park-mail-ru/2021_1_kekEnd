/**
 * Класс с API методами
 */
export default class Api {
    constructor() {
        this.host = 'localhost';
        this.port = '8080';
    }

    createRequest(url, method, data) {
        const options = {
            method: method,
            mode: 'cors',
            credentials: 'include'
        };

        if (data) {
            options.body = data;
        }

        return new Request(url, options);
    }

    async asyncRequest(url, method='GET', data=null) {
        const response = await fetch(this.createRequest(url, method, data));
        let responseData;
        try {
            responseData = await response.json();
        } catch (e) {
            responseData = await response.data
        }

        return {
            status: response.status,
            data: responseData
        };
    }

    /**
     * Регистрация
     */
    signup(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'POST', JSON.stringify(userData))
    }

    /**
     * Логин
     */
    login(userData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'POST', JSON.stringify(userData));
    }

    /**
     * Получить информацию пользователя
     */
    getUser() {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`)
    }

    editUser(newData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/${newData.username}`, 'PUT', JSON.stringify(newData));
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
     */
    getMovieData() {
        return this.asyncRequest(`http://${this.host}:${this.port}/movies/1`)
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

export const API = new Api()
