import MainModel from './mainModel.js';
import MainView from './mainView.js';

/**
 * Контроллер главной страницы
 */
export default class MainController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new MainView(parent);
        this.model = new MainModel();
    }
}
