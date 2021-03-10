import BaseView from '../baseView.js';
import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationResult} from '../../utils/setValidationResult.js';
import './signup.tmpl.js';
import {CREATED} from "../../utils/codes.js";


export default class SignupView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['signup.hbs']);

        globalEventBus.on('signup status', this.processSignupAttempt.bind(this));
    }

    render() {
        super.render();
        this.setEventListeners();
    }

    setEventListeners() {
        const form = document.getElementById('signup');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = getFormValues(form);

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
                globalEventBus.emit('signup clicked', data);
            }
        });
    }

    processSignupAttempt(status) {
        if (status === CREATED) {
            globalRouter.pushState(PATHS.profile);
        } else {
            const errors = {
                400: 'Ошибка в формате ввода',
                500: 'Пользователь с таким имененем уже существует'
            }
            document.getElementById('send-form-hint').innerText = errors[status];
        }
    }
}
