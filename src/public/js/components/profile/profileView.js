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
        globalEventBus.on('logout status', this.processLogout.bind(this));
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

        const logoutButton = document.getElementById('logout-button');
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                globalEventBus.emit('logout clicked');
            });
        }
    }

    removeEventListeners() {
        const button = document.getElementById('button-profile-settings');
        button.removeEventListener('click', this.redirectSettings);
    }

    setProfileData(data) {
        console.log(data);
        super.render(data);

        this.setEventListeners();
    }

    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}

