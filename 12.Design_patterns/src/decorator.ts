export class Decorator {
    protected _statement: string;
    protected _marks: Array<string>;

    constructor(statement: string, marks: Array<string>) {
        this._statement = statement;
        this._marks = marks;
    }

    getMarks(): string {
        if (this._marks.length === 0 || typeof this._marks === "undefined") {
            return this._statement;
        } else {
            return this._marks.reduce((acc, mark) => {
                return `${acc}\n\n${mark}`;
            }, this._statement);
        }
    }
}
