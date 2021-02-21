'use struct';

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

    emit(name) {
        if (name in this.#callbacks) {
            this.#callbacks[name].forEach(callback => {
                try {
                    callback();
                } catch (error) {
                    console.error(error);
                }
            });
        }

    }

}

