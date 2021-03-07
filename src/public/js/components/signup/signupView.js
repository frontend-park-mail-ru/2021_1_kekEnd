import BaseView from '../baseView.js';
import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import Validator from '../../utils/validation.js';
import {setValidationHint, setValidityClass} from '../../utils/setValidityClass.js';

export default class SignupView extends BaseView {
    constructor(parent) {
        super(parent);

        globalEventBus.on('signup status', this.processSignupAttempt.bind(this));
    }

    render() {
        this.parent.innerHTML = body;
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

            setValidityClass(document.getElementById('username-input'), loginError);
            setValidityClass(document.getElementById('email-input'), emailError);
            setValidityClass(document.getElementById('password-input'), passwordError);

            setValidationHint(document.getElementById('validation-hint-login'), loginError);
            setValidationHint(document.getElementById('validation-hint-email'), emailError);
            setValidationHint(document.getElementById('validation-hint-password'), passwordError);

            if ([loginError, emailError, passwordError].every((error) => error.length === 0)) {
                globalEventBus.emit('signup clicked', data);
            }
        });
    }

    processSignupAttempt(status) {
        globalRouter.pushState((status) ? PATHS.profile : PATHS.signup);
    }
}

const body = `<div class="header">
        <div class="header__section">
            <div class="header__item header-logo">
                КиноПоиск
            </div>
            <div class="header__item header-button">
                <a href="#">Фильмы</a>
            </div>
            <div class="header__item header-button">
                <a href="#">Актеры</a>
            </div>
            <div class="header__item header-button">
                <a href="#">Поиск</a>
            </div>
        </div>
        <div class="header__section">
            <div class="header__item header-button">
                <a href="/login">Войти</a>
            </div>
            <div class="header__item header-button">
                <a href="/signup">Регистрация</a>
            </div>
        </div>
    </div>

    <div class="main">
        <div class="form-box">
            <div class="button-box">
                <div id="current-button" class="button-wrap switcher-on-signup"></div>
                <a href="/login"><button type="button" class="toggle-button" id="login-button">Войти</button></a>
                <button type="button" class="toggle-button button-white-text" id="signup-button">Регистрация</button>
            </div>

            <div class="social-icons">
                <img src="public/img/fb.png"/>
                <img src="public/img/tw.png"/>
                <img src="public/img/gp.png"/>
            </div>

            <form id="signup" class="signup-form input-group" novalidate>
                <input name="username" type="text" class="input-field" id="username-input" 
                                                            placeholder="Имя пользователя">
                <p class="validation-hint" id="validation-hint-login"><em>Логин</em></p>
                <input name="email" type="email" class="input-field" id="email-input" placeholder="Email">
                <p class="validation-hint" id="validation-hint-email"><em>Email</em></p>
                <input name="password" type="password" class="input-field" id="password-input" placeholder="Пароль">
                <p class="validation-hint" id="validation-hint-password"><em>Пароль</em></p>
                <input name="ads-agree" id="ads-agree" type="checkbox" class="checkbox">
                <label for="ads-agree" class="checkbox-label">Согласен на рассылку</label>
                <button type="submit" id='signup-submit' class="submit-button">Зарегистрироваться</button>
            </form>
        </div>
    </div>`;
