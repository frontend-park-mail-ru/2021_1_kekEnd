import {globalEventBus} from '../../utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from '../../utils/busEvents';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';
import {Carousel} from '../../components/carousel';
import './profile.tmpl';

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
    }

    /**
     * Запуск рендера
     */
    render() {
        globalEventBus.emit(busEvents.GET_PROFILE_DATA);
    }

    /**
     * Установка данных профиля
     * @param {Object} data - данные профиля
     */
    setProfileData(data) {
        super.render(data);

        this.navbarRightComponent = new NavbarRight(document.getElementById('header'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarRightComponent.render();

        this.favoriteMoviesCarousel = new Carousel(document.getElementById('favorite-movies-carousel'),
            {'itemsType': 'movies', 'items': data.favorite_movies});
        this.favoriteMoviesCarousel.render();

        this.favoriteActorsCarousel = new Carousel(document.getElementById('favorite-actors-carousel'),
            {'itemsType': 'actors', 'items': data.favorite_actors});
        this.favoriteActorsCarousel.render();

        this.reviewsCarousel = new Carousel(document.getElementById('reviews-carousel'),
            {'itemsType': 'reviews', 'items': data.reviews});
        this.reviewsCarousel.render();

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
        this.navbarRightComponent.setEventListeners();
        this.favoriteMoviesCarousel.setEventListeners();
        this.favoriteActorsCarousel.setEventListeners();
        this.reviewsCarousel.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        this.navbarRightComponent.removeEventListeners();
        this.favoriteMoviesCarousel.removeEventListeners();
        this.favoriteActorsCarousel.removeEventListeners();
        this.reviewsCarousel.removeEventListeners();
    }
}
