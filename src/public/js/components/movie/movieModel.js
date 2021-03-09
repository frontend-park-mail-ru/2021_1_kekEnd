import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
    }

    getMovieData() {
        API.getMovieData()
            .then((res) => {
                console.log(res.data);
                this.api.checkAuthentication()
                    .then((authRes) => {
                        globalEventBus.emit('set movie data', {...res.data, 'isAuthorized': authRes.data !== ''});
                    });
            });
    }
}

