import {setValidationResult} from '../../utils/setValidationResult.js';
import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import Validator from '../../utils/validation.js';
import './settings.tmpl.js';

export default class SettingsView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['settings.hbs']);

        this.settings = {};
        this.input = {};

        globalEventBus.on('set settings data', this.setSettings.bind(this));
        globalEventBus.on('response change settings', this.displayServerResponse.bind(this));
        globalEventBus.on('set avatar url', this.setAvatarUrl.bind(this));
        globalEventBus.on('response upload avatar', this.displayServerResponseAvatar.bind(this));
    }

    render() {
        globalEventBus.emit('get settings data');
        globalEventBus.emit('get avatar url');
    }

    setSettings(data) {
        this.settings = data;

        super.render(this.settings);

        this.setEventListeners();
    }

    setAvatarUrl(url) {
        document.getElementById('avatar-img').src = url;
    }

    hide() {
        this.removeEventListeners();
        this.parent.innerHTML = '';
    }

    setEventListeners() {
        document.getElementById('settings-save-button').addEventListener('click', this.saveClicked.bind(this));
        document.getElementById('avatar-upload-button').addEventListener('click', this.uploadAvatarClicked.bind(this));
    }

    removeEventListeners() {
        document.getElementById('settings-save-button').removeEventListener('click', this.saveAvatarClicked);
        document.getElementById('avatar-upload-button').removeEventListener('click', this.uploadAvatarClicked);
    }

    uploadAvatarClicked() {
        const selectedFile = document.getElementById('avatar').files[0];
        if (this.validateAvatar(selectedFile)) {
            globalEventBus.emit('upload avatar', selectedFile);
        }
    }

    saveClicked() {
        this.inputSettings();
        if (this.validateSettings()) {
            this.sendInput(this.deltaSettings());
        } else {
            document.getElementById('settings-server-response').innerHTML = '';
        }
        this.input = {};
    }

    deltaSettings() {
        const settings = {};
        if (this.settings.fullname !== this.input.fullname) {
            settings.fullname = this.input.fullname;
        }
        if (this.settings.email !== this.input.email) {
            settings.email = this.input.email;
        }
        if (this.input.password1.length !== 0) {
            settings.password = this.input.password1;
        }
        return settings;
    }

    inputSettings() {
        const fullname = document.getElementById('user-fullname').value;
        const email = document.getElementById('user-email').value;
        const password1 = document.getElementById('user-password').value;
        const password2 = document.getElementById('user-password-repeat').value;
        this.input = {
            fullname,
            email,
            password1,
            password2,
        };
    }

    validateSettings() {
        const validator = new Validator();

        const fullnameErrors = validator.validateFullname(this.input.fullname);
        const passwordErrors = validator.validatePassword(this.input.password1);
        const emailErrors = validator.validateEmail(this.input.email);

        if (this.input.password1 !== this.input.password2) {
            passwordErrors.push('passwords do not match');
        }
        if (this.input.password1.length === 0 && this.input.password2.length === 0) {
            passwordErrors.length = 0;
        }

        [
            [
                document.getElementById('user-fullname'),
                document.getElementById('settings-errors-fullname'),
                fullnameErrors,
            ],
            [
                document.getElementById('user-email'),
                document.getElementById('settings-errors-email'),
                emailErrors,
            ],
            [
                document.getElementById('user-password'),
                document.getElementById('settings-errors-password'),
                passwordErrors,
            ],
        ].forEach(([inputField, inputHint, errors]) => setValidationResult(inputField, inputHint, errors));

        return ([...fullnameErrors, ...passwordErrors, ...emailErrors].length === 0);
    }

    validateAvatar(avatar) {
        const validator = new Validator();

        const avatarErrors = validator.validateAvatar(avatar);

        document.getElementById('settings-avatar-errors').innerHTML = avatarErrors.join('<br>');

        [
            [
                document.getElementById('avatar'),
                document.getElementById('settings-avatar-errors'),
                avatarErrors,
            ],
        ].forEach(([inputField, inputHint, errors]) => setValidationResult(inputField, inputHint, errors));

        return (avatarErrors.length === 0);
    }


    sendInput(settings) {
        if (JSON.stringify(settings) !== '{}') {
            globalEventBus.emit('request change settings', settings);
        }
    }

    displayServerResponse(response) {
        document.getElementById('settings-server-response').innerHTML = response;
    }

    displayServerResponseAvatar(response) {
        document.getElementById('settings-avatar-errors').innerHTML = response;
    }
}

