"use strict";

class ReversePromise extends Promise {
    constructor(resolve, reject) {
        super(resolve, reject);
        this.then = this.then.bind(this);
        this.accumulator = this.accumulator.bind(this);
        this.callList = [];
        this.beenActivated = false;
    }

    accumulator() {
        // setting timer to accumulate all entries
        setTimeout(() => {
            this.callList.reverse().map((el) => el());
        }, 100);
    }

    then(input) {
        // pushing all entries into variable
        this.callList.push(input);
        // checking if was called before
        if (!this.beenActivated) {
            this.beenActivated = true;
            this.accumulator();
        }
        // allowing to call class again
        return this;
    }
}

let promise = new ReversePromise((resolve) => {
    console.log(1);
    resolve();
})
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4));
// result: 1, 4, 3, 2
