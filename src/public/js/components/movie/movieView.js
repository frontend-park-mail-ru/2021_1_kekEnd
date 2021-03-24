import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationHint} from '../../utils/setValidationResult.js';


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
        // eslint-disable-next-line no-undef
        Handlebars.registerHelper('notEq', (arg1, arg2, options) => {
            return arg1 !== arg2;
        });

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
        globalEventBus.on('review uploaded', this.displayNewReview.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));

        this.watchLaterClickedCallback = this.watchLaterClicked.bind(this);
        this.plusClickedCallback = this.plusClicked.bind(this);
        this.otherClickedCallback = this.otherClicked.bind(this);
    }

    /**
     * Запуск рендера
     * @param {int} id - id фильма
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
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                globalEventBus.emit('logout clicked');
            });
        }

        document.getElementById('button-watch-later').addEventListener('click', this.watchLaterClickedCallback);
        document.getElementById('button-plus').addEventListener('click', this.plusClickedCallback);
        document.getElementById('button-other').addEventListener('click', this.otherClickedCallback);

        const reviewForm = document.getElementById('review');
        if (reviewForm !== null) {
            reviewForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const data = getFormValues(reviewForm);
                data.movie_id = reviewForm.getAttribute('data-movie-id');

                const validator = new Validator();
                const reviewErrors = validator.validateReview(data);
                const validationHint = document.getElementById('validation-hint-review');
                setValidationHint(validationHint, reviewErrors);
                if (reviewErrors.length === 0) {
                    globalEventBus.emit('send review', data);
                }
            });
        }
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('button-watch-later').removeEventListener('click', this.watchLaterClickedCallback);
        document.getElementById('button-plus').removeEventListener('click', this.plusClickedCallback);
        document.getElementById('button-other').removeEventListener('click', this.otherClickedCallback);
    }

    /**
     * Установка данных о фильме
     * @param {Object} data - данные фильма
     */
    setMovieData(data) {
        super.render(data);

        this.setEventListeners();
    }

    /**
     * Выход со страницы
     * @param {int} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }

    displayNewReview(statusAndReview) {
        const [status, review] = statusAndReview;
        if (status) {
            this.render(review.movie_id);
        } else {
            document.getElementById('validation-hint-review').innerText = 'Ошибка публикации рецензии';
        }
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
