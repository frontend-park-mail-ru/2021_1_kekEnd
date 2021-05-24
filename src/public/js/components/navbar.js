import {Component} from './component';
import {globalRouter} from 'utils/router';
import {PATHS} from 'utils/paths';
import {API} from 'utils/api';
import {OK_CODE} from 'utils/codes';
import {userMeta} from 'utils/userMeta';
import 'partials/navbar.tmpl';

/**
 * Компонента "Кнопка 'Выход'"
 */
export class Navbar extends Component {
    /**
     * Конструктор кнопки
     * @param {Object} parent - родитель кнопки
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        super(parent, state);
        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['navbar.hbs'];
        this.logoutClickedCallback = this.logoutClicked.bind(this);
    }

    /**
     * HTML-код компонента
     * @return {string} - html-код для вставки к родителю
     */
    tmpl() {
        return this.renderHBS(this.state);
    }

    /**
     * Установить листенеры компоненту
     */
    setEventListeners() {
        document.getElementById('logout-button')?.addEventListener('click', this.logoutClickedCallback);
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
    }

    /**
     * Обработка нажатия на логаут
     * @param {Object} e - событие нажатия
     */
    logoutClicked(e) {
        e.preventDefault();
        API.logout().then((res) => this.processLogout(res.status === OK_CODE));
    }

    /**
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (!status) {
            return;
        }
        userMeta.setAuthorized(false);
        userMeta.setUsername(null);

        const currentPath = globalRouter.currentPath;
        if (currentPath === PATHS.user || currentPath === PATHS.settings) {
            // если пользователь находился в профиле или настройках, надо выкинуть его на главную
            globalRouter.activate(PATHS.main);
        } else {
            // если пользователь находился на обычных страницах, перерендерить ее
            globalRouter.handlePath(currentPath, globalRouter.currentParameters);
        }
    }
}
