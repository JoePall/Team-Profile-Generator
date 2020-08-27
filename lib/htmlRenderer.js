const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  let html = "";

  employees.forEach(employee =>
      html += renderEmployee(employee));

  return renderMain(html);
};

const renderEmployee = (employee) => {
  let template = fs.readFileSync(path.resolve(templatesDir, employee.constructor.name + ".html"), "utf8");

  template = replacePlaceholders(template, "name", employee.getName());
  template = replacePlaceholders(template, "email", employee.getEmail());
  template = replacePlaceholders(template, "id", employee.getId());

  template = replacePlaceholders(template, "role", employee.constructor.name);

  switch (employee.constructor.name) {
    case "Engineer":
      return replacePlaceholders(template, "github", employee.getGithub());
    case "Manager":
      return replacePlaceholders(template, "officeNumber", employee.getOfficeNumber());
    case "Intern":
      return replacePlaceholders(template, "school", employee.getSchool());
    default:
      break;
  }

  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
