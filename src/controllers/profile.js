import ProfileModel from '../models/profile.js';
import ProfileView from '../views/profile.js';


export default class ProfileController {
	constructor() {
		// this.eventBus = new EventBus()
		this.model = new ProfileModel() 
		this.view = new ProfileView()
	}
}
