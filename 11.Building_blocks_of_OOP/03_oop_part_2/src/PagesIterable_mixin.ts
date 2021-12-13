const PagesIterable = (superClass: any) =>
    class extends superClass {
        toString(): void {}

        [Symbol.iterator]() {
            let counter: number = 0;

            return {
                next: () => {
                    if (counter === this._pages.pageArray.length) {
                        return {
                            done: true,
                        };
                    }
                    return {
                        done: false,
                        value: this._pages.currPageToString(this, counter++),
                    };
                },
            };
        }
    };

export default PagesIterable;
