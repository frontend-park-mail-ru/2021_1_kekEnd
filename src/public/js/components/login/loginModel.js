import {globalEventBus} from '../../utils/eventbus.js';
import {api} from "../../utils/api.js";

export default class LoginModel {
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
    }

    checkLogin(userData) {
        api.login(userData)
            .then((res) => {
                console.log(res);
                globalEventBus.emit('login status', true);
            });
    }
}
