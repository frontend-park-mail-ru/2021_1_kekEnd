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
     * Создание (регистрация) пользователя
     * @param {Object} data - данные о пользователе
     */
    createUser(data) {
        API.signup(data)
            .then((res) => {
                globalEventBus.emit('signup status', res.status);
            });
    }
}
