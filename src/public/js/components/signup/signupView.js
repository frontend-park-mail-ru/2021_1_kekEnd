import BaseView from '../baseView.js';
import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationResult, setListenersForHidingValidationError} from '../../utils/setValidationResult.js';
import './signup.tmpl.js';
import {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR} from '../../utils/codes.js';
import {ALREADY_EXISTS, INCORRECT_DATA} from '../../utils/errorMessages.js';
import {busEvents} from '../../utils/busEvents.js';


/**
 * Представление страницы регистрации
 */
export default class SignupView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['signup.hbs']);

        globalEventBus.on(busEvents.SIGNUP_STATUS, this.processSignupAttempt.bind(this));

        this.formSubmittedCallback = this.formSubmitted.bind(this);
    }

    /**
     * Запуск рендера
     */
    render() {
        super.render();
        this.setEventListeners();
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('signup').addEventListener('submit', this.formSubmittedCallback);
        setListenersForHidingValidationError();
    }

    removeEventListeners() {
        document.getElementById('signup').removeEventListener('submit', this.formSubmittedCallback);
    }

    formSubmitted(event) {
        event.preventDefault();

        const data = getFormValues(event.target);

        const validator = new Validator();
        const loginError = validator.validateLogin(data.username);
        const emailError = validator.validateEmail(data.email);
        const passwordError = validator.validatePassword(data.password);

        [
            [
                document.getElementById('username-input'),
                document.getElementById('validation-hint-login'),
                loginError,
            ],
            [
                document.getElementById('email-input'),
                document.getElementById('validation-hint-email'),
                emailError,
            ],
            [
                document.getElementById('password-input'),
                document.getElementById('validation-hint-password'),
                passwordError,
            ],
        ].forEach(([inputField, inputHint, errors]) => setValidationResult(inputField, inputHint, errors));

        if ([loginError, emailError, passwordError].every((error) => error.length === 0)) {
            globalEventBus.emit(busEvents.SIGNUP_CLICKED, data);
        }
    }

    /**
     * Обработка статуса после запроса регистрации
     * @param {number} status - статус запроса
     */
    processSignupAttempt(status) {
        if (status === CREATED) {
            globalRouter.pushState(PATHS.profile);
        } else {
            const errors = {
                [BAD_REQUEST]: INCORRECT_DATA,
                [INTERNAL_SERVER_ERROR]: ALREADY_EXISTS,
            };
            document.getElementById('validation-hint-signup').innerText = errors[status];
        }
    }
}
