'use strict';

import {paths} from '../config/paths.js';

export default class Router {
    constructor() {
        this.routes = new Map();
    }

    register(path, view) {
        this.routes.set(path, view);
    }

    start() {
        window.addEventListener('load', () => {
            const path = location.pathname;
            this.handlePath(path);
        });

        window.addEventListener('click', (event) => {
            const {target} = event;
            const section = target.dataset.section;
            if (section in paths) {
                event.preventDefault();
                this.pushState(paths[section]);
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
        this.routes.get(path).render();
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}
