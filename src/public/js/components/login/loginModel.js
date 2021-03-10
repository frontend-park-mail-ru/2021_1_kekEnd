import {globalEventBus} from '../../utils/eventbus.js';
import {API} from "../../utils/api.js";


/**
 *  Модель страницы логина
 */
export default class LoginModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('login clicked', this.checkLogin.bind(this));
    }
    /**
     * Проверка авторизации пользователя
     * @param {Object} userData - данные пользователя
     */
    checkLogin(userData) {
        API.login(userData)
            .then((res) => {
                globalEventBus.emit('login status', res.status);
            });
    }
}
