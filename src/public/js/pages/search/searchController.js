import SearchView from './searchView';
import SearchModel from './searchModel';

/**
 * Контроллер страницы поиска
 */
export default class SearchController {
    /**
     * Конструктор контроллера
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new SearchView(parent);
        this.model = new SearchModel();
    }
}
