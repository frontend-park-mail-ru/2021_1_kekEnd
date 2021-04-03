import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './profile.tmpl.js';
import {busEvents} from '../../utils/busEvents.js';


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

        globalEventBus.on(busEvents.SET_PROFILE_DATA, this.setProfileData.bind(this));
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout.bind(this));

        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit(busEvents.GET_PROFILE_DATA);
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
        document.getElementById('logout-button')?.addEventListener('click', this.logoutClickedCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
    }

    logoutClicked() {
        globalEventBus.emit(busEvents.LOGOUT_CLICKED);
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
