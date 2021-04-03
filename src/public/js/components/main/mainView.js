import {globalEventBus} from '../../utils/eventbus.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import BaseView from '../baseView.js';
import './main.tmpl.js';

export default class MainView extends BaseView {
    constructor(parent) {
        super(parent, Handlebars.templates['main.hbs']);

        globalEventBus.on('set main page data', this.setMainPageData.bind(this));
        globalEventBus.on('logout status', this.processLogout.bind(this));
    }

    render() {
        globalEventBus.emit('get main page data');
    }

    hide() {
        this.parent.innerHTML = '';
        // this.removeEventListeners();
    }

    setMainPageData(data) {
        console.log(data);
        super.render(data);

        // this.setEventListeners();
    }

    /**
     * Выход со страницы
     * @param {boolean} status - статус запроса на выход
     */
    processLogout(status) {
        if (status) {
            globalRouter.pushState(PATHS.login);
        }
    }
}
