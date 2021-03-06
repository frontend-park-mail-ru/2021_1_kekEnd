import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import './profile.tmpl.js';

export default class ProfileView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['profile.hbs']);

        this.data = {};

        globalEventBus.on('set profile data', this.setProfileData.bind(this));
    }

    render() {
        globalEventBus.emit('get profile data');

        super.render(this.data);

        this.setEventListeners();
    }

    hide() {
        this.parent.innerHTML = '';
        this.removeEventListeners();
    }

    testFunction() {
        alert('123');
    }

    setEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.addEventListener('click', this.testFunction);
    }

    removeEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.removeEventListener('click', this.testFunction);
    }

    setProfileData(data) {
        this.data = data;
    }
}
