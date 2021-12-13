interface StudentInterface {
    name: string;
    class: number;
    averageGrade: number;
}

interface TeacherInterface {
    name: string;
    subject: string;
}

abstract class AbstractClass {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Teacher extends AbstractClass implements TeacherInterface {
    students: StudentInterface[] = [];
    subject: string;

    constructor(name: string, subject: string) {
        super(name);
        this.subject = subject;
    }
    addStudent<T extends StudentInterface>(student: T): void {
        this.students.push({
            name: student.name,
            class: student.class,
            averageGrade: student.averageGrade,
        });
    }
}

const johnSmith = new Teacher("John Smith", "Math");

johnSmith.addStudent({ name: "Ewa", class: 3, averageGrade: 5.0 });
johnSmith.addStudent({ name: "Rafał", class: 3, averageGrade: 4.5 });

// johnSmith.students.forEach((x) => console.log(x));
console.log(johnSmith);
