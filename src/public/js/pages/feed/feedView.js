import BaseView from '../baseView';
import './feed.tmpl';
import {globalEventBus} from '../../utils/eventbus';
import {busEvents} from '../../utils/busEvents';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';

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

        this.navbarRightComponent = new NavbarRight(document.getElementById('header'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarRightComponent.render();
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        console.log('setting listeners');
        this.navbarRightComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        console.log('removing listeners');
        this.navbarRightComponent.removeEventListeners();
    }
}
