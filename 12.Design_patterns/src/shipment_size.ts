import { Shipment } from "./shipment";
import {
    AirEastShipper,
    ChicagoSprintShipper,
    ChooseShipper,
    PacificParcelShipper,
} from "./shippers";
import { State } from "./state";

export class Letter extends Shipment {
    constructor(state: State) {
        super(state);
    }
    getCost(): number {
        const contractor = this.whatContractor();
        const shipper = new ChooseShipper();

        switch (contractor) {
            case "AirEast": {
                shipper.setShipper(new AirEastShipper());
                return shipper.getShipperRate() * this.state.weight;
            }
            case "ChicagoSprint": {
                shipper.setShipper(new ChicagoSprintShipper());
                return shipper.getShipperRate() * this.state.weight;
            }
            case "PacificParcel": {
                shipper.setShipper(new PacificParcelShipper());
                return shipper.getShipperRate() * this.state.weight;
            }
        }
    }
}

export class Package extends Shipment {
    constructor(state: State) {
        super(state);
    }

    getCost(): number {
        const contractor = this.whatContractor();

        switch (contractor) {
            case "AirEast": {
                return 0.25 * this.state.weight;
            }
            case "ChicagoSprint": {
                return 0.2 * this.state.weight;
            }
            case "PacificParcel": {
                return 0.19 * this.state.weight;
            }
        }
    }
}

export class Oversized extends Shipment {
    constructor(state: State) {
        super(state);
    }

    getCost(): number {
        const contractor = this.whatContractor();
        const shipper = new ChooseShipper();

        switch (contractor) {
            case "AirEast": {
                shipper.setShipper(new AirEastShipper());
                return shipper.getShipperRate() * this.state.weight + 10;
            }
            case "ChicagoSprint": {
                shipper.setShipper(new ChicagoSprintShipper());
                return shipper.getShipperRate() * this.state.weight;
            }
            case "PacificParcel": {
                shipper.setShipper(new PacificParcelShipper());
                return (shipper.getShipperRate() + 0.02) * this.state.weight;
            }
        }
    }
}
