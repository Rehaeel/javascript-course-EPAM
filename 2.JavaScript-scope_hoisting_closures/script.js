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
    if ([...args].length === 1) {
        let total = [...args][0];
        function accountant(y) {
            y ? (total += y) : console.log(total);
            return (z) => accountant(z);
        }

        return (x) => (x ? accountant(x) : console.log(total));
    } else console.log([...args].reduce((acc, el) => acc + el, 0));
};

sum(2, 3);
sum(2)(3)();
sum(1)(2)(3)(4)();
