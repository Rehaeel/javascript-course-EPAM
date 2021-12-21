interface Database<T> {
    getAll(): T;
}

class DatabaseRecords implements Database<object> {
    private static _db: object = {};

    static instance: DatabaseRecords = new DatabaseRecords();

    public getAll = async () => {
        const db = await fetch("../rates.json").then((resolve) =>
            resolve.json()
        );
        return await Promise.resolve(db);
    };
}

export interface CurrencyContainer {
    title: string;
    exchangeRate: number;
    baseCurrAmount: number;
    convertedCurrAmount: number;
}

class Currency implements CurrencyContainer {
    title: string;
    exchangeRate: number;
    protected _baseCurrAmount: number = 100;
    protected _convertedCurrAmount: number;

    constructor(title: string, exchangeRate: number) {
        this.title = title;
        this.exchangeRate = exchangeRate;
    }

    set baseCurrAmount(amount: number) {
        this._baseCurrAmount = amount;
    }
    get baseCurrAmount(): number {
        return this._baseCurrAmount;
    }

    set convertedCurrAmount(amount: number) {
        this._convertedCurrAmount = amount;
    }
    get convertedCurrAmount(): number {
        return this._convertedCurrAmount;
    }
}

const fetchDB = await DatabaseRecords.instance.getAll();

export const database = Object.entries(fetchDB).map(
    ([curr, value]: [string, number]) => {
        return new Currency(curr, value);
    }
);
