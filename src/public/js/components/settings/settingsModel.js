import {globalEventBus} from '../../utils/eventbus.js';
import Api from "../../utils/api.js";


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
        this.api = new Api();
    }

    getSettingsData() {
        this.api.checkAuthentication()
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    this.api.getProfileData(res.data)
                        .then((res) => {
                            console.log(res.data);
                            globalEventBus.emit('set settings data', res.data);
                        });
                }
            });
    }

    changeSettings(settings) {
        this.api.editProfileData(settings)
            .then((res) => {
                console.log(res);
                if (res) {
                    globalEventBus.emit('response change settings', true);
                }
            });
    }
}

