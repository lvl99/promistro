import promistro from "../dist/index";

it("should work", () => {
  expect(() => {
    const op = promistro(() => {});
  }).not.toThrowError();
});
