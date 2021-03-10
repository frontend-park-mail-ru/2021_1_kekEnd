import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';


export default class MovieView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['movie.hbs']);

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
    }

    render() {
        globalEventBus.emit('get movie data');
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
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

