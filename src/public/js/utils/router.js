'use strict';

import {PATHS} from './paths.js';
import {findAscendingTag} from './findAscendingTag.js';

export class Router {
    constructor() {
        this.routes = new Map();
    }

    register(path, view) {
        this.routes.set(path, view);
    }

    start() {
        window.addEventListener('load', () => {
            const path = location.pathname;
            this.searchForParams(path);
        });

        window.addEventListener('popstate', (event) => {
            const path = event.target.location.pathname;
            event.preventDefault();
            this.searchForParams(path);
        });

        window.addEventListener('click', (event) => {
            const {target} = event;
            const link = findAscendingTag(target, 'A');
            const path = (link !== null) ? link.href : null;

            event.preventDefault();
            this.searchForParams(path);
        });
    }

    searchForParams(path) {
        for (const i in PATHS) {
            if (path !== null && path.includes(PATHS[i])) {
                const parameters = path.substring(path.indexOf(PATHS[i]) + 1).substring(PATHS[i].length);
                this.pushState(PATHS[i], {}, parameters);
                break;
            }
        }
    }

    pushState(path = '/', state = {}, parameters = '') {
        let newState, newPath;
        if (parameters) {
            newState = `${state}/${parameters}`;
            newPath = `${path}/${parameters}`;
        } else {
            newState = state;
            newPath = path;
        }
        if (path !== location.pathname) {
            history.pushState(newState, document.title, newPath);
        } else {
            history.replaceState(newState, document.title, newPath);
        }

        this.handlePath(path, parameters);
    }

    handlePath(path, parameters = '') {
        this.routes.get(path).render(parameters);
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

export const globalRouter = new Router();

