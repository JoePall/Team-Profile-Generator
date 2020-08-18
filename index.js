const inquirer = require("inquirer");
const { resolve } = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

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

    var response = await input("\nWould you like to add another person (Y / N)?");

    console.log("\n------------------\n");
    console.log(response.toUpperCase());

    return (response.toUpperCase() === "Y" || response.toUpperCase() === "\r\n" ) ? await getPeople(true, people) : people;
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
    // let people = await getPeople(true);
    // let fileName = await input("File name: ");

    let people = [];

    people.push(new Intern("John Casey", createID(), "casey@normlseatech.com", "UCLA"));
    people.push(new Engineer("Chuck Bartowski", createID(), "chuck@nerdherd.com", "charlesCharmichael"));
    people.push(new Manager("Sarah Walker", createID(), "sarah@corsimatech.com", 5));

    let fileName = "test.html";




    let html = render(people);


    const outputDir = resolve(__dirname, "./output");
    fs.writeFile(resolve(outputDir, fileName), html, "utf8", () => console.log("File written!"));
}

init();