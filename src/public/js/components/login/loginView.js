import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import './login.tmpl.js';
import {OK_CODE, BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR} from '../../utils/codes.js';
import {setListenersForHidingValidationError} from '../../utils/setValidationResult.js';


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

        setListenersForHidingValidationError();
    }

    /**
     * Проверка статуса логин запроса
     * @param {int} status - статус запроса
     */
    processLoginAttempt(status) {
        if (status === OK_CODE) {
            globalRouter.pushState(PATHS.profile);
        } else {
            const errors = {
                [BAD_REQUEST]: 'Введены некорректные данные!',
                [UNAUTHORIZED]: 'Введен некорректный логин или пароль!',
                [INTERNAL_SERVER_ERROR]: 'Ошибка сервера',
            };
            document.getElementById('validation-hint-login').innerText = errors[status];
        }
    }
}
