import {globalEventBus} from '../../utils/eventbus.js';


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('request change settings', this.changeSettings.bind(this));
        globalEventBus.on('get avatar url', this.getAvatarUrl.bind(this));
        globalEventBus.on('upload avatar', this.sendAvatar.bind(this));
    }

    getSettingsData() {
        const data = {
            username: 'SuperCruiser1337',
            fullname: 'Tom Cruise',
            email: 'tomcruise@mail.ru',
        };

        globalEventBus.emit('set settings data', data);
    }

    getAvatarUrl() {
        globalEventBus.emit('set avatar url', 'https://i.imgur.com/ZaZ7FP4.jpeg');
    }

    sendAvatar(avatar) {
        // ...
        globalEventBus.emit('response upload avatar', 'server response:' + avatar);
    }

    changeSettings(settings) {
        // ...
        globalEventBus.emit('response change settings', 'server response: new settings:' + JSON.stringify(settings));
    }
}

