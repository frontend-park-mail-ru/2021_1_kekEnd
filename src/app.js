import {PATHS} from './public/js/utils/paths.js';
import Router from './public/js/utils/router.js';
import ProfileView from './public/js/components/profile/profileView.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    router.register(PATHS.profile, new ProfileView(application));

    router.start();
});
