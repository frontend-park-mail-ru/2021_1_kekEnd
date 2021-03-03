import {globalEventBus} from '../../utils/eventbus.js';

export default class LoginModel {
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
    }

    checkLogin() {
        // запрос к серверу на проверку логина и пароля
        const loginSuccess = true;

        globalEventBus.emit('login status', loginSuccess);
    }
}
