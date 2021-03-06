import {globalEventBus} from '../../utils/eventbus.js';

export default class Model {
    constructor() {
        globalEventBus.on('signup clicked', this.checkIfExists.bind(this));
    }

    checkIfExists(data) {
        // запрос к серверу на проверку существования пользователя
        const signupSuccess = true;

        globalEventBus.emit('signup status', signupSuccess);
    }
}
