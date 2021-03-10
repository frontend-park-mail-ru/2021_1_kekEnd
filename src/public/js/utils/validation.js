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

    validateFullname(fullname) {
        const error = [];

        if (fullname.length === 0) {
            error.push('should not be empty');
        }

        return error;
    }

    validateAvatar(avatar) {
        const error = [];

        if (!avatar) {
            error.push('should not be empty');
            return error;
        }

        if (!(['image/png', 'image/jpeg'].includes(avatar.type))) {
            error.push('wrong file type');
        }

        if (!(avatar.size <= 5242880)) {
            error.push('file size exceeds 5MB');
        }

        return error;
    }
}

