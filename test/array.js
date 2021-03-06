"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const inject = require("../lib/inject");
let should = chai.should();
describe('Property Array', function () {
    describe('inject array of objects', function () {
        let injector;
        beforeEach(function () {
            injector = inject.createContainer();
            let Rectangle = class {
                constructor() {
                }
                getNames() {
                    let name = "";
                    this.objects.forEach(function (object) {
                        name += object.name;
                    });
                    return name;
                }
            };
            class FooManager {
                constructor() {
                    this.name = 'foo';
                }
            }
            class BarManager {
                constructor() {
                    this.name = 'bar';
                }
            }
            injector.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: false,
                    properties: [
                        {
                            name: 'objects',
                            array: [
                                { ref: 'fooManager' },
                                { ref: 'barManager' }
                            ]
                        }
                    ]
                },
                fooManager: {
                    type: FooManager,
                    singleton: true
                },
                barManager: {
                    type: BarManager,
                    singleton: true
                }
            });
            injector.initialize();
        });
        it('should inject to object runtime and ref objects', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.objects);
            rectangle.objects.should.be.an.instanceOf(Array);
            rectangle.objects.should.have.length(2);
            rectangle.getNames().should.equal('foobar');
        });
    });
    describe('inject array of objects linq', function () {
        let injector;
        beforeEach(function () {
            class Rectangle {
                constructor() {
                }
                getNames() {
                    let name = "";
                    this.objects.forEach(function (object) {
                        name += object.name;
                    });
                    return name;
                }
            }
            class FooManager {
                constructor() {
                    this.name = 'foo';
                }
            }
            class BarManager {
                constructor() {
                    this.name = 'bar';
                }
            }
            injector = inject.createContainer();
            injector.define('rectangle', Rectangle)
                .injectArray('objects', [{ ref: 'fooManager' }, { ref: 'barManager' }])
                .define('fooManager', FooManager).singleton()
                .define('barManager', BarManager).singleton();
            injector.initialize();
        });
        it('should inject to object runtime and ref objects', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.objects);
            rectangle.objects.should.be.an.instanceOf(Array);
            rectangle.objects.should.have.length(2);
            rectangle.getNames().should.equal('foobar');
        });
    });
});
//# sourceMappingURL=array.js.map