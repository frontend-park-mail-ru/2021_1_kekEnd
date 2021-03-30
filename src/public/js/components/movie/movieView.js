import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationHint} from '../../utils/setValidationResult.js';
import {UPLOAD_ERROR} from '../../utils/constant.js';
import {scrollToTargetAdjusted} from '../../utils/scrollToTarget.js';

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

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
        globalEventBus.on('review uploaded', this.displayNewReview.bind(this));
        globalEventBus.on('review edited', this.processReviewChange.bind(this));
        globalEventBus.on('review deleted', this.processReviewChange.bind(this));
        globalEventBus.on('set reviews page', this.setReviewsPage.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));

        this.reviewFormSubmittedCallback = this.reviewFormSubmitted.bind(this);
        this.editReviewClickedCallback = this.editReviewClicked.bind(this);
        this.deleteReviewClickedCallback = this.deleteReviewClicked.bind(this);
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
        globalEventBus.emit('get movie data', id);
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
            globalEventBus.emit('logout clicked');
        });

        document.getElementById('button-watch-later').addEventListener('click', this.watchLaterClickedCallback);
        document.getElementById('button-plus').addEventListener('click', this.plusClickedCallback);
        document.getElementById('button-other').addEventListener('click', this.otherClickedCallback);

        document.getElementById('review')?.addEventListener('submit', this.reviewFormSubmittedCallback);
        document.getElementById('edit-button')?.addEventListener('click', this.editReviewClickedCallback);
        document.getElementById('delete-button')?.addEventListener('click', this.deleteReviewClickedCallback);

        Array.from(document.getElementsByClassName('label-star')).forEach((star) => {
            star.addEventListener('click', () => {
                globalEventBus.emit('send rating', this.data.id, star.getAttribute('data-rating'));
            });
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

        this.setEventListeners();
    }

    setReviewsPage(status, reviewsData) {
        if (status) {
            this.data.reviewsData = reviewsData;
            super.render(this.data);
            this.setEventListeners();
            scrollToTargetAdjusted(document.getElementById('first-review'));
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

    displayNewReview(status, review) {
        if (status) {
            this.data.userReview = review;
            this.data.wantsToEditReview = false;
            this.setMovieData(this.data);
            return;
        }
        document.getElementById('validation-hint-review').innerText = UPLOAD_ERROR;
    }

    processReviewChange(status, movieID) {
        if (status) {
            this.render(movieID);
        }
    }

    reviewFormSubmitted(event) {
        event.preventDefault();

        const data = getFormValues(event.target);
        data.movie_id = this.data.id;

        const validator = new Validator();
        const reviewErrors = validator.validateReview(data);
        const validationHint = document.getElementById('validation-hint-review');
        if (reviewErrors.length === 0) {
            globalEventBus.emit((this.data.wantsToEditReview) ? 'edit review' : 'send review', data);
            return;
        }
        setValidationHint(validationHint, reviewErrors);
    }

    editReviewClicked() {
        this.setMovieData({...this.data, 'wantsToEditReview': true});
    }

    deleteReviewClicked() {
        globalEventBus.emit('delete review', this.data.id);
    }

    paginationButtonClicked(event) {
        globalEventBus.emit('get reviews page', this.data.id, event.target.getAttribute('data-page-index'));
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
