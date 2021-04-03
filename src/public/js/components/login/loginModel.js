import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {busEvents} from '../../utils/busEvents.js';


/**
 *  Модель страницы логина
 */
export default class LoginModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.LOGIN_CLICKED, this.checkLogin.bind(this));
    }
    /**
     * Проверка авторизации пользователя
     * @param {Object} userData - данные пользователя
     */
    checkLogin(userData) {
        API.login(userData)
            .then((res) => {
                globalEventBus.emit(busEvents.LOGIN_STATUS, res.status);
            });
    }
}
