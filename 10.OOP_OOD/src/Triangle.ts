import { PointInt, Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape {
    constructor(point1: Point, point2: Point, point3: Point);
    constructor(
        point1: Point,
        point2: Point,
        point3: Point,
        color?: string,
        filled?: boolean
    ) {
        super([point1, point2, point3]);
        this.color = color || "";
        this.filled = filled || true;

        /* It might be all args, without 1 arg or only points */
        if (
            arguments.length !== 5 &&
            arguments.length !== 4 &&
            arguments.length !== 3
        )
            throw console.error("Triangle should have 3 corners");
    }

    toString() {
        return `Triangle[${this.points.reduce(
            (acc: string, point: PointInt, index: number) => {
                acc += `v${index + 1}=(${point.x}, ${point.y})${
                    index + 1 === this.points.length ? "" : ","
                }`;
                return acc;
            },
            ""
        )}]`;
    }

    getType() {
        let sides: Array<number> = [];
        for (let i = 0; i < this.points.length; i++) {
            const currPoint: Point = new Point(
                this.points[i].x,
                this.points[i].y
            );
            const nextPoint: Point = new Point(
                this.points[i === this.points.length - 1 ? 0 : i + 1].x,
                this.points[i === this.points.length - 1 ? 0 : i + 1].y
            );
            sides.push(currPoint.distance(nextPoint));
        }

        const uniqueSides: Set<number> = new Set();
        sides.map((side) => {
            uniqueSides.add(Math.round(parseFloat(String(side)) * 100));
        });

        if (uniqueSides.size === 1) {
            return `equilateral triangle`;
        } else if (uniqueSides.size === 2) {
            return `isosceles triangle`;
        } else if (uniqueSides.size === sides.length) {
            return `scalene triangle`;
        }
    }
}
