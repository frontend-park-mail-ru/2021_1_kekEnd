import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';


/**
 *  Модель страницы регистрации
 */
export default class Model {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('signup clicked', this.createUser.bind(this));
    }

    /**
     * Проверка на существование пользователя
     * @param {Object} data - данные о пользователе
     * @returns {bool} - статус запроса
     */
    userNotExists(data) {
        // запрос к серверу на проверку существования пользователя
        return true;
    }

    /**
     * Создание (регистрация) пользователя
     * @param {Object} data - данные о пользователе
     */
    createUser(data) {
        if (this.userNotExists(data)) {
            API.signup(data)
                .then((res) => {
                    globalEventBus.emit('signup status', res.status);
                });
        }
    }
}
