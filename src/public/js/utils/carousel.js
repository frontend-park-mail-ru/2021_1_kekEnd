/**
 * Что происходит, когда пользовать прокручивает карусель
 * @param {Object} carousel - объект карусели
 * @param {Object} leftArrow - объект стрелки "назад"
 * @param {Object} rightArrow - объект стрелки "вперед"
 */
export const scrollCarousel = (carousel, leftArrow, rightArrow) => {
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
};
