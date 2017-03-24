var expect = require('expect.js'),
    sdk = require('../../lib/index.js'),

    Event = sdk.Event,
    Script = sdk.Script;

/* global describe, it */
describe('Event', function () {
    var rawEvent = {
        listen: 'test',
        id: 'my-global-script-1',
        script: {
            type: 'text/javascript',
            exec: 'console.log("hello");'
        }
    };

    describe('json representation', function () {
        it('must match what the event was initialized with', function () {
            var event = new Event(rawEvent),
                jsonified = event.toJSON();

            expect(jsonified.listen).to.eql(event.listen);
            // Script property checking is done independently
            expect(jsonified).to.have.property('script');
        });
    });

    describe('udpate', function () {
        var script = 'console.log("This is a test log");';

        it('must work with script instance definitions', function () {
            var eventObj = new Event(rawEvent);

            eventObj.update({ script: new Script({ exec: script }) });
            expect(eventObj.toJSON().script.exec).to.eql([script]);
        });

        it('must work with script strings', function () {
            var eventObj = new Event(rawEvent);

            eventObj.update({ script: script });
            expect(eventObj.toJSON().script.exec).to.eql([script]);
        });

        it('must work with script arrays', function () {
            var eventObj = new Event(rawEvent);

            eventObj.update({ script: [script] });
            expect(eventObj.toJSON().script.exec).to.eql([script]);
        });

        it('must correctly handle invalid/undefined script input', function () {
            var eventObj = new Event(rawEvent);

            eventObj.update();
            expect(eventObj.toJSON().script.exec).to.eql([rawEvent.script.exec]);
        });
    });
});
