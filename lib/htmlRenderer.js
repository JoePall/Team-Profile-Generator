const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  console.log(employees);

  html.push(employees
    .map(employee =>
      renderEmployee(employee, employee.getRole() + ".html")));

  return renderMain(html.join(""));
};

const renderEmployee = (employee, fileName) => {
  let template = fs.readFileSync(path.resolve(templatesDir, fileName), "utf8");

  template = replacePlaceholders(template, "name", employee.getName());
  template = replacePlaceholders(template, "email", employee.getEmail());
  template = replacePlaceholders(template, "id", employee.getId());

  let role = employee.getRole();
  template = replacePlaceholders(template, "role", role);

  if (role === "Manager") {
    template = replacePlaceholders(template, "officeNumber", employee.getOfficeNumber());
  }
  else if (role === "Engineer") {
    template = replacePlaceholders(template, "github", employee.getGithub());
  }
  else if (role === "Intern") {
    template = replacePlaceholders(template, "school", employee.getSchool());
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
