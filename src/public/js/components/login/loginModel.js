import {globalEventBus} from '../../utils/eventbus.js';
import {API} from "../../utils/api.js";

export default class LoginModel {
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
    }

    checkLogin(userData) {
        API.login(userData)
            .then((res) => {
                globalEventBus.emit('login status', res.status);
            });
    }
}
