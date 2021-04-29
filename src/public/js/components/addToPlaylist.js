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
        this.createPlaylistClickedCallback = this.createPlaylistClicked.bind(this);
        this.createPlaylistCallback = this.createPlaylist.bind(this);
        this.removeCreationCallback = this.removeCreationForm.bind(this);
        this.checkboxClickedCallback = this.checkboxClicked.bind(this);
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
            .removeEventListener('click', this.createPlaylistClickedCallback);
    }

    /**
     * Обработка нажатия на кнопку "Создать плейлист"
     */
    createPlaylistClicked() {
        document.getElementById('create-playlist-container')
            .classList.remove('create-playlist-container_hidden');
        document.getElementById('submit-create-playlist')
            .addEventListener('click', this.createPlaylistCallback);
        document.getElementById('cancel-create-playlist')
            .addEventListener('click', this.removeCreationCallback);
    }

    /**
     * Убрать форму создания плейлиста
     */
    removeCreationForm() {
        document.getElementById('create-playlist-container')
            .classList.add('create-playlist-container_hidden');
        document.getElementById('submit-create-playlist')
            .removeEventListener('click', this.createPlaylistCallback);
        document.getElementById('cancel-create-playlist')
            .removeEventListener('click', this.removeCreationCallback);
    }

    /**
     * Отобразить созданный плейлист в списке
     */
    createPlaylist() {

    }

    /**
     * Обработка нажатия на checkbox плейлиста
     * @param {Object} event - событие нажатия на checkbox
     */
    checkboxClicked(event) {

    }
}
