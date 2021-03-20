import ActorModel from './actorModel.js';
import ActorView from './actorView.js';


/**
 * Контроллер страницы актера
 */
export default class ActorController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new ActorView(parent);
        this.model = new ActorModel();
    }
}

