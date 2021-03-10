/**
 * Класс с API методами
 */
export default class Api {
    constructor() {
        this.host = 'localhost';
        this.port = '8080';
    }

    async asyncRequest(url, method = 'GET', data = null) {
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            credentials: 'include',
            body: data
        });

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

    logout() {
        return this.asyncRequest(`http://${this.host}:${this.port}/sessions`, 'DELETE');
    }

    /**
     * Получить информацию пользователя
     */
    getUser() {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`)
    }

    editUser(newData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users`, 'PUT', JSON.stringify(newData));
    }

    uploadAvatar(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/upload`, 'POST', formData,
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

export const API = new Api()
