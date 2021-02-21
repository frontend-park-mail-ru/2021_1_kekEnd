import {ProfileController} from '../controllers/profile.js';


window.addEventListener('DOMContentLoaded', () => {
    const profileController = new ProfileController(router);

    profileController.view.render();
});