import MovieModel from './movieModel';
import MovieView from './movieView';


/**
 * Контроллер страницы фильма
 */
export default class MovieController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new MovieView(parent);
        this.model = new MovieModel();
    }
}
