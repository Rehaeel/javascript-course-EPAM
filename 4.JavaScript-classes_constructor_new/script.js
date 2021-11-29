"use strict";

class Vector {
    constructor(arr) {
        this.arr = arr;
    }

    toString() {
        return `(${this.arr.toString()})`;
    }

    equals(secondArr) {
        if (this.arr.length === secondArr.arr.length) {
            return true;
        } else return false;
    }

    add(secondArr) {
        return (
            !this.equals(secondArr) ||
            new Vector(this.arr.map((el, i) => el + secondArr.arr[i]))
        );
    }

    subtract(secondArr) {
        return (
            !this.equals(secondArr) ||
            new Vector(this.arr.map((el, i) => el - secondArr.arr[i]))
        );
    }

    dot(secondArr) {
        return (
            !this.equals(secondArr) ||
            this.arr
                .map((el, i) => el * secondArr.arr[i])
                .reduce((acc, val) => acc + val, 0)
        );
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
console.log(a.norm()); // 14
console.log(a.toString() === "(1,2,3)"); // true
console.log(a.add(c)); // Error
