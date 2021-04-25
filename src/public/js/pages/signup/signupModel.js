import {globalEventBus} from '../../utils/eventbus';
import {API} from '../../utils/api';
import {busEvents} from '../../utils/busEvents';
import {OK_CODE} from '../../utils/codes';
import {globalRouter} from '../../utils/router';
import {PATHS} from '../../utils/paths';


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
