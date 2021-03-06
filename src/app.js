import {PATHS} from './public/js/utils/paths.js';
import Router from './public/js/utils/router.js';
import ProfileController from './public/js/components/profile/profileController.js';


window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    router.register(PATHS.profile, new ProfileController(application).view);

    router.start();
});
