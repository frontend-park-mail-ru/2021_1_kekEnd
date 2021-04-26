import {Component} from './component';
import '../partials/addToPlaylistWidget.tmpl';

/**
 * Компонент "Добавить в плейлист"
 */
export class AddToPlaylistWidget extends Component {
    /**
     * Конструктор компонента
     * @param {Object} parent - родитель компонента
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        super(parent, state);
        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['addToPlaylistWidget.hbs'];
    }

    /**
     * HTML-код компонента
     * @return {string} - html-код
     */
    tmpl() {
        return this.renderHBS(this.state);
    }
}
