import {setValidationResult} from '../../utils/setValidationResult.js';
import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import Validator from '../../utils/validation.js';
import './settings.tmpl.js';
import {globalRouter} from "../../utils/router.js";
import {PATHS} from "../../utils/paths.js";
import {OK} from "../../utils/codes.js";


/**
 * Представление страницы настроек профиля
 */
export default class SettingsView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['settings.hbs']);

        this.settings = {};
        this.input = {};

        globalEventBus.on('set settings data', this.setSettings.bind(this));
        globalEventBus.on('response change settings', this.displayServerResponse.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));
        globalEventBus.on('avatar uploaded', this.displayServerResponseAvatar.bind(this));
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit('get settings data');
    }

    /**
     * Изменение настроек
     * @param {Object} data - новые данные
     */
    setSettings(data) {
        this.settings = data;
        super.render(this.settings);
        this.setEventListeners();
    }

    /**
     * Очистисть страницу
     */
    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                globalEventBus.emit('logout clicked');
            });
        }
        document.getElementById('settings-save-button').addEventListener('click', this.saveClicked.bind(this));
        document.getElementById('avatar-upload-button').addEventListener('click', this.uploadAvatarClicked.bind(this));
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('settings-save-button').removeEventListener('click', this.saveClicked);
        document.getElementById('avatar-upload-button').removeEventListener('click', this.uploadAvatarClicked);
    }

    /**
     * Обработчик нажатия на кнопку загрузки аватара
     */
    uploadAvatarClicked() {
        const selectedFile = document.getElementById('avatar').files[0];
        if (this.validateAvatar(selectedFile)) {
            globalEventBus.emit('upload avatar', selectedFile);
        }
    }

    /**
     * Обработчик нажатия на кнопку сохранения
     */
    saveClicked() {
        this.inputSettings();
        if (this.validateSettings()) {
            this.sendInput(this.deltaSettings());
        } else {
            document.getElementById('settings-server-response').innerHTML = '';
        }
        this.input = {};
    }

    /**
     * Проверка изменений данных о пользователе
     * @returns {Object} - обновленные настройки
     */
    deltaSettings() {
        const settings = {};
        if (this.settings.fullname !== this.input.fullname) {
            settings.fullname = this.input.fullname;
        }
        if (this.settings.email !== this.input.email) {
            settings.email = this.input.email;
        }
        if (this.input.password1.length !== 0) {
            settings.password = this.input.password1;
        }
        return settings;
    }

    /**
     * Получение новых данных
     */
    inputSettings() {
        const email = document.getElementById('user-email').value;
        const password1 = document.getElementById('user-password').value;
        const password2 = document.getElementById('user-password-repeat').value;
        this.input = {
            email,
            password1,
            password2,
        };
    }

    /**
     * Проверка данных на валидность
     * @returns {bool} - статус наличия ошибок
     */
    validateSettings() {
        const validator = new Validator();

        const passwordErrors = validator.validatePassword(this.input.password1);
        const emailErrors = validator.validateEmail(this.input.email);

        if (this.input.password1 !== this.input.password2) {
            passwordErrors.push('passwords do not match');
        }
        if (this.input.password1.length === 0 && this.input.password2.length === 0) {
            passwordErrors.length = 0;
        }

        [
            [
                document.getElementById('user-email'),
                document.getElementById('settings-errors-email'),
                emailErrors,
            ],
            [
                document.getElementById('user-password'),
                document.getElementById('settings-errors-password'),
                passwordErrors,
            ],
        ].forEach(([inputField, inputHint, errors]) => setValidationResult(inputField, inputHint, errors));

        return ([...passwordErrors, ...emailErrors].length === 0);
    }

    /**
     * Проверка на валидность аватара
     * @param {string} avatar - путь к фото
     * @returns {bool} - статус наличия ошибок
     */
    validateAvatar(avatar) {
        const validator = new Validator();

        const avatarErrors = validator.validateAvatar(avatar);

        document.getElementById('settings-avatar-errors').innerHTML = avatarErrors.join('<br>');

        [
            [
                document.getElementById('avatar'),
                document.getElementById('settings-avatar-errors'),
                avatarErrors,
            ],
        ].forEach(([inputField, inputHint, errors]) => setValidationResult(inputField, inputHint, errors));

        return (avatarErrors.length === 0);
    }

    /**
     * Отправка запроса на изменение настроек
     * @param {Object} settings - измененные данные
     */
    sendInput(settings) {
        if (JSON.stringify(settings) !== '{}') {
            globalEventBus.emit('request change settings', settings);
        }
    }

    /**
     * Показать изменения
     * @param {int} status - статус запроса
     */
    displayServerResponse(status) {
        if (status === OK) {
            globalRouter.pushState(PATHS.profile);
        } else {
            document.getElementById('settings-server-response').innerHTML = status;
        }
    }

    /**
     * Выход со страницы
     * @param {int} status - статус запроса
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }

    /**
     * Показать изменения аватара
     * @param {int} status - статус запроса
     */
    displayServerResponseAvatar(status) {
        if (status === OK) {
            this.render();
        } else {
            document.getElementById('settings-avatar-errors').innerHTML = status;
        }
    }
}
