import {globalEventBus} from 'utils/eventbus';
import BaseView from '../baseView';
import {getFormValues} from 'utils/formDataWork';
import Validator from 'utils/validation';
import {setValidationHint} from 'utils/setValidationResult';
import {UPLOAD_ERROR} from 'utils/errorMessages';
import {scrollToTargetAdjusted} from 'utils/scrollToTarget';
import {busEvents} from 'utils/busEvents';
import {Navbar} from 'components/navbar';
import {userMeta} from 'utils/userMeta';
import './movie.tmpl';
import {AddToPlaylistWidget} from 'components/addToPlaylist';
import {Carousel} from 'components/carousel';

/**
 * Представление страницы фильма
 */
export default class MovieView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['movie.hbs']);

        globalEventBus.on(busEvents.SET_MOVIE_DATA, this.setMovieData.bind(this));
        globalEventBus.on(busEvents.REVIEW_UPLOADED, this.displayNewReview.bind(this));
        globalEventBus.on(busEvents.REVIEW_DELETED, this.processReviewDeletion.bind(this));
        globalEventBus.on(busEvents.SET_REVIEWS_PAGE, this.setReviewsPage.bind(this));
        globalEventBus.on(busEvents.RATING_UPLOADED, this.displayNewRating.bind(this));
        globalEventBus.on(busEvents.RATING_DELETED, this.removeRating.bind(this));
        globalEventBus.on(busEvents.SET_PLAYLIST_DATA_MOVIE, this.displayPlaylists.bind(this));

        this.reviewFormSubmittedCallback = this.reviewFormSubmitted.bind(this);
        this.editReviewClickedCallback = this.editReviewClicked.bind(this);
        this.deleteReviewClickedCallback = this.deleteReviewClicked.bind(this);
        this.ratingSubmittedCallback = this.ratingSubmitted.bind(this);
        this.deleteRatingClickedCallback = this.deleteRatingClicked.bind(this);
        this.paginationButtonClickedCallback = this.paginationButtonClicked.bind(this);
        this.watchedClickedCallback = this.watchedClicked.bind(this);
        this.playlistClickedCallback = this.playlistClicked.bind(this);
    }

    /**
     * Запуск рендера
     * @param {number} id - id фильма
     */
    render(id) {
        globalEventBus.emit(busEvents.GET_MOVIE_DATA, id);
    }

    /**
     * Установка данных о фильме
     * @param {Object} data - данные фильма
     */
    setMovieData(data) {
        this.data = data;
        super.render(this.data);

        this.setUserRating();

        this.navbarComponent = new Navbar(document.getElementById('navbar'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarComponent.render();

        this.similarMoviesCarousel = new Carousel(document.getElementById('similar-movies-carousel'),
            {'itemsType': 'movies', 'items': {...this.data.similarMovies}});
        this.similarMoviesCarousel.render();

        this.setEventListeners();
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        this.currentPlaylistWidget = null;
        super.hide(this);
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('watched-button')?.addEventListener('click', this.watchedClickedCallback);
        document.getElementById('playlist-button')?.addEventListener('click', this.playlistClickedCallback);

        document.getElementById('review')?.addEventListener('submit', this.reviewFormSubmittedCallback);
        document.getElementById('edit-button')?.addEventListener('click', this.editReviewClickedCallback);
        document.getElementById('delete-button')?.addEventListener('click', this.deleteReviewClickedCallback);

        document.getElementById('delete-rating')?.addEventListener('click', this.deleteRatingClickedCallback);

        [...document.getElementsByClassName('rating-stars__label-star')].forEach((star) => {
            star.addEventListener('click', this.ratingSubmittedCallback);
        });

        [...document.getElementsByClassName('pagination-wrapper__button')].forEach((button) => {
            button.addEventListener('click', this.paginationButtonClickedCallback);
        });

        this.navbarComponent.setEventListeners();
        this.similarMoviesCarousel.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('watched-button')?.removeEventListener('click', this.watchedClickedCallback);
        document.getElementById('playlist-button')?.removeEventListener('click', this.playlistClickedCallback);

        document.getElementById('review')?.removeEventListener('submit', this.reviewFormSubmittedCallback);
        document.getElementById('edit-button')?.removeEventListener('click', this.editReviewClickedCallback);
        document.getElementById('delete-button')?.removeEventListener('click', this.deleteReviewClickedCallback);

        [...document.getElementsByClassName('rating-stars__label-star')].forEach((star) => {
            star.removeEventListener('click', this.ratingSubmittedCallback);
        });

        [...document.getElementsByClassName('pagination-wrapper__button')].forEach((button) => {
            button.removeEventListener('click', this.paginationButtonClickedCallback);
        });

        this.navbarComponent.removeEventListeners();
        this.similarMoviesCarousel.removeEventListeners();
        this.currentPlaylistWidget?.hide();
    }

    /**
     * Установка блока с рецензиями пользователей
     * @param {boolean} status - успешность запроса
     * @param {Object} reviewsData - информация о рецензиях
     */
    setReviewsPage(status, reviewsData) {
        if (status) {
            this.data.reviewsData = reviewsData;
            super.render(this.data);
            this.setEventListeners();
            scrollToTargetAdjusted(document.getElementById('first-review'));
        }
    }

    /**
     * Отображение оценки пользователя к фильму
     */
    setUserRating() {
        if (this.data.userRating !== null) {
            const starID = `star-${this.data.userRating.score}`;
            document.getElementById(starID).checked = true;
        }
    }

    /**
     * Отображение новой оценки к фильму
     * @param {boolean} status - статус создания оценки
     * @param {number} score - оценка пользователя
     */
    displayNewRating(status, score) {
        if (status) {
            this.data.userRating = {
                'movie_id': this.data.id,
                'score': score,
            };
            this.setMovieData(this.data);
        }
    }

    /**
     * Реакция на удаление оценки
     * @param {boolean} status - статус редактирования оценки
     */
    removeRating(status) {
        if (status) {
            this.data.userRating = null;
            this.setMovieData(this.data);
        }
    }

    /**
     * Отображение новой рецензии пользователя
     * @param {boolean} status - статус создания рецензии
     * @param {Object} review - объект рецензии
     */
    displayNewReview(status, review) {
        if (status) {
            this.data.userReview = review;
            this.data.wantsToEditReview = false;
            this.setMovieData(this.data);
            return;
        }
        document.getElementById('validation-hint-review').innerText = UPLOAD_ERROR;
    }

    /**
     * Реакция на удаление рецензии
     * @param {boolean} status - статус удаление рецензии
     * @param {number} movieID - id фильма
     */
    processReviewDeletion(status, movieID) {
        if (status) {
            this.data.userReview = null;
            this.setMovieData(this.data);
        }
    }

    /**
     * Обработка отправки формы с рецензией
     * @param {Object} event - событие submitted
     */
    reviewFormSubmitted(event) {
        event.preventDefault();

        const data = getFormValues(event.target);
        data.movie_id = this.data.id;

        const validator = new Validator();
        const reviewErrors = validator.validateReview(data);
        const validationHint = document.getElementById('validation-hint-review');
        if (reviewErrors.length === 0) {
            globalEventBus.emit((this.data.wantsToEditReview) ? busEvents.EDIT_REVIEW : busEvents.SEND_REVIEW, data);
            return;
        }
        setValidationHint(validationHint, reviewErrors);
    }

    /**
     * Нажатие на кнопку редактирования рецензии
     */
    editReviewClicked() {
        this.setMovieData({...this.data, 'wantsToEditReview': true});
    }

    /**
     * Нажатие на кнопку удаления рецензии
     */
    deleteReviewClicked() {
        globalEventBus.emit(busEvents.DELETE_REVIEW, this.data.id);
    }

    /**
     * Нажатие на кнопку добавления оценки
     * @param {Object} event - событие нажатия на "звезду"
     */
    ratingSubmitted(event) {
        const action = (this.data.userRating === null) ? busEvents.SEND_RATING : busEvents.EDIT_RATING;
        globalEventBus.emit(action, this.data.id, event.target.getAttribute('data-rating'));
    }

    /**
     * Нажатие на кнопку удаления оценки
     */
    deleteRatingClicked() {
        globalEventBus.emit(busEvents.DELETE_RATING, this.data.id);
    }

    /**
     * Нажатие на кнопку пагинации в списке рецензий
     * @param {Object} event - событие нажатия на кнопку пагинации
     */
    paginationButtonClicked(event) {
        globalEventBus.emit(busEvents.GET_REVIEWS_PAGE, this.data.id, event.target.getAttribute('data-page-index'));
    }

    /**
     * Обработчик нажатия на кнопку "Просмотрено"
     * @param {Object} event - событие нажатия
     */
    watchedClicked(event) {
        const checkbox = event.target;
        const movieId = checkbox.getAttribute('data-id');
        if (checkbox.checked) {
            globalEventBus.emit(busEvents.WATCH_MOVIE_MOVIE_PAGE, movieId);
            return;
        }
        globalEventBus.emit(busEvents.UNWATCH_MOVIE_MOVIE_PAGE, movieId);
    }

    /**
     * Обработчик нажатия на кнопку "Добавить в плейлист"
     * @param {Object} event - событие нажатия
     */
    playlistClicked(event) {
        this.currentPlaylistWidget?.hide();
        this.currentPlaylistWidget = null;
        if (event.target.checked) {
            globalEventBus.emit(busEvents.GET_PLAYLIST_DATA_MOVIE, this.data.id);
        }
    }

    /**
     * Отобразить виджет со списком плейлистов
     * @param {Object} playlists - информация о плейлистах
     */
    displayPlaylists(playlists) {
        const playlistsData = {
            'playlists': playlists,
            'movieId': this.data.id,
        };
        this.currentPlaylistWidget = new AddToPlaylistWidget(document.getElementById(`add-to-playlist-${this.data.id}`),
            playlistsData);
        this.currentPlaylistWidget.render();
        this.currentPlaylistWidget.setEventListeners();
    }
}
