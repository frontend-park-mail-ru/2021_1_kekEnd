import Router from './public/js/utils/router.js';
import {appConfig} from './public/js/config/app_config.js';
import ProfileController from './public/js/controllers/ProfileController.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    router.register(appConfig['profile'].href, new ProfileController(application));

    router.start();
});
