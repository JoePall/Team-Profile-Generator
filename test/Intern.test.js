const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const expected = "UCLA";
  const actual = new Intern("Foo", 1, "test@test.com", expected).school;
  expect(actual).toBe(expected);
});

test("getRole() should return \"Intern\"", () => {
  const expected = "Intern";
  const actual = new Intern("Foo", 1, "test@test.com", "UCLA").getRole();
  expect(actual).toBe(expected);
});

test("Can get school via getSchool()", () => {
  const expected = "UCLA";
  const actual = new Intern("Foo", 1, "test@test.com", expected).getSchool();
  expect(actual).toBe(expected);
});
