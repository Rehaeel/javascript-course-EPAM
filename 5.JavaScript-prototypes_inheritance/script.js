"use strict";

function myNew(constructor, ...args) {
    return (constructor.prototype = new constructor(...args));
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.introduce = function () {
    return "My name is " + this.name + " and I am " + this.age;
};

// var john = new Person("John", 30);
var john = myNew(Person, "John", 30);
// var jack = new Person("Jack", 40);
var jack = myNew(Person, "Jack", 40);

console.log(john.introduce()); //	My	name	is	John	and	I	am	30
console.log(jack.introduce()); //	My	name	is	Jack	and	I	am	4
