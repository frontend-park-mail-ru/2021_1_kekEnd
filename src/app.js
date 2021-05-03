import {PATHS} from 'utils/paths';
import {globalRouter} from 'utils/router';
import ProfileController from './public/js/pages/profile/profileController';
import LoginController from './public/js/pages/login/loginController';
import SignupController from './public/js/pages/signup/signupController';
import MovieController from './public/js/pages/movie/movieController';
import ActorController from './public/js/pages/actor/actorController';
import SettingsController from './public/js/pages/settings/settingsController';
import {registerHandlebarsHelpers} from 'utils/handlebarsHelpers';
import MainController from './public/js/pages/main/mainController';
import MoviesListController from './public/js/pages/moviesList/moviesListController';
import './public/js/pages/popup/popup';
import './public/scss/compound.scss';
import {userMeta} from 'utils/userMeta';


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '/'})
        .then((registration) => {
            console.log('sw registration on scope:', registration.scope);
        })
        .catch((err) => {
            console.error(err);
        });
}


window.addEventListener('DOMContentLoaded', async () => {
    const application = document.getElementById('app');

    await userMeta.initMeta();

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
