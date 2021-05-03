import {Component} from './component';
import '../partials/carousel.tmpl';

const CAROUSEL_SCROLL_OFFSET = 50;

/**
 * Компонент "Карусель с горизонтальным скроллом"
 */
export class Carousel extends Component {
    /**
     * Конструктор компонента
     * @param {Object} parent - родитель компонента
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        super(parent, state);
        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['carousel.hbs'];

        this.carouselScrolledCallback = this.carouselScrolled.bind(this);
        this.leftArrowClickedCallback = this.leftArrowClicked.bind(this);
        this.rightArrowClickedCallback = this.rightArrowClicked.bind(this);
    }

    /**
     * Изменить элементы карусели
     * @param {Object} newItems - новые элементы
     */
    setItems(newItems) {
        this.state.items = {...newItems};
    }

    /**
     * HTML-код компонента
     * @return {string} - html-код
     */
    tmpl() {
        return this.renderHBS(this.state);
    }

    /**
     * Установить листенеры компоненту
     */
    setEventListeners() {
        if (this.parent === null) {
            return;
        }
        const element = this.parent.getElementsByClassName('main__slider')[0];
        const leftArrow = this.parent.getElementsByClassName('carousel-arrows__arrow_left')[0];
        const rightArrow = this.parent.getElementsByClassName('carousel-arrows__arrow_right')[0];
        if (element.offsetWidth === element.scrollWidth) {
            // все элементы целиком вмещаются, стрелки прокрутки не нужны
            rightArrow.classList.add('carousel-arrows__arrow_hidden');
        }
        element?.addEventListener('scroll', this.carouselScrolledCallback);
        leftArrow?.addEventListener('click', this.leftArrowClickedCallback);
        rightArrow?.addEventListener('click', this.rightArrowClickedCallback);
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        if (this.parent === null) {
            return;
        }
        const element = this.parent.getElementsByClassName('main__slider')[0];
        const leftArrow = this.parent.getElementsByClassName('carousel-arrows__arrow_left')[0];
        const rightArrow = this.parent.getElementsByClassName('carousel-arrows__arrow_right')[0];
        element?.removeEventListener('scroll', this.carouselScrolledCallback);
        leftArrow?.removeEventListener('click', this.leftArrowClickedCallback);
        rightArrow?.removeEventListener('click', this.rightArrowClickedCallback);
    }

    /**
     * Обработка нажатия на стрелку "назад" в карусели
     * @param {Object} event - событие клика
     */
    leftArrowClicked(event) {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft - carousel.offsetWidth + CAROUSEL_SCROLL_OFFSET,
            behavior: 'smooth'});
    }

    /**
     * Обработка нажатия на стрелку "вперед" в карусели
     * @param {Object} event - событие клика
     */
    rightArrowClicked(event) {
        const carousel = event.target.closest('.main__slider-wrapper').firstElementChild;
        carousel.scroll({left: carousel.scrollLeft + carousel.offsetWidth - CAROUSEL_SCROLL_OFFSET,
            behavior: 'smooth'});
    }

    /**
     * Обработка скролла в карусели
     * @param {Object} event - событие скролла
     */
    carouselScrolled(event) {
        const carousel = event.target;
        const leftArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_left')[0];
        const rightArrow = carousel.parentElement.getElementsByClassName('carousel-arrows__arrow_right')[0];
        this.scrollCarousel(carousel, leftArrow, rightArrow);
    }

    /**
     * Что происходит, когда пользовать прокручивает карусель
     * @param {Object} carousel - объект карусели
     * @param {Object} leftArrow - объект стрелки "назад"
     * @param {Object} rightArrow - объект стрелки "вперед"
     */
    scrollCarousel(carousel, leftArrow, rightArrow) {
        const arrowWidth = rightArrow.offsetWidth;
        const invisiblePartWidth = carousel.scrollWidth - carousel.offsetWidth;
        const carouselPosition = carousel.scrollLeft;
        const carouselEndOffset = invisiblePartWidth - arrowWidth;
        const hiddenClassName = 'carousel-arrows__arrow_hidden';

        if (carouselPosition <= arrowWidth) {
            leftArrow.classList.add(hiddenClassName);
            rightArrow.classList.remove(hiddenClassName);
            return;
        }
        if (carouselPosition < carouselEndOffset) {
            leftArrow.classList.remove(hiddenClassName);
            rightArrow.classList.remove(hiddenClassName);
            return;
        }
        if (carouselPosition >= carouselEndOffset) {
            leftArrow.classList.remove(hiddenClassName);
            rightArrow.classList.add(hiddenClassName);
        }
    }
}
