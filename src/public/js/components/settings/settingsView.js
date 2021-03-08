import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import Validator from '../../utils/validation.js';
import './settings.tmpl.js';

export default class SettingsView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['settings.hbs']);

        globalEventBus.on('set settings data', this.setSettingsData.bind(this));
    }

    render() {
        globalEventBus.emit('get settings data');
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        document.getElementById('settings-save-button').addEventListener('click', this.sendData);
    }

    removeEventListeners() {
        document.getElementById('settings-save-button').removeEventListener('click', this.sendData);
    }

    setSettingsData(data) {
        super.render(data);

        this.setEventListeners();
    }


    sendData() {
        const fullname = document.getElementById('user-fullname').value;
        const email  = document.getElementById('user-email').value;
        const password1  = document.getElementById('user-password').value;
        const password2  = document.getElementById('user-password-repeat').value;


        const validator = new Validator();
        const passwordErrors = validator.validatePassword(password1);
        const emailErrors = validator.validateEmail(email);
        //const fullnameErrors = validator.validateFullname(fullname);
        const fullnameErrors = [];

        if (password1 !== password2) {
            passwordErrors.push('passwords do not match');
        }

        const errors = [].concat(passwordErrors, emailErrors, fullnameErrors);

        if (errors.length === 0) {
            console.log('no errors');
            document.getElementById('settings-errors').innerHTML = '';
            globalEventBus.emit('send new settings');
        } else {
            console.log(errors.join('\n'));
            document.getElementById('settings-errors').innerHTML = errors.join('<br>');
        }
    }

}

