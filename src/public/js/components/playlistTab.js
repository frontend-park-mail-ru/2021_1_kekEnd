import {Component} from './component';
import '../partials/playlistTab.tmpl';

/**
 * Компонент "Плейлист"
 */
export class PlaylistTab extends Component {
    /**
     * Конструктор компонента
     * @param {Object} parent - родитель компонента
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        super(parent, state);
        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['playlistTab.hbs'];
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
        console.log('setting listeners');
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        console.log('removing listeners');
    }
}
