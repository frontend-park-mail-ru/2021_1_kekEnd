import {globalEventBus} from '../../utils/eventbus.js';
import {API} from "../../utils/api.js";
import {OK} from "../../utils/codes.js";

export default class LoginModel {
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
    }

    checkLogin(userData) {
        console.log("HEER")
        API.login(userData)
            .then((res) => {
                globalEventBus.emit('login status', res.status === OK);
            });
    }
}
