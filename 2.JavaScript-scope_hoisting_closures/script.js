"use strict";
// Exercise 1
console.log("-----------Excercise 1-----------");

const runningAverage = () => {
    let counter = 0;
    let sum = 0;
    return function (number) {
        sum += number;
        counter++;
        return sum / counter;
    };
};

const rAvg = runningAverage();
console.log(rAvg(10));
console.log(rAvg(11));
console.log(rAvg(12));

// Exercise 2
console.log("-----------Excercise 2-----------");

const sum = (...args) => {
    const inputArgs = [...args];
    if (inputArgs.length === 1) {
        let total = inputArgs[0];
        function accountant() {
            if (arguments.length === 0) return total;
            total += arguments[0];
            return accountant;
        }
        return accountant;
    } else return inputArgs.reduce((acc, el) => acc + el, 0);
};

console.log(sum(2, 3));
console.log(sum(2)(3)());
console.log(sum(1)(2)(3)(4)());
