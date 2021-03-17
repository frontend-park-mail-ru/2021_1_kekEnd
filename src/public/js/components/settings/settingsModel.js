import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {OK_CODE} from '../../utils/codes.js';


/**
 *  Модель страницы настроек профиля
 */
export default class SettingsModel {
    /**
     * Конструктор
     */
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
        globalEventBus.on('upload avatar', this.sendAvatar.bind(this));
    }

    /**
     * Получение данных для страницы настроек
     */
    getSettingsData() {
        API.getUser()
            .then((res) => {
                if (res.status === OK_CODE) {
                    globalEventBus.emit('set settings data', {'isAuthorized': true, ...res.data});
                } else {
                    globalRouter.pushState(PATHS.login);
                }
            });
    }

    /**
     * Отправка аватара
     * @param {string} avatar - путь к фото
     */
    sendAvatar(avatar) {
        const formData = new FormData();
        formData.append('file', avatar);
        API.uploadAvatar(formData)
            .then((res) => {
                globalEventBus.emit('avatar uploaded', res.status);
            });
    }

    /**
     * Изменение настроек
     * @param {Object} settings - измененные данные
     */
    changeSettings(settings) {
        API.editUser(settings)
            .then((res) => {
                if (res) {
                    globalEventBus.emit('response change settings', res.status);
                }
            });
    }

    /**
     * Выход со страницы
     */
    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit('logout status', res.status === OK_CODE);
            });
    }
}
