import {globalEventBus} from '../../utils/eventbus.js';


export default class SettingsModel {
    constructor() {
        globalEventBus.on('get settings data', this.getSettingsData.bind(this));
        globalEventBus.on('send new settings', this.changeSettings.bind(this));
    }

    getSettingsData() {
        const data = {
            username: 'SuperCruiser1337',
            fullname: 'Tom Cruise',
            email: 'tomcruise@mail.ru'
        };

        globalEventBus.emit('set settings data', data);
    }

    changeSettings(settings) {
        
    }


    changeFullname(fullname) {

    }

    changeEmail() {

    }

    changePassword() {

    }

}

