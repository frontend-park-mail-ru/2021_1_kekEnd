import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
//import './movie.tmpl.js';


export default class MovieView extends BaseView {
    constructor(parent) {
        //super(parent, Handlebars.templates['movie.hbs']);
        super(parent);

        this.data = {};

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
    }

    render() {
        this.parent.innerHTML = body;

        globalEventBus.emit('get movie data');
        
        //super.render(this.data);

        this.setEventListeners();
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        document.getElementByClassName('watch_later_button')[0].addEventListener('click', this.watchLaterClicked());
        document.getElementByClassName('plus_button')[0].addEventListener('click', this.plusClicked());
        document.getElementByClassName('other_button')[0].addEventListener('click', this.otherClicked());
    }

    removeEventListeners() {
        document.getElementByClassName('watch_later_button')[0].removeEventListener('click', this.watchLaterClicked());
        document.getElementByClassName('plus_button')[0].removeEventListener('click', this.plusClicked());
        document.getElementByClassName('other_button')[0].removeEventListener('click', this.otherClicked());
    }

    setMovieData(data) {
        this.data = data;

        document.getElementById('movie_title').innerHTML = data.name;
        document.getElementById('movie_description').innerHTML = data.description;
        document.getElementById('movie_audio').innerHTML = data.audio.join(', ');
        document.getElementById('movie_subtitles').innerHTML = data.subtitles.join(', ');
        document.getElementById('movie_quality').innerHTML = data.quality;
        document.getElementById('movie_year').innerHTML = data.year;
        document.getElementById('movie_country').innerHTML = data.country.map( (e) => `<a href class="info_link">${e}</a>` ).join(`<span>,</span>`);
        document.getElementById('movie_genre').innerHTML = data.genre.map( (e) => `<a href class="info_link">${e}</a>` ).join(`<span>,</span>`);
        document.getElementById('movie_tagline').innerHTML = data.tagline;
        document.getElementById('movie_director').innerHTML = data.director;
        document.getElementById('movie_scriptwriter').innerHTML = data.scriptwriter;
        document.getElementById('movie_producer').innerHTML = data.producer;
        document.getElementById('movie_operator').innerHTML = data.operator;
        document.getElementById('movie_composer').innerHTML = data.composer;
        document.getElementById('movie_artist').innerHTML = data.artist;
        document.getElementById('movie_editor').innerHTML = data.editor;
        document.getElementById('movie_budget').innerHTML = `${data.budget.amount}${data.budget.currency}`;
        document.getElementById('movie_duration').innerHTML = data.duration;
        document.getElementById('movie_roles_list').innerHTML = data.roles.map( (e) => `<li><a class="actors_list_item">${e}</a></li>` );

        ///TODO:img...

    }


    watchLaterClicked() {
        console.log('watch later clicked');
    }

    plusClicked() {
        console.log('plus clicked');
    }

    otherClicked() {
        console.log('other clicked');
    }

}


const body = `
    <div class="header">
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
        <div class="movie_content_container">
            <div class="background_trailer">
                <div class="background_trailer_img center"></div>
            </div>

            <div class="flex_container">
                <div class="movie_content_left">
                    <div class="movie_content_left_inner">
                        <img class="movie_content_left_img" src="public/img/300x450.webp">
                        <img class="movie_content_left_img" src="public/img/trailer.jpeg">
                        <button class="watch_later_button">
                            Буду смотреть
                        </button>
                        <button class="plus_button">
                            +
                        </button>
                        <button class="other_button">
                            Еще какая-то кнопка
                        </button>
                    </div>
                </div>
                <div class="movie_content_center">
                    <div class="movie_info_title">
                        <h1 id="movie_title">
                            Чужой
                        </h1>
                    </div>
                    <div class="meta_info">
                        <p id="movie_description">Группа космонавтов высаживается на неизвестной планете и знакомится с ксеноморфом. Шедевр Ридли
                            Скотта</p>
                    </div>
                    <div class="movie_info">
                        <div class="info_row_nounderline">
                            <div class="info_title">Аудиодорожки</div>
                            <span id="movie_audio" class="info_link">Русский, Английский</span>
                        </div>
                        <div class="info_row_nounderline">
                            <div class="info_title">Субтитры</div>
                            <span id="movie_subtitles" class="info_link">Русскиe</span>
                        </div>
                        <div class="info_row_nounderline">
                            <div class="info_title">Качество</div>
                            <span id="movie_quality" class="info_link">HD</span>
                        </div>
                    </div>

                    <h2 class="movie_info_title">О фильме</h2>

                    <div class="movie_info">
                        <div class="info_row">
                            <div class="info_title">Год производства</div>
                            <a id="movie_year" href="" class="info_link">1979</a>
                        </div>
                        <div class="info_row">
                            <div id="movie_country" class="info_title">Страна</div>
                            <a href="" class="info_link">Великобритания</a> <span>,</span><a href=""
                                                                                             class="info_link">США</a>
                        </div>
                        <div class="info_row">
                            <div id="movie_genre" class="info_title">Жанр</div>
                            <a href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Слоган</div>
                            <div id="movie_tagline" class="info_value">«В космосе твой крик никто не услышит...»</div>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Режиссёр</div>
                            <a id="movie_director" href="" class="info_link">Кек Кекович</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Сценарист</div>
                            <a id="movie_scriptwriter" href="" class="info_link">Дольф Лунтик</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Продюсер</div>
                            <a id="movie_producer" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Оператор</div>
                            <a id="movie_operator" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Композитор</div>
                            <a id="movie_composer" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Художник</div>
                            <a id="movie_artist" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Монтаж</div>
                            <a id="movie_editor" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Бюджет</div>
                            <a id="movie_budget" href="" class="info_link">Кек</a>
                        </div>
                        <div class="info_row">
                            <div class="info_title">Время</div>
                            <div id="movie_duration" class="info_value">228:1488</div>
                        </div>
                    </div>
                </div>
                <div class="movie_content_right">
                    <h3 class="movie_content_right_header">В главных ролях</h3>
                    <ul id="movie_roles_list" class="actors_list">
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                        <li><a class="actors_list_item">Сигурни Уивер</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

