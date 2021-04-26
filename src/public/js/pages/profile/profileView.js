import {globalEventBus} from '../../utils/eventbus';
import BaseView from '../baseView';
import './profile.tmpl';
import {busEvents} from '../../utils/busEvents';
import {scrollCarousel} from '../../utils/carousel';
import {NavbarRight} from '../../components/navbarRight';
import {userMeta} from '../../utils/userMeta';


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

        this.carouselScrolledCallback = this.carouselScrolled.bind(this);
        this.leftArrowClickedCallback = this.leftArrowClicked.bind(this);
        this.rightArrowClickedCallback = this.rightArrowClicked.bind(this);
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
        [...document.getElementsByClassName('main__slider')]
            .forEach((element) => {
                const leftArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
                const rightArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
                if (element.offsetWidth === element.scrollWidth) {
                    // все элементы целиком вмещаются, стрелки прокрутки не нужны
                    rightArrow.classList.add('carousel-arrows__arrow_hidden');
                }
                element.addEventListener('scroll', this.carouselScrolledCallback);
                leftArrow.addEventListener('click', this.leftArrowClickedCallback);
                rightArrow.addEventListener('click', this.rightArrowClickedCallback);
            });

        this.navbarRightComponent.setEventListeners();
    }

    /**
     * Удаление колбеков
     */
    removeEventListeners() {
        [...document.getElementsByClassName('main__slider')]
            .forEach((element) => {
                const leftArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
                const rightArrow = element.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
                element.removeEventListener('scroll', this.carouselScrolledCallback);
                leftArrow.removeEventListener('click', this.leftArrowClickedCallback);
                rightArrow.removeEventListener('click', this.rightArrowClickedCallback);
            });

        this.navbarRightComponent.removeEventListeners();
    }

    /**
     * Обработка нажатия на стрелку "назад" в карусели
     * @param {Object} event - событие клика
     */
    leftArrowClicked = (event) => {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft - carousel.offsetWidth + 50, behavior: 'smooth'});
    }

    /**
     * Обработка нажатия на стрелку "вперед" в карусели
     * @param {Object} event - событие клика
     */
    rightArrowClicked = (event) => {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft + carousel.offsetWidth - 50, behavior: 'smooth'});
    }

    /**
     * Обработка скролла в карусели
     * @param {Object} event - событие скролла
     */
    carouselScrolled = (event) => {
        const carousel = event.target;
        const leftArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
        const rightArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
        scrollCarousel(carousel, leftArrow, rightArrow);
    }
}
