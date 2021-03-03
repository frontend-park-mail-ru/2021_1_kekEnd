// import {globalEventBus} from "../../utils/eventbus.js";
import BaseView from '../baseView.js';

export default class LoginView extends BaseView {
    constructor(parent) {
        super(parent);
    }

    render() {
        this.parent.innerHTML = body;

        this.loginButton = document.getElementById('login-button');
        this.loginButton.classList.add('button-white-text');

        this.setEventListeners();
    }

    setEventListeners() {
        const signupButton = document.getElementById('signup-button');
        signupButton.addEventListener('click', () => {
            this.loginButton.classList.toggle('button-white-text');

            const switcher = document.getElementById('current-button');
            switcher.classList.toggle('switcher-on-signup');

            const loginForm = document.getElementById('login');
            loginForm.classList.toggle('login-form-inactive');
        });

        const loginSubmit = document.getElementById('login-submit');
        loginSubmit.addEventListener('click', () => {
            console.log('Attempt to login');
        });
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
                <a href="#">Войти</a>
            </div>
            <div class="header__item header-button">
                <a href="#">Регистрация</a>
            </div>
        </div>
    </div>

    <div class="main">
        <div class="form-box">
            <div class="button-box">
                <div id="current-button" class="button-wrap"></div>
                <button type="button" class="toggle-button" id="login-button">Войти</button>
                <button type="button" class="toggle-button" id="signup-button">Регистрация</button>
            </div>

            <div class="social-icons">
                <img src="public/img/fb.png" alt="Facebook"/>
                <img src="public/img/tw.png" alt="Twitter"/>
                <img src="public/img/gp.png" alt="Google"/>
            </div>

            <form id="login" class="login-form input-group">
                <input type="text" class="input-field" placeholder="Имя пользователя" required>
                <input type="password" class="input-field" placeholder="Пароль" required>
                <input id="remember-checkbox" type="checkbox" class="checkbox">
                <label for="remember-checkbox" class="checkbox-label">Запомнить меня</label>
                <button type="submit" id="login-submit" class="submit-button">Вход</button>
            </form>
        </div>
    </div>`;
