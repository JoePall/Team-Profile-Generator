const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email, "Intern");
        this.school = school;

        return this;
    }

    getSchool = () => this.school;
}

module.exports = Intern;