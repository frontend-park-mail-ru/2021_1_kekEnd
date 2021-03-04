import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';

export default class LoginView extends BaseView {
    constructor(parent) {
        super(parent);

        globalEventBus.on('login status', this.processLoginAttempt.bind(this));
    }

    render() {
        this.parent.innerHTML = body;
        this.loginForm = document.getElementById('login');
        this.setEventListeners();
    }

    setEventListeners() {
        const signupButton = document.getElementById('signup-button');
        signupButton.addEventListener('click', () => {
            const loginButton = document.getElementById('login-button');
            loginButton.classList.remove('button-white-text');

            const switcher = document.getElementById('current-button');
            switcher.classList.add('switcher-on-signup');

            this.loginForm.classList.add('login-form-inactive');

            // TODO: разобраться с анимацией
            globalRouter.pushState('/signup');
        });

        this.loginForm.addEventListener('submit', (e) => {
            // TODO: получить данные формы
            const formData = new FormData(this.loginForm);
            // пусто
            for (const pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            // Form submission canceled because the form is not connected
            globalEventBus.emit('login clicked', formData);
        });
    }

    processLoginAttempt(status) {
        if (status) {
            globalRouter.pushState('/');
        } else {
            globalRouter.pushState('/login');
        }
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
                <button type="button" class="toggle-button" id="signup-button">Регистрация</button>
            </div>

            <div class="social-icons">
                <img src="public/img/fb.png" alt="Facebook"/>
                <img src="public/img/tw.png" alt="Twitter"/>
                <img src="public/img/gp.png" alt="Google"/>
            </div>

            <form id="login" class="login-form input-group">
                <input type="text" class="input-field" placeholder="Имя пользователя">
                <input type="password" class="input-field" placeholder="Пароль">
                <input id="remember-checkbox" type="checkbox" class="checkbox">
                <label for="remember-checkbox" class="checkbox-label">Запомнить меня</label>
                <button type="submit" id="login-submit" class="submit-button">Вход</button>
            </form>
        </div>
    </div>`;
