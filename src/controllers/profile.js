import {ProfileModel} from '../models/profile.js';
import {ProfileView} from '../views/profile.js';


class ProfileController {
	constructor() {
		// this.eventBus = new EventBus()
		this.model = new ProfileModel() 
		this.view = new ProfileView()
	}
}
