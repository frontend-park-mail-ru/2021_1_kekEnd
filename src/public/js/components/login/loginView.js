import {globalEventBus} from '../../utils/eventbus.js';
import BaseView from '../baseView.js';
import {globalRouter} from '../../utils/router.js';
import {PATHS} from '../../utils/paths.js';
import {getFormValues} from '../../utils/formDataWork.js';
import './login.tmpl.js';
import {OK} from "../../utils/codes.js";


export default class LoginView extends BaseView {
    constructor(parent) {
        // eslint-disable-next-line no-undef
        super(parent, Handlebars.templates['login.hbs']);

        globalEventBus.on('login status', this.processLoginAttempt.bind(this));
    }

    render() {
        super.render();
        this.setEventListeners();
    }

    setEventListeners() {
        const form = document.getElementById('login');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = getFormValues(form);

            globalEventBus.emit('login clicked', data);
        });
    }

    processLoginAttempt(status) {
        if (status === OK) {
            globalRouter.pushState(PATHS.profile);
        } else {
            const errors = {
                400: 'Ошибка в формате ввода',
                401: 'Неверный логин/пароль',
                500: 'Ошибка сервера'
            }
            document.getElementById('send-form-hint').innerText = errors[status];
        }
    }
}
