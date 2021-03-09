import {globalEventBus} from '../../utils/eventbus.js';
import {api} from '../../utils/api.js';


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
    }

    getMovieData() {
        api.getMovieData()
            .then((res) => {
                console.log(res.data);
                globalEventBus.emit('set movie data', res.data);
            });
    }
}

