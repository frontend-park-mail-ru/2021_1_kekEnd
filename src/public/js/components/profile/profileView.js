import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './profile.tmpl.js';


/**
 * Представление страницы профиля
 */
export default class ProfileView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['profile.hbs']);

        globalEventBus.on('set profile data', this.setProfileData.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit('get profile data');
    }

    /**
     * Очистисть страницу
     */
    hide() {
        this.parent.innerHTML = '';
        this.removeEventListeners();
    }

    /**
     * Переход на страницу настроек
     */
    redirectSettings() {
        globalRouter.pushState(PATHS.settings);
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.addEventListener('click', this.redirectSettings);

        const logoutButton = document.getElementById('logout-button');
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                globalEventBus.emit('logout clicked');
            });
        }
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.removeEventListener('click', this.redirectSettings);
    }

    /**
     * Установка данных профиля
     * @param {Object} data - данные профиля
     */
    setProfileData(data) {
        super.render(data);

        this.setEventListeners();
    }

    /**
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}
