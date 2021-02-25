'use strict';

import appConfig from '../config/app_config.js';

export default class Router {
    constructor() {
        this.routes = new Map();
        this.currentController = null;
    }

    register(path, controller) {
        this.routes.set(path, controller);
    }

    start() {
        window.addEventListener('load', () => {
            const path = location.pathname;
            this.handlePath(path);
        });

        window.addEventListener('click', (event) => {
            const {target} = event;
            const section = target.dataset.section;
            if (section in appConfig) {
                event.preventDefault();
                this.pushState(appConfig[section].href);
            }
        });
    }

    pushState(url = '/', state = {}) {
        if (url !== location.pathname) {
            history.pushState(state, document.title, url);
        } else {
            history.replaceState(state, document.title, url);
        }

        this.handlePath(url);
    }

    handlePath(path) {
        this.currentController = this.routes.get(path);
        this.currentController.activate();
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
