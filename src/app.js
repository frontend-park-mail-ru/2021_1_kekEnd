import {PATHS} from './public/js/utils/paths.js';
import {globalRouter} from './public/js/utils/router.js';
import ProfileController from './public/js/components/profile/profileController.js';
import LoginController from './public/js/components/login/loginController.js';
import SignupController from './public/js/components/signup/signupController.js';
import MovieController from './public/js/components/movie/movieController.js';
import SettingsController from './public/js/components/settings/settingsController.js';

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    globalRouter.register(PATHS.profile, new ProfileController(application).view);
    globalRouter.register(PATHS.login, new LoginController(application).view);
    globalRouter.register(PATHS.signup, new SignupController(application).view);
    globalRouter.register(PATHS.movie, new MovieController(application).view);
    globalRouter.register(PATHS.settings, new SettingsController(application).view);

    globalRouter.start();
});

