import ProfileController from './public/js/controllers/profile.js';


window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');
    const profileController = new ProfileController(application);

    profileController.view.render();
});
