export interface PointInt {
    x: number;
    y: number;
}

export class Point implements PointInt {
    x: number;
    y: number;
    point: PointInt;

    constructor(x?: number, y?: number);
    constructor(x: number, y: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    distance(x: number, y: number): number;
    distance(point: PointInt): number;
    distance(): number;
    distance(arg1?: any, arg2?: any): number {
        let coordinate: PointInt = {
            x: 0,
            y: 0,
        };

        const isNoArgs: boolean = !arg1 && !arg2;
        const isAnObject: boolean = arg1 && arg1.x != null && arg1.y != null;
        const isBothArgs: boolean = !!arg1 && !!arg2;

        if (isNoArgs) {
            return Math.sqrt(
                Math.pow(coordinate.x - this.x, 2) +
                    Math.pow(coordinate.y - this.y, 2)
            );
        }
        if (isAnObject) {
            coordinate = {
                x: (arg1 as PointInt).x,
                y: (arg1 as PointInt).y,
            };
            return Math.sqrt(
                Math.pow(coordinate.x - this.x, 2) +
                    Math.pow(coordinate.y - this.y, 2)
            );
        }
        if (isBothArgs) {
            coordinate = {
                x: arg1 as number,
                y: arg2 as number,
            };
            return Math.sqrt(
                Math.pow(coordinate.x - this.x, 2) +
                    Math.pow(coordinate.y - this.y, 2)
            );
        }
    }
}
