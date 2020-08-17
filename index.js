const inquirer = require("inquirer");

async function getPersonInfo() {
    let person = [];

    await person.push(await input("name", "Name: "));
    await person.push(await input("position", "Position: ", [
        "Manager",
        "Developer",
        "Intern",
    ]));
    await person.push(await input("other", "Other: "));

    return person;
}

async function getPeople(isRecursive = false, people = []) {
    await people.push(await getPersonInfo());

    var response = await inquirer.prompt([
        {
            "name": "confirm",
            "message": "Would you like to add another person?",
            "type": "confirm"
        }]);
    console.log(people);
    if (response.confirm) getPeople(true, people);
    else return people;
};

async function input(name, message, choices = undefined) {
    if (choices) {
        return await inquirer.prompt([
            {
                "name": name,
                "message": message,
                "choices": choices
            }]);
    }
    else {
        return await inquirer.prompt([
            {
                "name": name,
                "message": message,
                "type": "input"
            }]);
    }
}

getPeople(true);