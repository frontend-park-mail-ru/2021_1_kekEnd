import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './main.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';

export default class MainView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['main.hbs']);

        globalEventBus.on(busEvents.SET_MAIN_PAGE_DATA, this.setMainPageData.bind(this));
        globalEventBus.on(busEvents.SET_MOVIES_BY_GENRES, this.setMoviesByGenres.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    render() {
        globalEventBus.emit(busEvents.GET_MAIN_PAGE_DATA);
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setMainPageData(data) {
        super.render(data);
        this.setEventListeners();
    }

    setMoviesByGenres(data) {
        super.render(data); ///TODO: breaks everythings?
        Array.from(document.getElementsByClassName('main-genre-box'))
            .forEach( element => element.AddEventListener('click', (button) => {
                if (button.classList.contains('genre-selected')) {
                    button.removeClass('genre-selected');
                } else {
                    button.addClass('genre-selected');
                }
            }) );
        ///TODO: test
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('main-genre-search-button')?.addEventListener('click',
            this.searchMoviesByGenresCallback);
        document.getElementById('logout-button')?.addEventListener('click', this.logoutClickedCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('main-genre-search-button')?.removeEventListener('click',
            this.searchMoviesByGenresCallback);
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
    }

    searchMoviesByGenresCallback() {
        const genres = document.getElementsByClassName('main-genre-box')
            .filter( element => element.classList.contains('genre-selected') )
            .map( element => element.innerText );
        globalEventBus.emit(busEvents.GET_MOVIES_BY_GENRES, genres);
        ///TODO: test
        console.log('search by genres clicked: ' + genres);
    }

    logoutClicked() {
        globalEventBus.emit(busEvents.LOGOUT_CLICKED);
    }

    /**
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}

