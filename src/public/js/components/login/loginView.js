import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';

export default class LoginView extends BaseView {
    constructor(parent) {
        super(parent);

        globalEventBus.on('login status', this.processLoginAttempt.bind(this));
    }

    render() {
        this.parent.innerHTML = body;
        this.setEventListeners();
    }

    setEventListeners() {
        const form = document.getElementById('login');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            // converting FormData object to json
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            globalEventBus.emit('login clicked', data);
        });
    }

    processLoginAttempt(status) {
        globalRouter.pushState((status) ? PATHS.profile : PATHS.login);
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
                <div id="current-button" class="button-wrap"></div>
                <button type="button" class="toggle-button button-white-text" id="login-button">Войти</button>
                <a href="/signup">
                    <button type="button" class="toggle-button" id="signup-button">Регистрация</button>
                </a>
            </div>

            <div class="social-icons">
                <img src="public/img/fb.png" alt="Facebook"/>
                <img src="public/img/tw.png" alt="Twitter"/>
                <img src="public/img/gp.png" alt="Google"/>
            </div>

            <form id="login" class="login-form input-group">
                <input name="username" type="text" class="input-field" placeholder="Имя пользователя">
                <input name="password" type="password" class="input-field" placeholder="Пароль">
                <input name="remember-me" id="remember-checkbox" type="checkbox" class="checkbox">
                <label for="remember-checkbox" class="checkbox-label">Запомнить меня</label>
                <button type="submit" id="login-submit" class="submit-button">Вход</button>
            </form>
        </div>
    </div>`;
