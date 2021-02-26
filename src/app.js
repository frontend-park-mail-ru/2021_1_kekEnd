import {paths} from './public/js/config/paths.js';
import Router from './public/js/utils/router.js';
import ProfileView from './public/js/MVC/profile/profileView.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    router.register(paths['profile'], new ProfileView(application));

    router.start();
});
