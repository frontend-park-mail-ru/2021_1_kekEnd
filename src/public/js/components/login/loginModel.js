import {globalEventBus} from '../../utils/eventbus.js';

export default class LoginModel {
    checkLogin() {
        // запрос к серверу на проверку логина и пароля
        const loginSuccess = true;

        globalEventBus.emit('login attempt', loginSuccess);
    }
}
