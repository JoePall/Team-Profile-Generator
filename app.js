const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function getPersonInfo() {
    let name = await input("Name: ");
    let email = await input("Email: ");
    let position = await input("Position: ", [
        "Manager",
        "Engineer",
        "Intern",
    ]);

    let id = createID();

    switch (position) {
        case "Manager":
            let officeNumber = await input("Office Number: ");
            return new Manager(name, id, email, officeNumber);
        case "Intern":
            let school = await input("School: ");
            return new Intern(name, id, email, school);
        case "Engineer":
            let github = await input("GitHub UserName: ");
            return new Engineer(name, id, email, github);
        default:
            break;
    }
}

function createID() {
    let result = "";

    for (let i = 0; i < 128; i++)
        result += (Math.floor(Math.random() * 11) * Date.now()).toString()[0];

    return result;
}

async function getPeople(isRecursive = false, people = []) {
    people.push(await getPersonInfo());

    console.log("\n------------------\n");

    var response = await getYesOrNo();

    if (response) {
        await getPeople(true, people)
    }
    else {
        return people;
    }
};

async function getYesOrNo() {
    var result = '';
    
    let answer = await input("\nWould you like to add another person (Y / N)?");
    if (answer.toUpperCase() === "Y" || answer.toUpperCase() === "N") {
        result = answer.toUpperCase() === "Y";
    }
    else {
        console.log("Answer must be 'Y' or 'N'");
        answer = await getYesOrNo();
    } 
    
    return result;
}

async function input(message, choices = null) {
    if (choices != null) {
        var response = await inquirer.prompt([
            {
                "name": "value",
                "message": message,
                "type": "list",
                "choices": choices
            }]);
    }
    else {
        var response = await inquirer.prompt([
            {
                "name": "value",
                "message": message,
                "type": "input"
            }]);
    }

    return response.value;
}

async function init() {
    let people = await getPeople(true);

    let html = render(people);

    fs.writeFile(outputPath, html, "utf8", () => console.log("File written!"));
}

init();