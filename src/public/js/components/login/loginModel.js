import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {busEvents} from '../../utils/busEvents';
import {OK_CODE} from '../../utils/codes';
import {globalRouter} from '../../utils/router';
import {PATHS} from '../../utils/paths';


/**
 *  Модель страницы логина
 */
export default class LoginModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.CHECK_AUTH_REDIRECT_LOGIN, this.checkAuthentication.bind(this));
        globalEventBus.on(busEvents.LOGIN_CLICKED, this.checkLogin.bind(this));
    }

    /**
     * Проверка, если пользователь уже авторизован
     */
    checkAuthentication() {
        API.getUser()
            .then((res) => {
                if (res.status === OK_CODE) {
                    globalRouter.pushState(PATHS.profile);
                } else {
                    globalEventBus.emit(busEvents.LOAD_LOGIN_PAGE);
                }
            });
    }

    /**
     * Проверка успешности авторизации пользователя
     * @param {Object} userData - данные пользователя
     */
    checkLogin(userData) {
        API.login(userData)
            .then((res) => {
                globalEventBus.emit(busEvents.LOGIN_STATUS, res.status);
            });
    }
}
