var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Engine = (function () {
    function Engine(horsePower, engineType) {
        this.horsePower = horsePower;
        this.engineType = engineType;
    }
    Engine.prototype.start = function (callback) {
        var _this = this;
        window.setTimeout(function () {
            callback(true, _this.engineType);
        }, 1000);
    };
    Engine.prototype.stop = function (callback) {
        var _this = this;
        window.setTimeout(function () {
            callback(true, _this.engineType);
        }, 1000);
    };
    return Engine;
}());
var CustomEngine = (function () {
    function CustomEngine() {
    }
    CustomEngine.prototype.start = function (callback) {
        window.setTimeout(function () {
            callback(true, 'Custom Engine');
        }, 1000);
    };
    CustomEngine.prototype.stop = function (callback) {
        window.setTimeout(function () {
            callback(true, 'Custom Engine');
        }, 1000);
    };
    return CustomEngine;
}());
var Accessory = (function () {
    function Accessory(accessoryNumber, title) {
        this.accessoryNumber = accessoryNumber;
        this.title = title;
    }
    return Accessory;
}());
var Auto = (function () {
    function Auto(options) {
        this.basePrice = options.basePrice;
        this.engine = options.engine;
        this.make = options.make;
        this.model = options.model;
        this.state = options.state;
        this.year = options.year;
    }
    Auto.prototype.calculateTotal = function () {
        var taxRate = 0.08;
        return this.basePrice + (taxRate * this.basePrice);
    };
    //addAccessories(new Accessory(), new Accessory(), .....)
    Auto.prototype.addAccessories = function () {
        var accessories = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            accessories[_i - 0] = arguments[_i];
        }
        this.accessoryList = '';
        for (var i = 0; i < accessories.length; i++) {
            var ac = accessories[1];
            this.accessoryList += ac.accessoryNumber + ' ' + ac.title + '<br/>';
        }
    };
    Auto.prototype.getAccessoryList = function () {
        return this.accessoryList;
    };
    Object.defineProperty(Auto.prototype, "basePrice", {
        get: function () {
            return this._basePrice;
        },
        set: function (value) {
            if (value <= 0)
                throw 'price must be >= 0';
            this._basePrice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Auto.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        set: function (value) {
            if (value == undefined)
                throw 'Please supply an engine.';
            this._engine = value;
        },
        enumerable: true,
        configurable: true
    });
    return Auto;
}());
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(options) {
        _super.call(this, options);
        this.bedLength = options.bedLength;
        this.fourByFour = options.fourByFour;
    }
    return Truck;
}(Auto));
window.onload = function () {
    var auto = new Auto({
        basePrice: 40000,
        engine: new Engine(250, 'Type'),
        make: 'Make',
        model: 'Model',
        state: 'AZ',
        year: 2010
    });
    var truck = new Truck({
        basePrice: 40000,
        engine: new Engine(300, 'V8'),
        make: 'Chevy',
        model: 'Silverado',
        bedLength: 'Long Bed',
        fourByFour: true,
        state: 'AK',
        year: 1981
    });
    var truckEngine = truck.engine;
    var autoEngine = auto.engine;
    truck.addAccessories(new Accessory(1234, 'Sunroof'), new Accessory(4321, 'Towing Package'));
    alert(truckEngine.engineType);
    alert(truck.bedLength);
    alert(truck.calculateTotal().toString());
    alert(autoEngine.horsePower);
    truck.engine.start(function (status, engineType) {
        alert(engineType + ' was started');
    });
};
//# sourceMappingURL=extendingTypes.js.map