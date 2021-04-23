import {PATHS} from './public/js/utils/paths';
import {globalRouter} from './public/js/utils/router';
import ProfileController from './public/js/components/profile/profileController';
import LoginController from './public/js/components/login/loginController';
import SignupController from './public/js/components/signup/signupController';
import MovieController from './public/js/components/movie/movieController';
import ActorController from './public/js/components/actor/actorController';
import SettingsController from './public/js/components/settings/settingsController';
import {registerHandlebarsHelpers} from './public/js/utils/handlebarsHelpers';
import MainController from './public/js/components/main/mainController';
import MoviesListController from './public/js/components/moviesList/moviesListController';
import './public/js/components/popup/popup';
import './public/scss/compound.scss';


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '/'})
        .then((registration) => {
            console.log('sw registration on scope:', registration.scope);
        })
        .catch((err) => {
            console.error(err);
        });
}


window.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('app');

    registerHandlebarsHelpers();

    globalRouter.register(PATHS.main, new MainController(application).view);
    globalRouter.register(PATHS.movies, new MoviesListController(application).view);
    globalRouter.register(PATHS.profile, new ProfileController(application).view);
    globalRouter.register(PATHS.login, new LoginController(application).view);
    globalRouter.register(PATHS.signup, new SignupController(application).view);
    globalRouter.register(PATHS.movie, new MovieController(application).view);
    globalRouter.register(PATHS.actor, new ActorController(application).view);
    globalRouter.register(PATHS.settings, new SettingsController(application).view);

    globalRouter.start();
});
