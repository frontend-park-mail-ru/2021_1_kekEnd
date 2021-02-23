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
