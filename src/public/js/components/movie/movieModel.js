import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK} from "../../utils/codes.js";


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
    }

    getMovieData() {
        API.getMovieData()
            .then((res) => {
                API.getUser()
                    .then((authRes) => {
                        globalEventBus.emit('set movie data',
                            {...res.data, 'isAuthorized': authRes.status === OK});
                    });
            });
    }
}

