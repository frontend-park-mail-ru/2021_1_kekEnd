import ProfileModel from './profileModel.js';
import ProfileView from './profileView.js';


/**
 * Контроллер страницы профиля
 */
export default class ProfileController {
    /**
     * Конструктор
     * @param {Element} parent - элемент для рендера
     */
    constructor(parent) {
        this.view = new ProfileView(parent);
        this.model = new ProfileModel();
    }
}
