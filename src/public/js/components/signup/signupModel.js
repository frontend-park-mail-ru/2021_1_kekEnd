import {globalEventBus} from '../../utils/eventbus.js';
import Api from "../../utils/api.js";

export default class Model {
    constructor() {
        globalEventBus.on('signup clicked', this.createUser.bind(this));
        this.api = new Api()
    }

    userNotExists(data) {
        // запрос к серверу на проверку существования пользователя
        return true;
    }

    createUser(data) {
        if (this.userNotExists(data)) {
            this.api.signup(data)
                .then((res) => {
                    console.log(res);
                    globalEventBus.emit('signup status', true);
                });
        }
    }
}
