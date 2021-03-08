import {getFetch} from './fetch.js'


/**
 * Класс с API методами
 */
export default class Api {
    /**
     * Регистрация
     */
    signup() {

    }

    /**
     * Логин
     */
    login() {

    }

    /**
     * Получить информацию пользователя
     */
    getProfileData() {

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
        return getFetch('127.0.0.1:8080/movies/1', (error) => {
            console.log(error.toString());
            throw new Error(error);
        });
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
