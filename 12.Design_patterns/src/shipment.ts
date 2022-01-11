import { Decorator } from "./decorator";
import { State } from "./state";

export class Shipment {
    protected state: State;
    private counter: number;

    constructor(state: State) {
        this.state = state;
        this.counter = 0;
    }

    public getShipmentID(): number {
        return this.counter++;
    }

    private getFirstZipChar(): string {
        return this.state.fromZipCode.charAt(0);
    }
    private isAirEast(): boolean {
        return (
            this.getFirstZipChar() === "1" ||
            this.getFirstZipChar() === "2" ||
            this.getFirstZipChar() === "3"
        );
    }
    private isChicagoSprint(): boolean {
        return (
            this.getFirstZipChar() === "4" ||
            this.getFirstZipChar() === "5" ||
            this.getFirstZipChar() === "6"
        );
    }
    private isPacificParcel(): boolean {
        return (
            this.getFirstZipChar() === "7" ||
            this.getFirstZipChar() === "8" ||
            this.getFirstZipChar() === "9"
        );
    }

    protected whatContractor(): "AirEast" | "ChicagoSprint" | "PacificParcel" {
        const isToZipCodeUnknown: boolean =
            typeof this.state.toZipCode === "undefined" ||
            this.state.toZipCode.length !== 5;

        if (this.isAirEast() || isToZipCodeUnknown) {
            return "AirEast";
        }
        if (this.isChicagoSprint()) {
            return "ChicagoSprint";
        }
        if (this.isPacificParcel()) {
            return "PacificParcel";
        }
    }

    protected getCost(): any {}

    public ship(): string {
        const ID: number =
            this.state.shipmentId === 0
                ? this.getShipmentID()
                : this.state.shipmentId;

        let statement = `Shipment with the ID ${ID} will be picked up from ${
            this.state.fromAdress
        } ${this.state.fromZipCode} and shipped to ${this.state.toAdress} ${
            this.state.toZipCode
        }\n\nCost = ${this.getCost().toFixed(1)}`;

        statement = new Decorator(statement, this.state.marks).getMarks();
        return statement;
    }
}
