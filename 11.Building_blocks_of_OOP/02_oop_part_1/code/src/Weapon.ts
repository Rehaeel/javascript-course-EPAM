import { Item } from "./Item";

export abstract class Weapon extends Item {
    public MODIFIER_CHANGE_RATE: number = 0.05;
    baseDamage: number;
    damageModifier: number;
    effectiveDamage: number;

    baseDurability: number;
    durabilityModifier: number;
    effectiveDurability: number;

    constructor(
        name: string,
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number
    ) {
        super(name, value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
        this.effectiveDamage = baseDamage + this.damageModifier;
        this.effectiveDurability = baseDurability + this.durabilityModifier;
    }

    public getDamage(): string {
        return `${this.name} - Effective damage: ${this.effectiveDamage}`;
    }
    public getDurability(): string {
        return `${this.name} - Effective durability: ${this.effectiveDurability}`;
    }

    public polish(): void {}
    public use(): string {
        let outputText: string = "";

        if (this.effectiveDurability <= 0) {
            outputText = `You can't use the ${this.name}, it is broken.`;
        } else {
            outputText = `You use the ${
                this.name
            }, dealing ${this.effectiveDamage.toFixed(2)} points of damage.`;
        }

        this.effectiveDurability -= this.MODIFIER_CHANGE_RATE;

        /* if effectiveDurability after usage drops 0 or lower 
        output with additional text*/
        if (this.effectiveDurability <= 0) {
            return `${outputText}
            The ${this.name} breaks`;
        } else {
            return outputText;
        }
    }

    public toString(): string {
        return `${this.name} - Value: ${this.value}, Weight: ${
            this.weight
        }, Damage: ${this.effectiveDamage}, Durability ${(
            (this.effectiveDurability * 100) /
            1
        ).toFixed(2)}%`;
    }
}
