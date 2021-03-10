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
                if (res.data) {
                    globalEventBus.emit('set settings data', {'isAuthorized': true,
                        ...res.data, 'avatar': 'https://i.imgur.com/ZaZ7FP4.jpeg'});
                } else {
                    globalRouter.pushState(PATHS.login);
                }
            });
    }

    sendAvatar(avatar) {
        // ...
        globalEventBus.emit('response upload avatar', 'server response:' + avatar);
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

