const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const expected = 100;
  const actual = new Manager("Foo", 1, "test@test.com", expected).officeNumber;
  expect(actual).toBe(expected);
});

test('getRole() should return "Manager"', () => {
  const expected = "Manager";
  const actual = new Manager("Foo", 1, "test@test.com", 100).getRole();
  expect(actual).toBe(expected);
});

test("Can get office number via getOfficeNumber()", () => {
  const expected = 100;
  const actual = new Manager("Foo", 1, "test@test.com", expected).getOfficeNumber();
  expect(actual).toBe(expected);
});