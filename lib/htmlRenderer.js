const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  console.log(employees);

  html.push(employees
    .map(employee =>
      renderEmployee(employee)));

  return renderMain(html.join(" "));
};

const renderEmployee = (employee) => {
  let template = fs.readFileSync(path.resolve(templatesDir, employee.constructor.name + ".html"), "utf8");

  template = replacePlaceholders(template, "name", employee.getName());
  template = replacePlaceholders(template, "email", employee.getEmail());
  template = replacePlaceholders(template, "id", employee.getId());

  template = replacePlaceholders(template, "role", employee.constructor.name);

  if (employee.getSchool) template = replacePlaceholders(template, "school", employee.getSchool());
  if (employee.getGithub) template = replacePlaceholders(template, "github", employee.getGithub());
  if (employee.getOfficeNumber) template = replacePlaceholders(template, "officeNumber", employee.getOfficeNumber());

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
