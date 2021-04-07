import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './moviesList.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';

export default class MoviesListView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['moviesList.hbs']);

        globalEventBus.on(busEvents.SET_MOVIES_PAGE, this.setMovies.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    render(params) {
        const [category, page, query] = params.split('/');
        if (category === 'best') {
            globalEventBus.emit(busEvents.GET_BEST_MOVIES_PAGE, page);
            return;
        }
        if (category === 'genre') {
            console.log(query);
            // TODO Олегу:
            // CHECK в query строка вида ?filter=comedy+horror+drama
            // CHECK надо получить массив жанров и вызвать .emit(busEvents.GET_GENRE_MOVIES_PAGE, <массив>);
            // CHECK метод getMoviesByGenres определить в moviesListModel.js
            const genres = query.slice('?filter='.length).split('+');   // а почему бы и нет?
            globalEventBus.emit(busEvents.GET_GENRE_MOVIES_PAGE, genres);
        }
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setMovies(data) {
        super.render(data);
        this.setEventListeners();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('logout-button')?.addEventListener('click', this.logoutClickedCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
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

