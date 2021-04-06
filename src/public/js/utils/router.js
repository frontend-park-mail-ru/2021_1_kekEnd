// 'use strict';
//
// import {PATHS} from './paths.js';
// import {findAscendingTag} from './findAscendingTag.js';
//
// export class Router {
//     constructor() {
//         this.routes = new Map();
//     }
//
//     register(path, view) {
//         this.routes.set(path, view);
//     }
//
//     start() {
//         window.addEventListener('load', () => {
//             this.activate(this.addTrailingSlash(location.pathname) + location.search);
//         });
//
//         window.addEventListener('popstate', () => {
//             this.activate(this.addTrailingSlash(location.pathname) + location.pathname);
//         });
//
//         window.addEventListener('click', (event) => {
//             const {target} = event;
//             const link = findAscendingTag(target, 'A');
//             const href = (link !== null) ? link.href : null;
//             this.activate(href, event);
//         });
//     }
//
//     activate(path, event=null) {
//         if (path === null) {
//             return;
//         }
//
//         for (const i in PATHS) {
//             if (path.includes(PATHS[i])) {
//                 event?.preventDefault();
//                 const params = path.substring(path.indexOf(PATHS[i]) + PATHS[i].length + 1);
//                 this.pushState(PATHS[i], {}, params);
//                 return;
//             }
//         }
//     };
//
//     pushState(path = '/', state = {}, parameters = '') {
//         let newPath = path;
//         if (parameters) {
//             newPath = `${path}/${parameters}`;
//         }
//         if (newPath !== window.location.pathname) {
//             history.pushState(state, document.title, newPath);
//         }
//
//         this.handlePath(path, parameters);
//     }
//
//     handlePath(path, parameters = '') {
//         this.routes.get(path).render(parameters);
//     }
//
//     back() {
//         window.history.back();
//     }
//
//     forward() {
//         window.history.forward();
//     }
//
//     addTrailingSlash = (path) => (path.substr(-1) !== '/') ? path + '/' : path;
// }
//
// export const globalRouter = new Router();
//

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
            this.activate(location.pathname);
        });

        window.addEventListener('popstate', () => {
            this.activate(location.pathname);
        });

        window.addEventListener('click', (event) => {
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
                this.pushState(PATHS[i], {}, params);
                return;
            }
        }
    };

    pushState(path = '/', state = {}, parameters = '') {
        let newPath = path;
        if (location.search) {
            parameters += (location.pathname.slice(-1) === '/') ? location.search : '/' + location.search;
        }
        if (parameters) {
            newPath = `${path}/${parameters}`;
        }
        if (newPath !== window.location.pathname) {
            history.pushState(state, document.title, newPath);
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
