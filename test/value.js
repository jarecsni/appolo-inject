"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let should = require('chai').should(), inject = require('../lib/inject');
describe('Property Value', function () {
    describe('inject value to object', function () {
        let injector;
        beforeEach(function () {
            injector = inject.createContainer();
            class Rectangle {
                constructor() {
                    this.number = Math.random();
                }
                area() {
                    return this.size;
                }
            }
            injector.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: true,
                    properties: [{
                            name: 'size',
                            value: 25
                        }]
                }
            });
            injector.initialize();
        });
        it('should have the injected value', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.size);
            rectangle.area().should.equal(25);
        });
    });
    describe('inject value to object linq', function () {
        let injector;
        it('should have the injected value', function () {
            injector = inject.createContainer();
            class Rectangle {
                constructor() {
                    this.number = Math.random();
                }
                area() {
                    return this.size;
                }
            }
            injector.define('rectangle', Rectangle).singleton().injectValue('size', 25);
            injector.initialize();
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.size);
            rectangle.area().should.equal(25);
        });
    });
});
//# sourceMappingURL=value.js.map