import {API} from './api';
import {OK_CODE} from './codes';

const AUTH_STATUS = 'auth status';

/**
 * Класс, предоставляющий служебную информацию о текущем пользователе
 */
class UserMeta {
    /**
     * Конструктор, изначально ставим статус "Не авторизован"
     */
    constructor() {
        localStorage.setItem(AUTH_STATUS, 'false');
    }

    /**
     * Выставить в localStorage значение авторизованности
     * @return {Promise<void>} - промис с действием "выставление статуса авторизации"
     */
    async initMeta() {
        API.getUser().then((res) => this.setAuthorized(res.status === OK_CODE));
    }

    /**
     * Получаем статус авторизованности
     * @return {boolean} - авторизован ли пользователь
     */
    getAuthorized() {
        return localStorage.getItem(AUTH_STATUS) === 'true';
    }

    /**
     * Устанавливаем статус авторизованности
     * @param {boolean} authStatus - авторизован ли пользователь
     */
    setAuthorized(authStatus) {
        localStorage.setItem(AUTH_STATUS, authStatus.toString());
    }
}

export const userMeta = new UserMeta();
