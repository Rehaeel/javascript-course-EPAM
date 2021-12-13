import { Comparable } from "./Comparable";

let id: number = 0;
export let numberOfItems: number = 0;

export abstract class Item implements Comparable<Item> {
    id: number;
    value: number;
    name: string;
    weight: number;

    constructor(name: string, value: number, weight: number) {
        this.id = this.getId();
        this.value = value;
        this.name = name;
        this.weight = weight;

        numberOfItems++;
    }

    public use(): void {}
    public compareTo(other: Item): number {
        if (this.value > other.value) return 1;
        else if (this.value < other.value) return -1;
        else if (this.value === other.value) {
            return this.name
                .toLowerCase()
                .localeCompare(other.name.toLowerCase());
        }
    }
    public toString(): string {
        return `${this.name} - Value: ${
            this.value
        }, Weight: ${this.weight.toFixed(2)}`;
    }
    public getId = (): number => id++;

    public getValue = (): number => this.value;
    public setValue(price: number): void {
        this.value = price;
    }

    public getName = (): string => this.name;
    public setName(name: string): void {
        this.name = name;
    }

    public getWeight = (): number => this.weight;
    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public reset(): void {
        numberOfItems = 0;
    }
}
