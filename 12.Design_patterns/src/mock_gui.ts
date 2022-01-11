import { State } from "./state";

export class MockGui implements State {
    shipmentId: number;
    private _toAdress: string;
    private _fromAdress: string;
    private _toZipCode: string;
    private _fromZipCode: string;
    weight: number;
    marks?: string[];

    constructor() {
        this.shipmentId = 123;
        this._toAdress = "1313 Mockingbird Lane, Tulsa, OK";
        this._fromAdress = "12292 4th Ave SE, Bellevue, Wa";
        this._toZipCode = "92021";
        this._fromZipCode = "67721";
        this.weight = 13;
        this.marks = [
            "**MARK FRAGILE**",
            "**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**",
            "**MARK RETURN RECEIPT REQUESTED**",
        ];
    }

    set toAdress(toAdress: string) {
        this._toAdress = toAdress;
    }
    get toAdress(): string {
        return this._toAdress;
    }

    set fromAdress(fromAdress: string) {
        this._fromZipCode = fromAdress;
    }
    get fromAdress(): string {
        return this._fromAdress;
    }

    set toZipCode(toZipCode: string) {
        if (toZipCode.length === 5) {
            this._toZipCode = toZipCode;
        } else {
            throw new Error(
                "Receiver Zip Code shoud have exactly 5 characters"
            );
        }
    }
    get toZipCode(): string {
        return this._toZipCode;
    }

    set fromZipCode(fromZipCode: string) {
        if (fromZipCode.length === 5) {
            this._fromZipCode = fromZipCode;
        } else {
            throw new Error("Sender Zip Code shoud have exactly 5 characters");
        }
    }
    get fromZipCode(): string {
        return this._fromZipCode;
    }
}
