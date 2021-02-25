import {globalEventBus} from '../utils/eventbus.js';
import BaseView from './BaseView.js';

export default class ProfileView extends BaseView {
    constructor(parent) {
        super(parent);

        this.parent = parent;
        globalEventBus.on('set profile data', this.setProfileData.bind(this));
    }

    render() {
        this.parent.innerHTML = body;

        globalEventBus.emit('get profile data');

        this.setEventListeners();
    }

    hide() {
        this.parent.innerHTML = '';
        this.removeEventListeners();
    }

    testFunction() {
        alert('123');
    }

    setEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.addEventListener('click', this.testFunction);
    }

    removeEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.removeEventListener('click', this.testFunction);
    }

    setProfileData(data) {
        const userName = document.getElementById('user-full-name');
        userName.innerHTML = data.fullname;

        const userEmail = document.getElementById('user-email');
        userEmail.innerHTML = data.email;

        const userMoviesCnt = document.getElementById('user-watched-movies-cnt');
        userMoviesCnt.innerHTML = data.watchedMoviesCnt;

        const userReviewsCnt = document.getElementById('user-reviews-cnt');
        userReviewsCnt.innerHTML = data.reviewsCnt;
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
                <a href="#" data-section="login">Войти</a>
            </div>
            <div class="header__item header-button">
                <a href="#" data-section="signup">Регистрация</a>
            </div>
        </div>
    </div>

    <div class="main">
        <div class="profile-card">
            <div class="container">
                <div class="avatar-container">
                    <img src="https://i.imgur.com/ZaZ7FP4.jpg" alt="">
                </div>

                <div class="content">
                    <div class="head">
                        <p id="user-full-name" class="user-name">Sample User</p>
                        <span id="user-email" class="user-email">cruise@mail.ru</span>
                        <button id="button-profile-settings" class="settings-button">Настройки</button>
                    </div>
                    <div class="stats">
                        <div class="stats-item">
                            <p class="stats-item-name">Посмотрел фильмов</p>
                            <span id="user-watched-movies-cnt" class="stats-item-value">125</span>
                        </div>
                        <div class="stats-item">
                            <p class="stats-item-name">Рецензий</p>
                            <span id="user-reviews-cnt" class="stats-item-value">9</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="section-name">Любимые фильмы</h3>

        <!-- TODO: решить проблему источников изображений -->
        <div class="slider">
            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/87b5659d-a159-4224-9bff-d5a5d109a53b/300x450">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/73cf2ed0-fd52-47a2-9e26-74104360786a/300x450">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/96d93e3a-fdbf-4b6f-b02d-2fc9c2648a18/300x450">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4b27e219-a8a5-4d85-9874-57d6016e0837/300x450">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/1d36b3f8-3379-4801-9606-c330eed60a01/300x450">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/300x450">
            </div>
        </div>

        <h3 class="section-name">Любимые актеры</h3>

        <div class="slider">
            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/2eb2fc4d-a8bd-43b0-83cd-35feacb8ccae/280x420">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8faa0fd8-6780-4fc2-84ef-3fb89687bd85/280x420">
            </div>

            <div class="slider-card">
                <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/f3270b86-abfb-4fce-8a1b-8ba6901ddcea/280x420">
            </div>
        </div>

        <h3 class="section-name">Рецензии</h3>
    </div>`;
