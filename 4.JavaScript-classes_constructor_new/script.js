"use strict";

class Vector {
    constructor(arr) {
        this.arr = arr;
    }

    toString() {
        return `(${this.arr.toString()})`;
    }

    equals(secondArr) {
        return this.arr.length === secondArr.arr.length;
    }

    add(secondArr) {
        if (!this.equals(secondArr)) throw "Arrays length not equal";
        return new Vector(this.arr.map((el, i) => el + secondArr.arr[i]));
    }

    subtract(secondArr) {
        if (!this.equals(secondArr)) throw "Arrays length not equal";
        return new Vector(this.arr.map((el, i) => el - secondArr.arr[i]));
    }

    dot(secondArr) {
        if (!this.equals(secondArr)) throw "Arrays length not equal";
        return this.arr
            .map((el, i) => el * secondArr.arr[i])
            .reduce((acc, val) => acc + val, 0);
    }

    norm() {
        return Math.sqrt(
            this.arr.reduce((acc, el) => acc + Math.pow(el, 2), 0)
        );
    }
}

const a = new Vector([1, 2, 3]);
const b = new Vector([3, 4, 5]);
const c = new Vector([5, 6, 7, 8]);

// Homework cases:
console.log(a.add(b)); // Vector {arr: [4,6,8]}
console.log(a.subtract(b)); // Vector {arr: [-2,-2,-2]}
console.log(a.dot(b)); // 26
console.log(a.norm()); // sqr from 14 = 3.74
console.log(a.toString() === "(1,2,3)"); // true
console.log(a.add(c)); // Error
