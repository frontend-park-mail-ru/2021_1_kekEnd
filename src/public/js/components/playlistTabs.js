import {Component} from './component';
import '../partials/playlistTabs.tmpl';
import '../partials/playlistTab.tmpl';

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
        // eslint-disable-next-line no-undef
        this.renderNewTabHBS = Handlebars.templates['playlistTab.hbs'];
        this.createPlaylistClickedCallback = this.createPlaylistClicked.bind(this);
        this.createPlaylistCallback = this.createPlaylist.bind(this);
        this.removeCreationCallback = this.removeCreationForm.bind(this);
        this.deleteMovieClickedCallback = this.deleteMovieClicked.bind(this);
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
        [...document.getElementsByClassName('tab__delete-button')]
            .forEach((el) => el.addEventListener('click', this.deleteMovieClickedCallback));
    }

    /**
     * Убрать листенеры компонента
     */
    removeEventListeners() {
        document.getElementById('create-playlist-button')
            .addEventListener('click', this.createPlaylistClickedCallback);
        [...document.getElementsByClassName('tab__delete-button')]
            .forEach((el) => el.removeEventListener('click', this.deleteMovieClickedCallback));
        // TODO: добавить
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
        const tabs = document.getElementById('tabs');
        const playlistName = document.getElementById('input-create-playlist').value;
        tabs.insertAdjacentHTML('beforeend', this.renderNewTabHBS({
            id: tabs.childElementCount + 1,
            playlistName: playlistName,
        }));
        this.removeCreationForm();
    }

    /**
     * Обработка нажатия на кнопку удаления фильма из плейлиста
     * @param {Object} event - событие нажатия на кнопку
     */
    deleteMovieClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        const button = event.target.parentElement;
        const movieId = button.getAttribute('data-movie-id');
        console.log(`delete movie ${movieId}`);
        button.closest('.tab__content-link').remove();
    }
}
