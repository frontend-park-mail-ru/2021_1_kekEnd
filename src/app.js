import {PATHS} from './public/js/utils/paths.js';
import {globalRouter} from './public/js/utils/router.js';
import ProfileController from './public/js/components/profile/profileController.js';
import LoginController from './public/js/components/login/loginController.js';
import SignupController from './public/js/components/signup/signupController.js';
import MovieController from './public/js/components/movie/movieController.js';
import SettingsController from './public/js/components/settings/settingsController.js';
import {registerHandlebarsHelpers} from './public/js/utils/handlebarsHelpers.js';
import MainController from './public/js/components/main/mainController.js';
import MoviesListController from './public/js/components/moviesList/moviesListController.js';
import './public/js/components/partials/navbar.tmpl.js';
import './public/js/components/partials/top_login_signup.tmpl.js';

// eslint-disable-next-line no-undef
Handlebars.registerPartial('navbar', Handlebars.templates['navbar.hbs']);
// eslint-disable-next-line no-undef
Handlebars.registerPartial('top_login_signup', Handlebars.templates['top_login_signup.hbs']);

window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    registerHandlebarsHelpers();

    globalRouter.register(PATHS.main, new MainController(application).view);
    globalRouter.register(PATHS.movies, new MoviesListController(application).view);
    globalRouter.register(PATHS.profile, new ProfileController(application).view);
    globalRouter.register(PATHS.login, new LoginController(application).view);
    globalRouter.register(PATHS.signup, new SignupController(application).view);
    globalRouter.register(PATHS.movie, new MovieController(application).view);
    globalRouter.register(PATHS.settings, new SettingsController(application).view);

    globalRouter.start();
});
