'use strict';
<<<<<<< HEAD:src/public/js/utils/eventbus.js

=======
>>>>>>> c3158fbdac54b0c61e8fc56ef9f76a6f098cbff9:public/js/source/eventbus.js

class EventBus {
    #callbacks;

    constructor() {
        this.#callbacks = {};
    }

    on(name, callback) {
        if (!(name in this.#callbacks)) {
            this.#callbacks[name] = [];
        }

        this.#callbacks[name].push(callback);

    }

    emit(name, args) {
        if (name in this.#callbacks) {
            this.#callbacks[name].forEach(callback => {
                try {
                    callback(args);
                } catch (error) {
                    console.error(error);
                }
            });
        }
    }
}


export const globalEventBus = new EventBus();
