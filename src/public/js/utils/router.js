'use strict';

import {PATHS} from './paths.js';
import {findAscendingTag} from './findAscendingTag.js';

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
            const link = findAscendingTag(target, 'A');
            const path = (link !== null) ? link.href : null;

            if (path in PATHS) {
                event.preventDefault();
                this.pushState(PATHS.path);
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