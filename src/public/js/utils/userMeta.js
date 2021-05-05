import {API} from './api';
import {OK_CODE} from './codes';

const AUTH_STATUS = 'auth status';
const USERNAME = 'username';

/**
 * Класс, предоставляющий служебную информацию о текущем пользователе
 */
class UserMeta {
    /**
     * Конструктор, изначально ставим статус "Не авторизован"
     */
    constructor() {
        localStorage.setItem(AUTH_STATUS, 'false');
        localStorage.setItem(USERNAME, null);
    }

    /**
     * Выставить в localStorage значение авторизованности
     * @return {Promise<void>} - промис с действием "выставление статуса авторизации"
     */
    async initMeta() {
        API.getCurrentUser().then((res) => {
            this.setAuthorized(res.status === OK_CODE);
            this.setUsername(res.data.username);
        });
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

    /**
     * Получаем идентификатор текущего пользователя
     * @return {string} - имя пользователя
     */
    getUsername() {
        return localStorage.getItem(USERNAME);
    }

    /**
     * Устанавливаем идентификатор текущего пользователя
     * @param {string|null} username - имя пользователя
     */
    setUsername(username) {
        localStorage.setItem(USERNAME, username);
    }
}

export const userMeta = new UserMeta();
