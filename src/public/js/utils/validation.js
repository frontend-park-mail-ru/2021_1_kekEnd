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
            error.push('Некорректный формат Email');
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
            error.push('Логин должен быть длиной от 6 до 20 символов!');
        }
        if (!(/^[a-zA-Z0-9_]*$/.test(login))) {
            error.push('Логин должен состоять только из латинских букв, чисел и нижних подчеркиваний!');
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
            error.push('Пароль должен быть длиной от 8 до 32!');
        }
        if (!(/\d/.test(password))) {
            error.push('Пароль должен содержать хотя бы одну цифру!');
        }
        if (!(/[a-zA-Z]/.test(password))) {
            error.push('Пароль должен содержать хотя бы одну букву!');
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
            error.push('Имя не должно быть пустым!');
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
            error.push('Нельзя выбрать пустой аватар!');
            return error;
        }

        if (!(['image/png', 'image/jpeg'].includes(avatar.type))) {
            error.push('Некорректный формат картинки! Используйте png или jpeg');
        }

        if (!(avatar.size <= 5242880)) {
            error.push('Размер файла не должен превышать 5MB!');
        }

        return error;
    }
}
