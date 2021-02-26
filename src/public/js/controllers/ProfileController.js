import ProfileModel from '../models/ProfileModel.js';
import ProfileView from '../views/ProfileView.js';

export default class ProfileController {
    constructor(parent) {
        this.view = new ProfileView(parent);
        this.model = new ProfileModel();
    }
}
