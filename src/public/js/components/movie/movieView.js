import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationHint} from '../../utils/setValidationResult.js';
import {UPLOAD_ERROR} from '../../utils/errorMessages.js';
import {scrollToTargetAdjusted} from '../../utils/scrollToTarget.js';
import {busEvents} from '../../utils/busEvents.js';

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
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.reviewFormSubmittedCallback = this.reviewFormSubmitted.bind(this);
        this.editReviewClickedCallback = this.editReviewClicked.bind(this);
        this.deleteReviewClickedCallback = this.deleteReviewClicked.bind(this);
        this.ratingSubmittedCallback = this.ratingSubmitted.bind(this);
        this.deleteRatingClickedCallback = this.deleteRatingClicked.bind(this);
        this.paginationButtonClickedCallback = this.paginationButtonClicked.bind(this);
        this.watchLaterClickedCallback = this.watchLaterClicked.bind(this);
        this.plusClickedCallback = this.plusClicked.bind(this);
        this.otherClickedCallback = this.otherClicked.bind(this);
    }

    /**
     * Запуск рендера
     * @param {number} id - id фильма
     */
    render(id) {
        globalEventBus.emit(busEvents.GET_MOVIE_DATA, id);
    }

    /**
     * Очистисть страницу
     */
    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        const logoutButton = document.getElementById('logout-button');
        logoutButton?.addEventListener('click', (e) => {
            e.preventDefault();
            globalEventBus.emit(busEvents.LOGOUT_CLICKED);
        });

        document.getElementById('button-watch-later').addEventListener('click', this.watchLaterClickedCallback);
        document.getElementById('button-plus').addEventListener('click', this.plusClickedCallback);
        document.getElementById('button-other').addEventListener('click', this.otherClickedCallback);

        document.getElementById('review')?.addEventListener('submit', this.reviewFormSubmittedCallback);
        document.getElementById('edit-button')?.addEventListener('click', this.editReviewClickedCallback);
        document.getElementById('delete-button')?.addEventListener('click', this.deleteReviewClickedCallback);

        document.getElementById('delete-rating')?.addEventListener('click', this.deleteRatingClickedCallback);

        [...document.getElementsByClassName('label-star')].forEach((star) => {
            star.addEventListener('click', this.ratingSubmittedCallback);
        });

        [...document.getElementsByClassName('pagination-button')].forEach((button) => {
            button.addEventListener('click', this.paginationButtonClickedCallback);
        });
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('button-watch-later').removeEventListener('click', this.watchLaterClickedCallback);
        document.getElementById('button-plus').removeEventListener('click', this.plusClickedCallback);
        document.getElementById('button-other').removeEventListener('click', this.otherClickedCallback);

        document.getElementById('review')?.removeEventListener('submit', this.reviewFormSubmittedCallback);
        document.getElementById('edit-button')?.removeEventListener('click', this.editReviewClickedCallback);
        document.getElementById('delete-button')?.removeEventListener('click', this.deleteReviewClickedCallback);

        [...document.getElementsByClassName('label-star')].forEach((star) => {
            star.removeEventListener('click', this.ratingSubmittedCallback);
        });

        [...document.getElementsByClassName('pagination-button')].forEach((button) => {
            button.removeEventListener('click', this.paginationButtonClickedCallback);
        });
    }

    /**
     * Установка данных о фильме
     * @param {Object} data - данные фильма
     */
    setMovieData(data) {
        this.data = data;
        super.render(this.data);

        this.setUserRating();
        this.setEventListeners();
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
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
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
     * Обработчик нажатия на кнопку "Смотреть позже"
     */
    watchLaterClicked() {
        console.log('watch later clicked');
    }

    /**
     * Обработчик нажатия на кнопку "+"
     */
    plusClicked() {
        console.log('plus clicked');
    }

    /**
     * Обработчик нажатия на кнопку "Другое"
     */
    otherClicked() {
        console.log('other clicked');
    }
}
