import { Letter, Oversized, Package } from "./shipment_size";
import { State } from "./state";

export class Client {
    shipmentString: string;

    constructor(gui: State) {
        if (gui.weight > 0 && gui.weight <= 15)
            this.shipmentString = new Letter(gui).ship();
        if (gui.weight > 15 && gui.weight <= 160)
            this.shipmentString = new Package(gui).ship();
        if (gui.weight > 160) this.shipmentString = new Oversized(gui).ship();

        console.log(this.shipmentString);
    }
}
