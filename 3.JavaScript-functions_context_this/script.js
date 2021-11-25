"use-strict";

const NamedOne = function (first, last) {
    let firstName = first,
        lastName = last,
        fullName = `${firstName} ${lastName}`;

    return {
        set firstName(name) {
            firstName = name;
            fullName = `${firstName} ${lastName}`;
        },
        get firstName() {
            return firstName;
        },
        set lastName(name) {
            lastName = name;
            fullName = `${firstName} ${lastName}`;
        },
        get lastName() {
            return lastName;
        },
        set fullName(name) {
            if (name.split(" ").length === 1) {
                return;
            } else {
                fullName = name;
                firstName = name.split(" ")[0];
                lastName = name.split(" ")[1];
            }
        },
        get fullName() {
            return fullName;
        },
    };
};

const namedOne = new NamedOne("Naomi", "Wang");
