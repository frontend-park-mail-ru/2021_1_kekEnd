import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './profile.tmpl.js';

export default class ProfileView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['profile.hbs']);

        globalEventBus.on('set profile data', this.setProfileData.bind(this));
    }

    render() {
        globalEventBus.emit('get profile data');
    }

    hide() {
        this.parent.innerHTML = '';
        this.removeEventListeners();
    }

    redirectSettings() {
        globalRouter.pushState(PATHS.settings);
    }

    setEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.addEventListener('click', this.redirectSettings);
    }

    removeEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.removeEventListener('click', this.redirectSettings);
    }

    setProfileData(data) {
        super.render(data);

        this.setEventListeners();
    }
}

