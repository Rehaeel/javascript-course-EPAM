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
        return `(${new Point(this.x, this.y).x}, ${
            new Point(this.x, this.y).y
        })`;
    }

    distance(x: number, y: number): number;
    distance(point: PointInt): number;
    distance(): number;
    distance(arg1?: unknown, arg2?: unknown): number {
        let coordinate: PointInt = {
            x: 0,
            y: 0,
        };

        // no arguments
        if (!arg1 && !arg2) {
            return Math.sqrt(
                Math.pow(coordinate.x - this.x, 2) +
                    Math.pow(coordinate.y - this.y, 2)
            );
        }
        if (typeof arg1 === "object") {
            coordinate = {
                x: (arg1 as PointInt).x,
                y: (arg1 as PointInt).y,
            };
            return Math.sqrt(
                Math.pow(coordinate.x - this.x, 2) +
                    Math.pow(coordinate.y - this.y, 2)
            );
        } else {
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
