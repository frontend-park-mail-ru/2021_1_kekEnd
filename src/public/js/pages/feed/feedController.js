import FeedView from './feedView';
import FeedModel from './feedModel';

/**
 * Контроллер страницы "Лента"
 */
export default class FeedController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new FeedView(parent);
        this.model = new FeedModel();
    }
}
