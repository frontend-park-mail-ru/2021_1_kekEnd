'use struct';

class EventBus {
    #callbacks;

    constructor() {
        this.#callbacks = {};
    }

    on(name, callback) {
        if (typeof name !== 'string') {
            throw new TypeError('event name must be a string');
        }
        if (typeof callback !== 'function') {
            throw new TypeError('event callback must be a function');
        }

        if (!(name in this.#callbacks)) {
            this.#callbacks[name] = [];
        }

        this.#callbacks[name].push(callback);

    }

    emit(name) {
        if (typeof name !== 'string') {
            throw new TypeError('event name must be a string');
        }
        
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

