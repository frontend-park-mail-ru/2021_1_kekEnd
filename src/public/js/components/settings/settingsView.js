import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import Validator from '../../utils/validation.js';
import './settings.tmpl.js';

export default class SettingsView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['settings.hbs']);

        this.settings = {};

        globalEventBus.on('set settings data', this.setSettings.bind(this));
        globalEventBus.on('response change settings', this.displayServerResponse.bind(this));
    }

    render() {
        globalEventBus.emit('get settings data');
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        document.getElementById('settings-save-button').addEventListener('click', this.sendSettings.bind(this));
    }

    removeEventListeners() {
        document.getElementById('settings-save-button').removeEventListener('click', this.sendSettings.bind(this));
    }

    setSettings(data) {
        this.settings = data;

        super.render(this.settings);

        this.setEventListeners();
    }


    sendSettings() {
        const fullname = document.getElementById('user-fullname').value;
        const email = document.getElementById('user-email').value;
        const password1 = document.getElementById('user-password').value;
        const password2 = document.getElementById('user-password-repeat').value;


        const validator = new Validator();

        const fullnameErrors = validator.validateFullname(fullname);
        const passwordErrors = validator.validatePassword(password1);
        const emailErrors = validator.validateEmail(email);

        if (password1 !== password2) {
            passwordErrors.push('passwords do not match');
        }
        if (password1.length === 0 && password2.length === 0) {
            passwordErrors.length = 0;
        }

        document.getElementById('settings-errors-fullname').innerHTML = fullnameErrors.join('<br>');
        document.getElementById('settings-errors-email').innerHTML = emailErrors.join('<br>');
        document.getElementById('settings-errors-password').innerHTML = passwordErrors.join('<br>');

        const newSettings = {};
        if (this.settings.fullname !== fullname && fullnameErrors.length === 0) {
            newSettings.fullname = fullname;
        }
        if (this.settings.email !== email && emailErrors.length === 0) {
            newSettings.email = email;
        }
        if (password1.length !== 0 && passwordErrors.length === 0) {
            newSettings.password = password1;
        }

        if (JSON.stringify(newSettings) !== '{}') {
            globalEventBus.emit('request change settings', newSettings);
        }
    }

    displayServerResponse(response) {
        document.getElementById('settings-errors').innerHTML = response;
    }
}

