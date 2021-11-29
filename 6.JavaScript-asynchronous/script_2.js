"use strict";

class ReversePromise extends Promise {
    constructor(resolve, reject) {
        super(resolve, reject);
        // list of all then inputs
        this.callList = [];
        // calling checker
        this.beenActivated = false;
    }

    accumulate() {
        // setting timer to accumulate all entries
        setTimeout(() => {
            this.callList.reverse().map((el) => el());
        }, 0);
    }

    then(input) {
        // pushing all entries into variable
        this.callList.push(input);
        // checking if was called before
        if (!this.beenActivated) {
            this.beenActivated = true;
            this.accumulate();
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
