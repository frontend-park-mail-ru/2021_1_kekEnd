import {globalEventBus} from '../../utils/eventbus';
import {globalRouter} from '../../utils/router';
import {PATHS} from '../../utils/paths';
import BaseView from '../baseView';
import {busEvents} from '../../utils/busEvents';
import './actor.tmpl';

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

        globalEventBus.on(busEvents.SET_ACTOR_DATA, this.setActorDataCallback);
        globalEventBus.on(busEvents.LOGOUT_STATUS, this.processLogout);
    }

    /**
     * Запуск рендера
     * @param {int} id - id актера
     */
    render(id) {
        globalEventBus.emit(busEvents.GET_ACTOR_DATA, id);
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        super.hide(this);
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
        globalEventBus.emit(busEvents.LIKE_ACTOR);
    }

    /**
     * Обработка нажатия на логаут
     * @param {Object} e - событие нажатия
     */
    logoutClicked(e) {
        e.preventDefault();
        globalEventBus.emit(busEvents.LOGOUT_CLICKED);
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

