import { Point, PointInt } from "./Point";

export abstract class Shape {
    protected color: string;
    protected filled: boolean;
    points: Array<PointInt>;

    constructor(points: Array<PointInt>);
    constructor(points: Array<PointInt>, color?: string, filled?: boolean) {
        this.color = color || "green";
        this.filled = filled !== undefined ? filled : true;

        if (points.length < 3) {
            throw console.error("Please insert at least 3 points");
        }

        this.points = points;
    }

    toString() {
        const pointList: string = this.points.reduce(
            (acc, point, index) =>
                (acc += `(${point.x}, ${point.y})${
                    index + 1 === this.points.length ? "." : ", "
                }`),
            ""
        );

        return `A Shape with color of ${this.color} and${
            this.filled ? "" : " not"
        } filled. Points: ${pointList}`;
    }

    getPerimeter() {
        let perimeter: number = 0;

        for (let i = 0; i < this.points.length; i++) {
            const currPoint: Point = new Point(
                this.points[i].x,
                this.points[i].y
            );

            // if it's last iteration, take 1st array element
            const nextPoint: Point = new Point(
                this.points[i + 1 === this.points.length ? 0 : i + 1].x,
                this.points[i + 1 === this.points.length ? 0 : i + 1].y
            );

            perimeter += currPoint.distance(nextPoint);
        }
        return perimeter;
    }

    abstract getType(): string;
}
