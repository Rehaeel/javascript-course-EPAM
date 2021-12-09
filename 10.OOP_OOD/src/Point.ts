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
    distance(point?: PointInt);
    distance(point: PointInt) {
        const a: number = arguments.length === 0 ? 0 : point.x ?? arguments[0];
        const b: number = arguments.length === 0 ? 0 : point.y ?? arguments[1];

        return Math.sqrt(Math.pow(a - this.x, 2) + Math.pow(b - this.y, 2));
    }
}
