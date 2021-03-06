import BaseView from '../baseView.js';
import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';

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

            globalEventBus.emit('signup clicked', data);
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

            <form id="signup" class="signup-form signup-form-active input-group">
                <input name="username" type="text" class="input-field" placeholder="Имя пользователя">
                <input name="email" type="email" class="input-field" placeholder="Email">
                <input name="password" type="password" class="input-field" placeholder="Пароль">
                <input name="ads-agree" id="ads-agree" type="checkbox" class="checkbox">
                <label for="terms-checkbox" class="checkbox-label">Согласен на рассылку</label>
                <button type="submit" id='signup-submit' class="submit-button">Зарегистрироваться</button>
            </form>
        </div>
    </div>`;
