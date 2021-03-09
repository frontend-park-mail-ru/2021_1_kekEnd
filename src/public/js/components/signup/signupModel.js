import {globalEventBus} from '../../utils/eventbus.js';
import {api} from "../../utils/api.js";

export default class Model {
    constructor() {
        globalEventBus.on('signup clicked', this.createUser.bind(this));
    }

    userNotExists(data) {
        // запрос к серверу на проверку существования пользователя
        return true;
    }

    createUser(data) {
        if (this.userNotExists(data)) {
            api.signup(data)
                .then((res) => {
                    console.log(res);
                    globalEventBus.emit('signup status', true);
                });
        }
    }
}
