'use strict';


/**
 * Класс для валидации данных
 */
export default class Validator {
    /**
     * Проверка email
     * @param {string} email - адрес почты
     * @returns {array} - код ошибки
     */
    validateEmail(email) {
        const error = [];

        if (!(/@/.test(email))) {
            error.push('incorrect email');
        }

        return error;
    }

    /**
     * Проверка login
     * @param {string} login - логин
     * @returns {array} - код ошибки
     */
    validateLogin(login) {
        const error = [];

        if (!(login.length >= 6 && login.length <= 20)) {
            error.push('should be from 6 to 20 characters long');
        }
        if (!(/^[a-zA-Z0-9_]*$/.test(login))) {
            error.push('should contain only latin letters, numbers and underscores');
        }

        return error;
    }

    /**
     * Проверка пароля
     * @param {string} password - пароль
     * @returns {array} - код ошибки
     */
    validatePassword(password) {
        const error = [];

        if (!(password.length >= 8 && password.length <= 32)) {
            error.push('should be from 8 to 32 characters long');
        }
        if (!(/\d/.test(password))) {
            error.push('should contain at least one digit');
        }
        if (!(/[a-zA-Z]/.test(password))) {
            error.push('should contain at least one letter');
        }

        return error;
    }

    /**
     * Проверка имени
     * @param {string} fullname - имя
     * @returns {array} - код ошибки
     */
    validateFullname(fullname) {
        const error = [];

        if (fullname.length === 0) {
            error.push('should not be empty');
        }

        return error;
    }

    /**
     * Проверка аватара
     * @param {string} avatar - аватар
     * @returns {array} - код ошибки
     */
    validateAvatar(avatar) {
        const error = [];

        if (!avatar) {
            error.push('should not be empty');
        }

        return error;
    }
}
