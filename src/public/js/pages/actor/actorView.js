import {globalEventBus} from 'utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from 'utils/busEvents';
import './actor.tmpl';
import {Navbar} from 'components/navbar';
import {userMeta} from 'utils/userMeta';

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

        this.setActorDataCallback = this.setActorDataCallback.bind(this);
        this.likeActorCallback = this.likeActor.bind(this);

        globalEventBus.on(busEvents.SET_ACTOR_DATA, this.setActorDataCallback.bind(this));
        globalEventBus.on(busEvents.LIKE_ACTOR_STATUS, this.processLikeActor.bind(this));
    }

    /**
     * Запуск рендера
     * @param {int} id - id актера
     */
    render(id) {
        globalEventBus.emit(busEvents.GET_ACTOR_DATA, id);
    }

    /**
     * Установка данных об актере
     * @param {Object} data - данные актера
     */
    setActorDataCallback(data) {
        super.render(data);

        this.isLiked = data.is_liked;
        this.navbarComponent = new Navbar(document.getElementById('navbar'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarComponent.render();

        this.setEventListeners();
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
        document.getElementById('actor-button-like')?.addEventListener('click', this.likeActorCallback);

        this.navbarComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('actor-button-like')?.removeEventListener('click', this.likeActorCallback);

        this.navbarComponent.removeEventListeners();
    }

    /**
     * Обработчик нажатия на кнопку добавления актера в избранное
     * @param {Object} event - событие нажатия на кнопку
     */
    likeActor(event) {
        const actorId = event.target.getAttribute('data-actor-id');
        if (this.isLiked) {
            globalEventBus.emit(busEvents.UNLIKE_ACTOR, actorId);
            return;
        }
        globalEventBus.emit(busEvents.LIKE_ACTOR, actorId);
    }

    /**
     * Отобразить результат лайка актера
     * @param {boolean} status - успешность лайка
     */
    processLikeActor(status) {
        if (status) {
            this.isLiked = !this.isLiked;
            if (this.isLiked) {
                document.getElementById('actor-button-like').textContent = 'Убрать из избранного';
                return;
            }
            document.getElementById('actor-button-like').textContent = 'В избранное';
        }
    }
}

