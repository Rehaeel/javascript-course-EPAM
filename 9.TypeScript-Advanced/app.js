/* IIFE as a __extends function to inherit parent constructor and 
properties */

var __extends =
    (this && this.__extends) ||
    (function () {
        /* "d" parameter is a constructor and "b" parameter
        is a prototype */
        var extendStatics = function (d, b) {
            extendStatics =
                //Checks if the extendStatics is an instance of the Object
                Object.setPrototypeOf ||
                /* checks if the prototype is an instance of array
                and the prototype of construcot is the same as parent's
                prototype */
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                /* at last it assigning the properties of the parent
                    prototype to the constructors prototype */
                function (d, b) {
                    for (var p in b)
                        if (Object.prototype.hasOwnProperty.call(b, p))
                            d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            /* Checks if the prototype is a function or there is absence
            of prototype. In either way, throw an TypeError */
            if (typeof b !== "function" && b !== null)
                throw new TypeError(
                    "Class extends value " +
                        String(b) +
                        " is not a constructor or null"
                );

            extendStatics(d, b);
            function __() {
                /* assigning the "d" parameter to the constructor of 
                the object which will call _extends */
                this.constructor = d;
            }
            /* assigning the prototype to the constructor function object */
            d.prototype =
                /* If there is no prototype obj create one, if there is,
            take the prototype of b and assign to the prototype of 
            "_" function. Than create new instance of "_" function */
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();

/* We have 2 classes declared as a variables, which contains
IIFE function. The AbstractClass has a function with parameter name
which is returned by the IIFE (as a constructor function). */

var AbstractClass = /** @class */ (function () {
    function AbstractClass(name) {
        this.name = name;
    }
    return AbstractClass;
})();

/* Second class is also a IIFE which contains the _super parameter
to be returned as a parent's constructor. Inside IIFE there is a 
Teacher constructor function. */
var Teacher = /** @class */ (function (_super) {
    /* function call that extends the parent class.
    Teacher as a constructor in current class.
    _super as a parameter of the constructor of
    parent's class*/
    __extends(Teacher, _super);

    /* child constructor function */
    function Teacher(name, subject) {
        // binding "this" to the _super constructor
        var _this = _super.call(this, name) || this;
        _this.students = [];
        _this.name = name;
        _this.subject = subject;
        // returning the Teacher object
        return _this;
    }

    /* here we are specifying the class method as a prototype of the Teacher function to implement in possible further inheritance */
    Teacher.prototype.addStudent = function (student) {
        this.students.push({
            name: student.name,
            class: student.class,
            averageGrade: student.averageGrade,
        });
    };

    /* We return constructor function */
    return Teacher;
    /* IIFE contains the AbstractClass as a parameter of inheritance */
})(AbstractClass);

// Example calls
var johnSmith = new Teacher("John Smith", "Math");
johnSmith.addStudent({ name: "Ewa", class: 3, averageGrade: 5.0 });
johnSmith.addStudent({ name: "Rafał", class: 3, averageGrade: 4.5 });

// if there was several students
johnSmith.students.forEach((x) => console.log(x));
console.log(johnSmith);
