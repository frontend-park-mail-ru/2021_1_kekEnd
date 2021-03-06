import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import './login.tmpl.js';
import {OK} from '../../utils/codes.js';


/**
 * Представление страницы логина
 */
export default class LoginView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['login.hbs']);

        globalEventBus.on('login status', this.processLoginAttempt.bind(this));
    }

    /**
     * Запуск рендера и установка колбеков
     */
    render() {
        super.render();
        this.setEventListeners();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        const form = document.getElementById('login');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = getFormValues(form);

            globalEventBus.emit('login clicked', data);
        });
    }

    /**
     * Проверка статуса логин запроса
     * @param {int} status - статус запроса
     */
    processLoginAttempt(status) {
        if (status === OK) {
            globalRouter.pushState(PATHS.profile);
        } else {
            const errors = {
                400: 'Input format error',
                401: 'Incorrect login/password',
                500: 'Server Error',
            };
            document.getElementById('validation-hint-login').innerText = errors[status];
        }
    }
}
