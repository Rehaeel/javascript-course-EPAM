import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
    items: Array<Item>;
    constructor() {
        this.items = [];
    }

    public addItem(item: Item): void {
        this.items.push(item);
    }

    public sort(comparator?: ItemComparator): void;
    public sort(): void {
        if (arguments.length === 0) {
            this.items.sort((a, b) => b.value - a.value);
        } else {
            this.items.sort((a, b) => b.weight - a.weight);
        }
    }

    public toString(): string {
        return this.items.join(", ");
    }
}
