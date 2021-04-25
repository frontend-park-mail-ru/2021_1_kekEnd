import MoviesListModel from './moviesListModel';
import MoviesListView from './moviesListView';

/**
 * Контроллер страницы списка фильмов
 */
export default class MoviesListController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new MoviesListView(parent);
        this.model = new MoviesListModel();
    }
}
