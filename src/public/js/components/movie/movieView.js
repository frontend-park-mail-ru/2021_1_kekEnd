import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';
import {globalRouter} from "../../utils/router.js";
import {PATHS} from "../../utils/paths.js";


export default class MovieView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['movie.hbs']);

        Handlebars.registerHelper("inc", function (value, options) {
            return parseInt(value) + 1;
        });

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));
    }

    render(id) {
        globalEventBus.emit('get movie data', id);
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                globalEventBus.emit('logout clicked');
            });
        }

        document.getElementById('button-watch-later').addEventListener('click', this.watchLaterClicked.bind(this));
        document.getElementById('button-plus').addEventListener('click', this.plusClicked.bind(this));
        document.getElementById('button-other').addEventListener('click', this.otherClicked.bind(this));
    }

    removeEventListeners() {
        document.getElementById('button-watch-later').removeEventListener('click', this.watchLaterClicked);
        document.getElementById('button-plus').removeEventListener('click', this.plusClicked);
        document.getElementById('button-other').removeEventListener('click', this.otherClicked);
    }

    setMovieData(data) {
        super.render(data);

        this.setEventListeners();
    }

    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
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

