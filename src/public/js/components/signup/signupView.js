import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';

export default class SignupView extends BaseView {
    constructor(parent) {
        super(parent);
    }

    render() {
        this.parent.innerHTML = body;
        this.setEventListeners();
    }

    setEventListeners() {
        const loginButton = document.getElementById('login-button');
        loginButton.addEventListener('click', () => {
            const signupButton = document.getElementById('signup-button');
            signupButton.classList.remove('button-white-text');

            const switcher = document.getElementById('current-button');
            switcher.classList.remove('switcher-on-signup');

            const signupForm = document.getElementById('signup');
            signupForm.classList.remove('signup-form-active');

            globalRouter.pushState('/login');
        });

        const signupSubmit = document.getElementById('signup-submit');
        signupSubmit.addEventListener('click', () => {
            console.log('Attempt to sign up');
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
                <div id="current-button" class="button-wrap switcher-on-signup"></div>
                <button type="button" class="toggle-button" id="login-button">Войти</button>
                <button type="button" class="toggle-button button-white-text" id="signup-button">Регистрация</button>
            </div>

            <div class="social-icons">
                <img src="public/img/fb.png"/>
                <img src="public/img/tw.png"/>
                <img src="public/img/gp.png"/>
            </div>

            <form id="signup" class="signup-form signup-form-active input-group">
                <input type="text" class="input-field" placeholder="Имя пользователя" required>
                <input type="email" class="input-field" placeholder="Email" required>
                <input type="password" class="input-field" placeholder="Пароль" required>
                <input id="terms-checkbox" type="checkbox" class="checkbox">
                <label for="terms-checkbox" class="checkbox-label">Согласен на рассылку</label>
                <button type="submit" id='signup-submit' class="submit-button">Зарегистрироваться</button>
            </form>
        </div>
    </div>`;
