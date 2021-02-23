import ProfileModel from '../models/profile.js';
import ProfileView from '../views/profile.js';


export default class ProfileController {
    constructor(app) {
        this.view = new ProfileView(app);
        this.model = new ProfileModel();
    }
}
