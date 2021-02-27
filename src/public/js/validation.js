'use strict';

class Validator {

    validateEmail(email) {
        let error = [];

        // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
        const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        
        if (!(re.test(email))) {
            error.push('incorrect email');
        }

        return error;
    }

    validateLogin(login) {
        let error = [];

        if (!(login.length >= 6 && login.length <= 12)) {
            error.push('should be from 6 to 20 characters long')
        }
        if (!(/^[a-zA-z0-9_]*$/.test(login))) {
            error.push('should contain only latin letters, numbers and underscores');
        }

        return error;
    }

    validatePassword(password) {
        let error = [];
        
        if (!(password.length >= 8 && password.length <= 32)) {
            error.push('should be from 8 to 32 characters long')
        }
        if (!(/.*\d.*/.test(password))) {
            error.push('should contain at least one digit');
        }
        if (!(/.*[A-Z].*/.test(password))) {
            error.push('should contain at least one uppercase character');
        }
        if (!(/.*[a-z].*/.test(password))) {
            error.push('should contain at least one lowercase character');
        }
        if (!(/.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~].*/.test(password))) {
            error.push('should contain at least one special symbol');
        }

        return error;
    }

}

