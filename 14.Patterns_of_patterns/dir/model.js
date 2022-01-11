class DatabaseRecords {
    constructor() {
        this.getAll = async () => {
            const db = await fetch("../rates.json").then((resolve) => resolve.json());
            return await Promise.resolve(db);
        };
    }
}
DatabaseRecords._db = {};
DatabaseRecords.instance = new DatabaseRecords();
class Currency {
    constructor(title, exchangeRate) {
        this._baseCurrAmount = 100;
        this.title = title;
        this.exchangeRate = exchangeRate;
    }
    set baseCurrAmount(amount) {
        this._baseCurrAmount = amount;
    }
    get baseCurrAmount() {
        return this._baseCurrAmount;
    }
    set convertedCurrAmount(amount) {
        this._convertedCurrAmount = amount;
    }
    get convertedCurrAmount() {
        return this._convertedCurrAmount;
    }
}
const fetchDB = await DatabaseRecords.instance.getAll();
export const database = Object.entries(fetchDB).map(([curr, value]) => {
    return new Currency(curr, value);
});
