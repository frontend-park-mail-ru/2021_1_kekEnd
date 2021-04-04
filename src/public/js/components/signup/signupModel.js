import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {busEvents} from '../../utils/busEvents.js';


/**
 *  Модель страницы регистрации
 */
export default class Model {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on(busEvents.SIGNUP_CLICKED, this.createUser.bind(this));
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
