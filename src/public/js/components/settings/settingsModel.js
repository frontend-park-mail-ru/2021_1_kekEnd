import {globalEventBus} from '../../utils/eventbus.js';
import {API} from '../../utils/api.js';
import {globalRouter} from "../../utils/router.js";
import {PATHS} from "../../utils/paths.js";


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
    }

    getSettingsData() {
        API.getUser()
            .then((res) => {
                if (res.data) {
                    globalEventBus.emit('set settings data', {...res.data, 'isAuthorized': true});
                } else {
                    globalRouter.pushState(PATHS.login);
                }
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
}

