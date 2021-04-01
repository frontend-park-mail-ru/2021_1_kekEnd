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
        const activate = (href, event=null) => {
            const [path, params] = this.searchForParams(href, event);
            this.pushState(path, {}, params);
        };

        window.addEventListener('load', (event) => {
            activate(location.pathname, event);
        });

        window.addEventListener('popstate', () => {
            activate(location.pathname);
        });

        window.addEventListener('click', (event) => {
            const {target} = event;
            const link = findAscendingTag(target, 'A');
            const href = (link !== null) ? link.href : null;
            activate(href, event);
        });
    }

    searchForParams(path, event = null) {
        if (path === null) {
            return;
        }
        for (const i in PATHS) {
            if (path.includes(PATHS[i])) {
                console.log('path[i]:', PATHS[i]);
                event?.preventDefault();
                return [PATHS[i], path.substring(path.lastIndexOf('/') + 1)];
            }
        }
    }

    pushState(path = '/', state = {}, parameters = '') {
        let newState;
        let newPath;
        if (parameters) {
            newState = `${state}/${parameters}`;
            newPath = `${path}/${parameters}`;
        } else {
            newState = state;
            newPath = path;
        }
        console.log(path, location.pathname);
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

