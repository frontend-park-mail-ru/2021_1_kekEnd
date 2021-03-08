'use strict';

export default class Validator {
    validateEmail(email) {
        const error = [];

        if (!(/@/.test(email))) {
            error.push('incorrect email');
        }

        return error;
    }

    validateLogin(login) {
        const error = [];

        if (!(login.length >= 6 && login.length <= 20)) {
            error.push('should be from 6 to 20 characters long');
        }
        if (!(/^[a-zA-Z0-9_]*$/.test(login))) {
            error.push('should contain only latin letters, numbers and underscores');
        }

        return error;
    }

    validatePassword(password) {
        const error = [];

        if (!(password.length >= 8 && password.length <= 32)) {
            error.push('should be from 8 to 32 characters long');
        }
        if (!(/\d/.test(password))) {
            error.push('should contain at least one digit');
        }
        if (!(/[a-zA-Z]/.test(password))) {
            error.push('should contain at least one letter');
        }

        return error;
    }
}

