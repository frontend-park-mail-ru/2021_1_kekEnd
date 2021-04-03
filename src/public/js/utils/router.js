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
            console.log("LOAD");
            this.activate(location.pathname);
        });

        window.addEventListener('popstate', () => {
            console.log("POPSTATE");
            this.activate(location.pathname);
        });

        window.addEventListener('click', (event) => {
            console.log("CLICK");
            const {target} = event;
            const link = findAscendingTag(target, 'A');
            const href = (link !== null) ? link.href : null;
            this.activate(href, event);
        });
    }

    activate(path, event=null) {
        if (path === null) {
            return;
        }

        for (const i in PATHS) {
            if (path.includes(PATHS[i])) {
                event?.preventDefault();
                const params = path.substring(path.indexOf(PATHS[i]) + PATHS[i].length + 1);
                console.log('pushing', PATHS[i], 'with params:', params);
                this.pushState(PATHS[i], {}, params);
                return;
            }
        }
    };

    pushState(path = '/', state = {}, parameters = '') {
        let newPath = path;
        if (parameters) {
            newPath = `${path}/${parameters}`;
        }
        if (path !== location.pathname) {
            history.pushState(state, document.title, newPath);
        } else {
            history.replaceState(state, document.title, newPath);
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

