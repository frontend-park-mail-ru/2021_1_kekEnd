import {globalEventBus} from '../../utils/eventbus.js';
import Api from '../../utils/api.js';


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
        this.api = new Api();
    }

    getMovieData() {
        this.api.getMovieData()
            .then((res) => {
                console.log(res.data);
                this.api.checkAuthentication()
                    .then((authRes) => {
                        globalEventBus.emit('set movie data', {...res.data, 'isAuthorized': authRes.data !== ''});
                    });
            });
    }
}

