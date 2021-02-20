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

    QUnit.test('Correct types', function (assert) {
        const bus = new EventBus();
       
        assert.throws(() => { bus.on(1337, () => {}); }, TypeError('event name must be a string'));
        assert.throws(() => { bus.on('sample', 1337); }, TypeError('event callback must be a function'));
        
        assert.throws(() => { bus.emit(1337); }, TypeError('event name must be a string'));
    });

});

