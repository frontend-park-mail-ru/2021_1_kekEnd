import {Component} from './component';
import '../partials/playlistTabs.tmpl';

/**
 * Компонент "Плейлист"
 */
export class PlaylistTabs extends Component {
    /**
     * Конструктор компонента
     * @param {Object} parent - родитель компонента
     * @param {Object} state - перечиление полей-состояний компонента
     */
    constructor(parent, state) {
        super(parent, state);
        // eslint-disable-next-line no-undef
        this.renderHBS = Handlebars.templates['playlistTabs.hbs'];
        this.createPlaylistClickedCallback = this.createPlaylistClicked.bind(this);
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
        document.getElementById('create-playlist-button')
            .addEventListener('click', this.createPlaylistClickedCallback);
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        document.getElementById('create-playlist-button')
            .addEventListener('click', this.createPlaylistClickedCallback);
    }

    /**
     * Обработка нажатия на кнопку "Создать плейлист"
     */
    createPlaylistClicked() {
        console.log('creating playlist');
    }
}
