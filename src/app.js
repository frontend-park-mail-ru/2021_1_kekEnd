import ProfileController from './controllers/profile.js';


window.addEventListener('DOMContentLoaded', () => {
    const profileController = new ProfileController();

    profileController.view.render();
});