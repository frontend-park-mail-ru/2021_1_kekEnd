import {globalEventBus} from '../../utils/eventbus.js';
import Api from "../../utils/api.js";

export default class LoginModel {
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
        this.api = new Api();
    }

    checkLogin(userData) {
        this.api.login(userData)
            .then((res) => {
                console.log(res);
                globalEventBus.emit('login status', true);
            });
    }
}
