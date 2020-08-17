const inquirer = require("inquirer");

async function getPersonInfo() {
    let person = {};

    person.name = await input("Name: ");
    console.log(person);
    person.position = await input("Position: ", [
        "Manager",
        "Engineer",
        "Intern",
    ]);
    console.log(person);

    switch (person.position) {
        case "Manager":
            person.officeNumber = await input("Office Number: ");
            break;
        case "Intern":
            person.school = await input("School: ");
            break;
        case "Engineer":
            person.github = await input("GitHub UserName: ");
            break;
        default:
            break;
    }
    person.email = await input("Email: ");

    return person;
}

async function getPeople(isRecursive = false, people = []) {
    people.push(await getPersonInfo());

    var response = await inquirer.prompt([
        {
            "name": "confirm",
            "message": "Would you like to add another person?",
            "type": "confirm"
        }]);

    if (response.confirm) {
        console.log("\n------------------\n");
        return await getPeople(true, people);
    }
    else {
        return people;
    }
};

async function input(message, choices = null) {
    if (choices != null) {
        var response = await inquirer.prompt([
            {
                "name": "value",
                "message": message,
                "type": "list",
                "choices": choices
            }]);
        console.log(response);
    }
    else {
        var response = await inquirer.prompt([
            {
                "name": "value",
                "message": message,
                "type": "input"
            }]);
    }
    console.log(response.value);
    return response.value;
}

async function init() {
    let people = await getPeople(true);

    console.log(people);
}

init();