import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    numberOfSlices: number;
    slicesEaten: number;
    constructor(numberOfSlices: number, spoiled: boolean) {
        super("Pizza", spoiled);
        this.numberOfSlices = numberOfSlices;
        this.slicesEaten = 0;
    }

    public eat(): string {
        if (!this.consumed) {
            this.slicesEaten++;

            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed(true);
            }

            return "You eat a slice of the pizza.";
        } else {
            return "There is nothing left of the pizza to consume";
        }
    }
}
