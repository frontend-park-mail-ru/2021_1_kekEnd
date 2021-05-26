import {globalEventBus} from 'utils/eventbus';
import {busEvents} from 'utils/busEvents';
import './popup.tmpl';


/**
 * Попап уведомление
 */
export default class PopUp {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.parent = parent;

        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['popup.hbs'];

        globalEventBus.on(busEvents.SHOW_POPUP, this.render.bind(this));

        this.popUpHideCallback = this.popUpHide.bind(this);
    }

    /**
     * Установка колбеков
     */
    setEventListeners() {
        document.getElementById('popup-msg').addEventListener('click', this.popUpHideCallback);
    }

    /**
     * Запуск рендера
     * @param {Object} data - описание для попапа
     */
    render(data) {
        if (document.getElementById('popup-msg')) {
            return;
        }

        this.parent.insertAdjacentHTML('beforeend', this.renderHBS(data));
        this.setEventListeners();
    }

    /**
     * Скрыть попап уведомление
     */
    popUpHide() {
        const elem = document.getElementById('popup-msg');
        elem.parentNode.removeChild(elem);
    }
}

export const popup = new PopUp(document.getElementById('app'));
