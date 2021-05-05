import {globalEventBus} from 'utils/eventbus';
import BaseView from '../baseView';
import {busEvents} from 'utils/busEvents';
import {Navbar} from 'components/navbar';
import {userMeta} from 'utils/userMeta';
import {Carousel} from 'components/carousel';
import {PlaylistTabs} from 'components/playlistTabs';
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
        globalEventBus.on(busEvents.FOLLOW_STATUS, this.proceedFollow.bind(this));

        this.followClickedCallback = this.followClicked.bind(this);
    }

    /**
     * Запуск рендера
     * @param {string} username - имя пользователя
     */
    render(username) {
        globalEventBus.emit(busEvents.GET_PROFILE_DATA, username);
    }

    /**
     * Установка данных профиля
     * @param {Object} data - данные профиля
     */
    setProfileData(data) {
        this.username = data.username;
        super.render(data);

        this.navbarComponent = new Navbar(document.getElementById('navbar'),
            {'authorized': userMeta.getAuthorized()});
        this.navbarComponent.render();

        // this.favoriteMoviesCarousel = new Carousel(document.getElementById('favorite-movies-carousel'),
        //     {'itemsType': 'movies', 'items': data.favorite_movies});
        // this.favoriteMoviesCarousel.render();

        this.favoriteActorsCarousel = new Carousel(document.getElementById('favorite-actors-carousel'),
            {'itemsType': 'actors', 'items': data.favorite_actors});
        this.favoriteActorsCarousel.render();

        this.reviewsCarousel = new Carousel(document.getElementById('reviews-carousel'),
            {'itemsType': 'reviews', 'items': data.reviews});
        this.reviewsCarousel.render();

        this.playlistTabs = new PlaylistTabs(document.getElementById('accordion-container'), {
            playlists: data.playlists,
            username: this.username,
        });
        this.playlistTabs.render();

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
        document.getElementById('follow-button')?.addEventListener('click', this.followClickedCallback);
        this.navbarComponent.setEventListeners();
        // this.favoriteMoviesCarousel.setEventListeners();
        this.favoriteActorsCarousel.setEventListeners();
        this.reviewsCarousel.setEventListeners();
        this.playlistTabs.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        document.getElementById('follow-button')?.removeEventListener('click', this.followClickedCallback);
        this.navbarComponent.removeEventListeners();
        // this.favoriteMoviesCarousel.removeEventListeners();
        this.favoriteActorsCarousel.removeEventListeners();
        this.reviewsCarousel.removeEventListeners();
        this.playlistTabs.removeEventListeners();
    }

    /**
     * Обработка нажатия на "Подписаться"
     */
    followClicked() {
        const checkbox = document.getElementById('follow');
        globalEventBus.emit(busEvents.FOLLOW_CLICKED, this.username, !checkbox.checked);
    }

    /**
     * Обработка результата подписки/отписки
     * @param {boolean} status - статус запроса
     * @param {boolean} isFollowing - это было подписка или отписка
     */
    proceedFollow(status, isFollowing) {
        if (status) {
            const button = document.getElementById('follow-button');
            const followersText = document.getElementById('followers-number');
            if (isFollowing) {
                button.textContent = 'Отписаться';
                followersText.textContent = parseInt(followersText.textContent) + 1 + '';
                return;
            }
            button.textContent = 'Подписаться';
            followersText.textContent = parseInt(followersText.textContent) - 1 + '';
        }
    }
}
