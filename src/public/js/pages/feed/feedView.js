import BaseView from '../baseView';
import './feed.tmpl';
import {globalEventBus} from 'utils/eventbus';
import {busEvents} from 'utils/busEvents';
import {Navbar} from 'components/navbar';
import {userMeta} from 'utils/userMeta';

/**
 * Представление страницы "Лента"
 */
export default class FeedView extends BaseView {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['feed.hbs']);
        globalEventBus.on(busEvents.SET_FEED, this.setFeedData.bind(this));
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit(busEvents.GET_FEED);
    }

    /**
     * "Деструктор" страницы
     */
    hide() {
        super.hide(this);
    }

    /**
     * Установка данных ленты
     * @param {Object} data - данные ленты
     */
    setFeedData(data) {
        super.render(data);

        this.navbarComponent = new Navbar(document.getElementById('navbar'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarComponent.render();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        this.navbarComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        this.navbarComponent.removeEventListeners();
    }
}
