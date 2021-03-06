import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';

export default class MovieView extends BaseView {
    constructor(parent) {
        super(parent);

        globalEventBus.on('set movie data', this.setMovieData.bind(this));
    }

    render() {
        globalEventBus.emit('get movie data');
    }
}

