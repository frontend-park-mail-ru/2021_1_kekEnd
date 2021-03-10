import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {OK} from "../../utils/codes.js";


export default class MovieModel {
    constructor() {
        globalEventBus.on('get movie data', this.getMovieData.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
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

    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit('logout status', res.status === OK)
            });
    }
}

