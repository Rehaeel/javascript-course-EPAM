"use strict";

// FIRST CLASS

class MyPromise extends Promise {
    constructor(resolve) {
        super(resolve, null);
    }
    async syncThen(func) {
        return await func();
    }
}

let promise = new MyPromise((resolve) => {
    console.log(1);
    resolve();
})
    .syncThen(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    });
console.log(4);

// result: 1,2,4,3
