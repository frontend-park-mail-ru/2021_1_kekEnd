'use strict';

import {appConfig} from '../config/app_config.js';

export default class Router {
    constructor() {
        this.routes = new Map();
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

    pushState(path = '/', state = {}) {
        if (path !== location.pathname) {
            history.pushState(state, document.title, path);
        } else {
            history.replaceState(state, document.title, path);
        }

        this.handlePath(path);
    }

    handlePath(path) {
        this.routes.get(path).activate();
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
