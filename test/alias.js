"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const inject = require("../lib/inject");
let should = chai.should();
describe('Alias', function () {
    describe('should inject alias', function () {
        let injector, CalcManager;
        beforeEach(function () {
            injector = inject.createContainer();
            let Rectangle = class {
                constructor() {
                }
            };
            CalcManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
            };
            injector.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: true,
                    props: [
                        {
                            name: 'calcable',
                            alias: 'calcable'
                        }
                    ]
                },
                calcManager: {
                    type: CalcManager,
                    alias: ['calcable'],
                    singleton: true
                }
            });
            injector.initialize();
        });
        it('should inject property ', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.calcable);
            rectangle.calcable.should.be.an.instanceOf(Array);
            rectangle.calcable.length.should.be.equal(1);
            rectangle.calcable[0].should.be.an.instanceOf(CalcManager);
            rectangle.calcable[0].calc.should.be.a.Function;
        });
        it('should getAlias', function () {
            let calcable = injector.getAlias('calcable');
            should.exist(calcable);
            calcable.should.be.an.instanceOf(Array);
            calcable.length.should.be.equal(1);
            calcable[0].should.be.an.instanceOf(CalcManager);
            calcable[0].calc.should.be.a.Function;
        });
        it('should getAlias dict', function () {
            let injector2 = inject.createContainer();
            class Rectangle {
                constructor() {
                }
            }
            class CalcManager {
                constructor() {
                    this.NAME = "aaa";
                }
                calc() {
                    return 25;
                }
            }
            injector2.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: true,
                    props: [
                        {
                            name: 'testables',
                            alias: 'testable',
                            indexBy: "NAME"
                        }
                    ]
                },
                calcManager: {
                    type: CalcManager,
                    alias: ['testable'],
                    singleton: true
                }
            });
            injector2.initialize();
            let rectangle = injector2.getObject('rectangle');
            should.exist(rectangle);
            should.exist(rectangle.testables.aaa);
            rectangle.testables.aaa.calc().should.be.eq(25);
        });
        it('should getAlias return empty array if not found', function () {
            let calcable = injector.getAlias('calcable2');
            should.exist(calcable);
            calcable.should.be.an.instanceOf(Array);
            calcable.length.should.be.equal(0);
        });
    });
    describe('should inject multi alias', function () {
        let injector, CalcManager, FooManager;
        beforeEach(function () {
            injector = inject.createContainer();
            let Rectangle = class {
                constructor() {
                }
            };
            CalcManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
            };
            FooManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
                cleanable() {
                }
            };
            injector.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: false,
                    props: [
                        {
                            name: 'calcable',
                            alias: 'calcable'
                        },
                        {
                            name: 'cleanable',
                            alias: 'cleanable'
                        }
                    ]
                },
                calcManager: {
                    type: CalcManager,
                    alias: ['calcable'],
                    singleton: true
                },
                fooManager: {
                    type: FooManager,
                    alias: ['calcable', 'cleanable'],
                    singleton: true
                },
                barManager: {
                    type: CalcManager,
                    alias: ['calcable'],
                    singleton: true
                }
            });
            injector.initialize();
        });
        it('should inject property ', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.calcable);
            should.exist(rectangle.cleanable);
            rectangle.calcable.should.be.an.instanceOf(Array);
            rectangle.cleanable.should.be.an.instanceOf(Array);
            rectangle.calcable.length.should.be.equal(3);
            rectangle.cleanable.length.should.be.equal(1);
        });
    });
    describe('should inject multi alias by class type', function () {
        let injector, CalcManager, FooManager;
        beforeEach(function () {
            injector = inject.createContainer();
            let Cleanable = class {
                constructor() {
                }
            };
            let Rectangle = class {
                constructor() {
                }
            };
            CalcManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
            };
            FooManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
                cleanable() {
                }
            };
            injector.addDefinitions({
                rectangle: {
                    type: Rectangle,
                    singleton: false,
                    props: [
                        {
                            name: 'calcable',
                            alias: 'calcable'
                        },
                        {
                            name: 'cleanable',
                            alias: Cleanable
                        }
                    ]
                },
                calcManager: {
                    type: CalcManager,
                    alias: ['calcable'],
                    singleton: true
                },
                fooManager: {
                    type: FooManager,
                    alias: ['calcable', Cleanable],
                    singleton: true
                },
                barManager: {
                    type: CalcManager,
                    alias: ['calcable'],
                    singleton: true
                }
            });
            injector.initialize();
        });
        it('should inject property ', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.calcable);
            should.exist(rectangle.cleanable);
            rectangle.calcable.should.be.an.instanceOf(Array);
            rectangle.cleanable.should.be.an.instanceOf(Array);
            rectangle.calcable.length.should.be.equal(3);
            rectangle.cleanable.length.should.be.equal(1);
        });
    });
    describe('should inject multi alias by class type linq', function () {
        let injector, CalcManager, FooManager, Rectangle, Cleanable;
        beforeEach(function () {
            injector = inject.createContainer();
            Cleanable = class {
                constructor() {
                }
            };
            Rectangle = class {
                constructor() {
                }
            };
            CalcManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
            };
            FooManager = class {
                constructor() {
                }
                calc() {
                    return 25;
                }
                cleanable() {
                }
            };
            injector.define('rectangle', Rectangle).singleton().injectAlias('calcable', 'calcable').injectAlias('cleanable', Cleanable)
                .define('calcManager', CalcManager).alias('calcable').singleton()
                .define('fooManager', FooManager).alias(['calcable', Cleanable]).singleton()
                .define('barManager', CalcManager).alias(['calcable']).singleton();
            injector.initialize();
        });
        it('should inject property ', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.calcable);
            should.exist(rectangle.cleanable);
            rectangle.calcable.should.be.an.instanceOf(Array);
            rectangle.cleanable.should.be.an.instanceOf(Array);
            rectangle.calcable.length.should.be.equal(3);
            rectangle.cleanable.length.should.be.equal(1);
        });
    });
    describe('should inject multi alias by class type linq indexBy', function () {
        let injector, CalcManager, FooManager, Cleanable, Rectangle;
        beforeEach(function () {
            injector = inject.createContainer();
            Cleanable = class {
                constructor() {
                    this.NAME = "cc";
                }
            };
            Rectangle = class {
                constructor() {
                }
            };
            CalcManager = class {
                constructor() {
                    this.NAME = "bb";
                }
                calc() {
                    return 25;
                }
            };
            FooManager = class {
                constructor() {
                    this.NAME = "aa";
                }
                calc() {
                    return 25;
                }
                cleanable() {
                }
            };
            injector.define('rectangle', Rectangle).singleton().injectAlias('calcable', 'calcable', "NAME").injectAlias('cleanable', Cleanable, "NAME")
                .define('calcManager', CalcManager).alias('calcable').singleton()
                .define('fooManager', FooManager).alias(['calcable', Cleanable]).singleton()
                .define('barManager', CalcManager).alias(['calcable']).singleton();
            injector.initialize();
        });
        it('should inject property ', function () {
            let rectangle = injector.getObject('rectangle');
            should.exist(rectangle.calcable);
            should.exist(rectangle.cleanable);
            rectangle.calcable.should.be.an.instanceOf(Object);
            rectangle.cleanable.should.be.an.instanceOf(Object);
            rectangle.calcable.aa.should.be.an.instanceOf(FooManager);
            rectangle.calcable.bb.should.be.an.instanceOf(CalcManager);
            rectangle.cleanable.aa.should.be.an.instanceOf(FooManager);
        });
    });
});
//# sourceMappingURL=alias.js.map