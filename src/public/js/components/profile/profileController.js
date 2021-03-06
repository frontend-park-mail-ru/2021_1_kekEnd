import ProfileModel from './profileModel.js';
import ProfileView from './profileView.js';


export default class ProfileController {
    constructor(parent) {
        this.view = new ProfileView(parent);
        this.model = new ProfileModel();
    }
}
