import SettingsModel from './settingsModel.js';
import SettingsView from './settingsView.js';

export default class SettingsController {
    constructor(parent) {
        this.view = new SettingsView(parent);
        this.model = new SettingsModel();
    }
}

