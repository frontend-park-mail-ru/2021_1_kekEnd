import {Component} from './component';
import '../partials/addToPlaylistWidget.tmpl';
import '../partials/playlistRow.tmpl';

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
        // eslint-disable-next-line no-undef
        this.renderPlaylistRowHBS = Handlebars.templates['playlistRow.hbs'];
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
        [...document.getElementsByClassName('add-to-playlist-widget__checkbox')]
            .forEach((el) => el.addEventListener('click', this.checkboxClickedCallback));
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        document.getElementById('create-playlist-button')
            .removeEventListener('click', this.createPlaylistClickedCallback);
        [...document.getElementsByClassName('add-to-playlist-widget__checkbox')]
            .forEach((el) => el.removeEventListener('click', this.checkboxClickedCallback));
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
     * @param {Object} event - событие нажатия
     */
    createPlaylist(event) {
        const playlistName = event.target.parentElement.previousElementSibling.value;
        const playlists = document.getElementById('playlists-list');
        const newId = playlists.childElementCount + 1;
        playlists.insertAdjacentHTML('beforeend', this.renderPlaylistRowHBS({
            id: newId,
            playlistName: playlistName,
            isAdded: false,
            movieId: this.state.movieId,
        }));
        const newCheckbox = document.getElementById(`checkbox-${newId}`);
        newCheckbox.addEventListener('click', this.checkboxClickedCallback);
        this.removeCreationForm();
    }

    /**
     * Обработка нажатия на checkbox плейлиста
     * @param {Object} event - событие нажатия на checkbox
     */
    checkboxClicked(event) {
        const checkbox = event.target;
        const label = checkbox.previousElementSibling;
        // const playlistId = label.getAttribute('data-playlist-id');
        const playlistName = label.textContent.trim();
        const movieId = checkbox.getAttribute('data-movie-id');
        if (checkbox.checked) {
            console.log(`adding ${movieId} to playlist ${playlistName}`);
        } else {
            console.log(`deleting ${movieId} from playlist ${playlistName}`);
        }
    }
}
