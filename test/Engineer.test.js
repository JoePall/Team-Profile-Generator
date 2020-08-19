const Engineer = require("../lib/Engineer");

test("Can set GitHub account via constructor", () => {
  const expected = "GitHubUser";
  const actual = new Engineer("Foo", 1, "test@test.com", expected).github;
  expect(actual).toBe(expected);
});

test("getRole() should return \"Engineer\"", () => {
  const expected = "Engineer";
  const actual = new Engineer("Foo", 1, "test@test.com", "GitHubUser").getRole();
  expect(actual).toBe(expected);
});

test("Can get GitHub username via getGithub()", () => {
  const expected = "GitHubUser";
  const actual = new Engineer("Foo", 1, "test@test.com", expected).getGithub();
  expect(actual).toBe(expected);
});
