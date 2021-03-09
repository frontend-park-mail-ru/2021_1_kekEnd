import {globalEventBus} from '../../utils/eventbus.js';


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
    }

    getSettingsData() {
        const data = {
            username: 'SuperCruiser1337',
            email: 'tomcruise@mail.ru',
        };

        globalEventBus.emit('set settings data', data);
    }

    changeSettings(settings) {
        // ...
        globalEventBus.emit('response change settings', 'server response: new settings:' + JSON.stringify(settings));
    }
}

