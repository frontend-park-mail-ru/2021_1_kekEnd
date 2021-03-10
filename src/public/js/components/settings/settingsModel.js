import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {globalRouter} from "../../utils/router.js";
import {PATHS} from "../../utils/paths.js";
import {OK} from "../../utils/codes.js";


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
        globalEventBus.on('logout clicked', this.logout.bind(this));
        globalEventBus.on('upload avatar', this.sendAvatar.bind(this));
    }

    getSettingsData() {
        API.getUser()
            .then((res) => {
                if (res.status === OK) {
                    globalEventBus.emit('set settings data', {'isAuthorized': true, ...res.data});
                } else {
                    globalRouter.pushState(PATHS.login);
                }
            });
    }

    sendAvatar(avatar) {
        const formData = new FormData();
        formData.append('file', avatar);
        API.uploadAvatar(formData)
            .then((res) => {
                globalEventBus.emit('avatar uploaded', res.status);
            });
    }

    changeSettings(settings) {
        API.editUser(settings)
            .then((res) => {
                if (res) {
                    globalEventBus.emit('response change settings', true);
                }
            });
    }

    logout() {
        API.logout()
            .then((res) => {
                globalEventBus.emit('logout status', res.status === OK)
            });
    }
}

