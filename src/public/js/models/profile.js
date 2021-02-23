import {globalEventBus} from '../utils/eventbus.js';


export default class ProfileModel {
	constructor() {
		globalEventBus.on('get profile data', this.getProfileData.bind(this));
	}

	getProfileData() {
		const data = {fullname:"Tom Cruise", email:"tomcruise@mail.ru",
					  watchedMoviesCnt:123, reviewsCnt:10};

		globalEventBus.emit('set profile data', data);
	}

}
