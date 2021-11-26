"use strict";

class ReversePromise extends Promise {
    constructor(resolve, reject) {
        super(resolve, reject);
        // assigning new method then
        this.then = this.then.bind(this);
        // calls after first then call
        this.accumulator = this.accumulator.bind(this);
        // list of all then inputs
        this.callList = [];
        // calling checker
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
