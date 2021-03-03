import {globalEventBus} from '../../utils/eventbus.js';

export default class Model {
    checkIfExists() {
        // запрос к серверу на проверку существования пользователя
        const signupSuccess = true;

        globalEventBus.emit('signup attempt', signupSuccess);
    }
}
