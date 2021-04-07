'use strict';

import {PATHS} from './paths.js';
import {findAscendingTag} from './findAscendingTag.js';

/**
 * Роутер
 */
export class Router {
    /**
     * Конструктор - создание роутов
     */
    constructor() {
        this.routes = new Map();
    }

    /**
     * Добавление нового роута
     * @param {string} path - путь
     * @param {Object} view - объект представления с методом render()
     */
    register(path, view) {
        this.routes.set(path, view);
    }

    /**
     * Запуск роутера
     */
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

    /**
     * Поиск пути и выделение параметров из url
     * @param {string|null} path - путь
     * @param {Object} event - событие, порожденное кликом
     */
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
    }

    /**
     * Формирование пути в адресной строке и history.pushState()
     * @param {string} path - путь
     * @param {Object} state - объект состояния
     * @param {string} parameters - параметры пути
     */
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

    /**
     * Запусг рендера предаствления по пути
     * @param {string} path - путь
     * @param {string} parameters - параметры пути
     */
    handlePath(path, parameters = '') {
        this.routes.get(path).render(parameters);
    }

    /**
     * Переход на предыдущую страницу
     */
    back() {
        window.history.back();
    }

    /**
     * Переход на следующую страницу
     */
    forward() {
        window.history.forward();
    }
}

export const globalRouter = new Router();
