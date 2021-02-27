'use strict';

QUnit.module('Validation test', function () {

    
    QUnit.test('email validation', function(assert) {
        const validator = new Validator();
        
        assert.deepEqual(validator.validateEmail('example@'), [
            'incorrect email'
        ]);
        assert.deepEqual(validator.validateEmail('example@example.com'), []);
    });

    QUnit.test('login validation', function (assert) {
	    const validator = new Validator();

        assert.deepEqual(validator.validateLogin('grillow!'), [
            'should contain only latin letters, numbers and underscores'
        ]);
        assert.deepEqual(validator.validateLogin('grillow rules!'), [
            'should be from 6 to 20 characters long',
            'should contain only latin letters, numbers and underscores'
        ]);
        assert.deepEqual(validator.validateLogin('admin'), [
            'should be from 6 to 20 characters long'
        ]);
        assert.deepEqual(validator.validatePassword('XxX_AAAAAAAAAAAAAAAAAAAA_XxX'), [
            'should contain at least one digit'
        ]);
        assert.deepEqual(validator.validatePassword('grillow1337'), [
            'should contain at least one uppercase character',
            'should contain at least one special symbol'
        ]);
        assert.deepEqual(validator.validatePassword('XxX_grillow1337_XxX'), []);
    });


    QUnit.test('password validation', function (assert) {
	    const validator = new Validator();

        assert.deepEqual(validator.validatePassword('qwerty'), [
            'should be from 8 to 32 characters long',
            'should contain at least one digit',
            'should contain at least one uppercase character',
            'should contain at least one special symbol'
        ]);
        assert.deepEqual(validator.validatePassword('qwerty123'), [
            'should contain at least one uppercase character',
            'should contain at least one special symbol'
        ]);
        assert.deepEqual(validator.validatePassword('Qwerty123'), [
            'should contain at least one special symbol'
        ]);
        assert.deepEqual(validator.validatePassword('Qwerty123_'), []);
    });

});

