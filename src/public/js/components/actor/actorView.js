import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './actor.tmpl.js';

/**
 * Представление страницы актера
 */
export default class ActorView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['actor.hbs']);

        this.logoutClickedCallback = this.logoutClicked.bind(this);
        this.setActorDataCallback = this.setActorDataCallback.bind(this);
        this.addToFavoritesCallback = this.addToFavoritesCallback.bind(this);
        this.processLogout = this.processLogout.bind(this);

        globalEventBus.on('set actor data', this.setActorDataCallback);
        globalEventBus.on('logout status', this.processLogout);
    }

    /**
     * Запуск рендера
     * @param {int} id - id актера
     */
    render(id) {
        globalEventBus.emit('get actor data', id);
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
        document.getElementById('actor-button-like').addEventListener('click', this.addToFavoritesCallback);
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('logout-button')?.removeEventListener('click', this.logoutClickedCallback);
        document.getElementById('actor-button-like')
            .removeEventListener('click', this.addToFavoritesCallback);
    }

    /**
     * Установка данных об актере
     * @param {Object} data - данные актера
     */
    setActorDataCallback(data) {
        super.render(data);

        this.setEventListeners();
    }

    /**
     * Обработчик нажатия на кнопку добавления актера в избранное
     */
    addToFavoritesCallback() {
        globalEventBus.emit('add actor to favorites');
    }

    /**
     * Обработка нажатия на логаут
     * @param {Object} e - событие нажатия
     */
    logoutClicked(e) {
        e.preventDefault();
        globalEventBus.emit('logout clicked');
    }

    /**
     * Выход со страницы
     * @param {int} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}

