import Router from './public/js/utils/router.js';
import {AppConfig} from './public/js/config/app_config.js';
import ProfileView from './public/js/views/ProfileView.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    router.register(AppConfig['profile'].href, new ProfileView(application));

    router.start();
});
