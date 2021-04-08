import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {busEvents} from '../../utils/busEvents.js';
import {OK_CODE} from '../../utils/codes.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';


/**
 *  Модель страницы регистрации
 */
export default class Model {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.CHECK_AUTH_REDIRECT_SIGNUP, this.checkAuthentication.bind(this));
        globalEventBus.on(busEvents.SIGNUP_CLICKED, this.createUser.bind(this));
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
                    globalEventBus.emit(busEvents.LOAD_SIGNUP_PAGE);
                }
            });
    }

    /**
     * Создание (регистрация) пользователя
     * @param {Object} data - данные о пользователе
     */
    createUser(data) {
        API.signup(data)
            .then((res) => {
                globalEventBus.emit(busEvents.SIGNUP_STATUS, res.status);
            });
    }
}
