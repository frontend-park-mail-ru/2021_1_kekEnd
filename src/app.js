import Router from './public/js/utils/router.js';
import ProfileController from './public/js/controllers/ProfileController.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    const router = new Router();
    // временно, пока не готовы главная страница и остальные контроллеры
    router.register('/', new ProfileController(application));

    router.start();
});
