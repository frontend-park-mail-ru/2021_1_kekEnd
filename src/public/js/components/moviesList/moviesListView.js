import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './moviesList.tmpl.js';

export default class MoviesListView extends BaseView {
    constructor(parent) {
        super(parent, Handlebars.templates['moviesList.hbs']);

        globalEventBus.on('set best movies', this.setBestMovies.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));
    }

    render() {
        globalEventBus.emit('get best movies');
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
