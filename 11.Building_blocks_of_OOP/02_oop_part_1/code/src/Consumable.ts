import { Item } from "./Item";

export abstract class Consumable extends Item {
    consumed: boolean;
    spoiled: boolean;

    constructor(
        name: string,
        spoiled: boolean,
        value?: number,
        weight?: number
    ) {
        super(name, value, weight);
        this.consumed = false;
        this.spoiled = spoiled;
    }

    public eat(): string {
        if (this.consumed) {
            return `There is nothing left of the ${this.name} to consume`;
        } else {
            let outputText: string = `You eat the ${this.name}`;
            if (this.spoiled) {
                return outputText.concat("\nYou feel sick.");
            } else {
                return outputText;
            }
        }
    }
    public use(): string {
        if (!this.spoiled && !this.consumed) {
            return this.eat();
        } else if (this.consumed) {
            return `There is nothing left of the ${this.name} to consume`;
        }
    }
    public isConsumed(): boolean {
        return this.consumed;
    }
    public setConsumed(consumed: boolean): void {
        this.consumed = consumed;
    }
    public isSpoiled(): boolean {
        return this.spoiled;
    }
    public toString(): string {
        return `${this.name} - Value: ${this.value}, Weight: ${this.weight}, isSpoiled: ${this.spoiled}`;
    }
}
