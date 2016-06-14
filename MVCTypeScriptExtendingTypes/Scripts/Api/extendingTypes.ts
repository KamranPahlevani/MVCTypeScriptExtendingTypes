interface IEngine {
    start(callback: (startStatus: boolean, engineType: string) => void): void;
    stop(callback: (stopStatus: boolean, engineType: string) => void): void;
}

interface IAutoOptions {
    basePrice: number;
    engine: IEngine;
    state: string;
    make: string;
    model: string;
    year: number;
}

interface ITruckOptions extends IAutoOptions {
    bedLength: string;
    fourByFour: boolean;
}

class Engine implements IEngine {
    constructor(public horsePower: number, public engineType: string) {
    }

    start(callback: (startStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, this.engineType);
        }, 1000);
    }

    stop(callback: (stopStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, this.engineType);
        }, 1000);
    }
}

class CustomEngine implements IEngine {
    start(callback: (startStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, 'Custom Engine');
        }, 1000);
    }

    stop(callback: (stopStatus: boolean, engineType: string) => void) {
        window.setTimeout(() => {
            callback(true, 'Custom Engine');
        }, 1000);
    }
}

class Accessory {
    constructor(public accessoryNumber: number, public title: string) {
    }
}

class Auto {
    private _basePrice: number;
    private _engine: IEngine;
    state: string;
    year: number;
    make: string;
    model: string;
    accessoryList: string;

    constructor(options: IAutoOptions) {
        this.basePrice = options.basePrice; 
        this.engine = options.engine;
        this.make = options.make;
        this.model = options.model;
        this.state = options.state;
        this.year = options.year;
    }

    calculateTotal() {
        var taxRate = 0.08;
        return this.basePrice + (taxRate * this.basePrice);
    }

    //addAccessories(new Accessory(), new Accessory(), .....)
    addAccessories(...accessories: Accessory[]) {
        this.accessoryList = '';
        for (var i = 0; i < accessories.length; i++) {
            var ac = accessories[1];
            this.accessoryList += ac.accessoryNumber + ' ' + ac.title + '<br/>'; 
        }
    }

    getAccessoryList(): string {
        return this.accessoryList;
    }

    get basePrice(): number {
        return this._basePrice;
    }

    set basePrice(value: number) {
        if (value <= 0)
            throw 'price must be >= 0';
        this._basePrice = value;
    }

    get engine(): IEngine {
        return this._engine;
    }

    set engine(value: IEngine){
        if (value == undefined)
            throw 'Please supply an engine.';
        this._engine = value;
    }

}

class Truck extends Auto {
    bedLength: string;
    fourByFour: boolean;

    constructor(options: ITruckOptions) {
        super(options);
        this.bedLength = options.bedLength;
        this.fourByFour = options.fourByFour;
    }
}

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

    var truckEngine = <Engine>truck.engine;

    var autoEngine = <Engine>auto.engine;


    truck.addAccessories(
        new Accessory(1234, 'Sunroof'),
        new Accessory(4321, 'Towing Package')
    );

    alert(truckEngine.engineType);
    alert(truck.bedLength);
    alert(truck.calculateTotal().toString());
    alert(autoEngine.horsePower);

    truck.engine.start((status: boolean, engineType: string) => {
        alert(engineType + ' was started');
    });

}
 