'use strict';

QUnit.module('EventBus test', function () {
	

    QUnit.test('Add single callback and call it', function (assert) {
        const bus = new EventBus();
        let a = 0;
        bus.on('sample', () => { a = a + 1; });
        bus.emit('sample');
		
        assert.strictEqual(a, 1);
	});

	QUnit.test('Add multiple callbacks and call them', function (assert) {
        const bus = new EventBus();
        let a = 0;
        let b = 0;
        bus.on('sample', () => { a = a + 1; });
        bus.on('sample', () => { b = b + 1337; });
        bus.emit('sample');
		
        assert.strictEqual(a, 1);
        assert.strictEqual(b, 1337);
	});

    QUnit.test('Callbacks are independant', function (assert) {
        const bus = new EventBus();
        let a = 0;
        bus.on('sample', () => { a = 1; });
        bus.on('sample', () => { a = 2; throw new Error('sample error'); });
        bus.on('sample', () => { a = 3; });
        bus.emit('sample');

        assert.strictEqual(a, 3);
    });

});

