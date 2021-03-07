import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './movie.tmpl.js';


export default class MovieView extends BaseView {
    constructor(parent) {
        super(parent, Handlebars.templates['movie.hbs']);

        this.data = {};

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
    }

    render() {
        globalEventBus.emit('get movie data');

        super.render(this.data);

        this.setEventListeners();
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        document.getElementById('button-watch-later').addEventListener('click', this.watchLaterClicked());
        document.getElementById('button-plus').addEventListener('click', this.plusClicked());
        document.getElementById('button-other').addEventListener('click', this.otherClicked());
    }

    removeEventListeners() {
        document.getElementById('button-watch-later').removeEventListener('click', this.watchLaterClicked());
        document.getElementById('button-plus').removeEventListener('click', this.plusClicked());
        document.getElementById('button-other').removeEventListener('click', this.otherClicked());
    }

    setMovieData(data) {

        this.data = data;

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

