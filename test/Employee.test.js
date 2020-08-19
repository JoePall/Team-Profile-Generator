const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const expected = "object";
  const actual = typeof(new Employee());
  expect(actual).toBe(expected);
});

test("Can set name via constructor arguments", () => {
  const expected = "Alice";
  const actual = new Employee(expected).name;
  expect(actual).toBe(expected);
});

test("Can set id via constructor argument", () => {
  const expected = 100;
  const actual = new Employee("Foo", expected).id;
  expect(actual).toBe(expected);
});

test("Can set email via constructor argument", () => {
  const expected = "test@test.com";
  const actual = new Employee("Foo", 1, expected).email;
  expect(actual).toBe(expected);
});

test("Can get name via getName()", () => {
  const expected = "Alice";
  const actual = new Employee(expected).getName();
  expect(actual).toBe(expected);
});

test("Can get id via getId()", () => {
  const expected = 100;
  const actual = new Employee("Foo", expected).getId();
  expect(actual).toBe(expected);
});

test("Can get email via getEmail()", () => {
  const expected = "test@test.com";
  const actual = new Employee("Foo", 1, expected).getEmail();
  expect(actual).toBe(expected);
});

test("getRole() should return \"Employee\"", () => {
  const expected = "Employee";
  const actual = new Employee("Alice", 1, "test@test.com").getRole();
  expect(actual).toBe(expected);
});
