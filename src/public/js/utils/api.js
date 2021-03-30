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
     * Получить все рецензии к фильму
     * @param {number} id - id фильма
     * @param {number} page - страница с рецензиями
     * @return {Promise<{data: *, status: number}>} - статус запроса и список рецензий к фильму
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
     * @return {Promise<{data: *, status: number}>} - статус запроса и объект рецензии
     */
    getUserReviewForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${id}/reviews`);
    }

    editUserReviewForMovie(formData) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${formData.movie_id}/reviews`, 'PUT', JSON.stringify(formData));
    }

    deleteUserReviewForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/users/movies/${id}/reviews`, 'DELETE');
    }

    addMovieRating(id, score) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings`, 'POST', JSON.stringify({
            'movie_id': id,
            'score': score,
        }));
    }

    getUserRatingForMovie(id) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings/${id}`);
    }

    editUserRatingForMovie(id, newScore) {
        return this.asyncRequest(`http://${this.host}:${this.port}/ratings`, 'PUT', JSON.stringify({
            'movie_id': id,
            'score': newScore,
        }));
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
