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

        globalEventBus.on(busEvents.SET_BEST_MOVIES, this.setBestMovies.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));
    }

    render() {
        globalEventBus.emit(busEvents.GET_BEST_MOVIES);
    }

    hide() {
        this.parent.innerHTML = '';
        // this.removeEventListeners();
    }

    setBestMovies(data) {
        console.log(data);
        super.render(data);

        // this.setEventListeners();
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
