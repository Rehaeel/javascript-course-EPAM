import { Point, PointInt } from "./Point";

export abstract class Shape {
    protected color: string;
    protected filled: boolean;
    points: Array<Point>;

    constructor(points: Array<Point>, color: string, filled: boolean);
    constructor(points: Array<Point>);
    constructor(points: Array<Point>, color?: string, filled?: boolean) {
        this.color = color || "green";
        this.filled = filled !== undefined ? filled : true;

        if (points.length < 3) {
            throw console.error("Please insert at least 3 points");
        }

        this.points = points;
    }

    toString() {
        const pointList = this.points
            .map((point) => point.toString())
            .join(", ");

        return `A Shape with color of ${this.color} and${
            this.filled ? "" : " not"
        } filled. Points: ${pointList}.`;
    }

    getPerimeter() {
        let perimeter: number = 0;

        this.points.map((point, index) => {
            const isLastPoint = index + 1 === this.points.length;

            const currPoint: Point = new Point(point.x, point.y);
            const nextPoint: Point = new Point(
                this.points[isLastPoint ? 0 : index + 1].x,
                this.points[isLastPoint ? 0 : index + 1].y
            );
            perimeter += currPoint.distance(nextPoint);
        });

        return perimeter;
    }

    abstract getType(): string;
}
