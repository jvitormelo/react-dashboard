import { describe, it } from "vitest";
import { stringUtils } from ".";

describe("String utils", () => {
  it("Normalize string", () => {
    it.each([
      [``, ``],
      [`á `, `a`],
      [`fõo`, `foo`],
      [`Test`, `test`],
      [`FÕÕ`, `foo`],
    ])(`%s`, (str, expected) => {
      expect(stringUtils.normalize(str)).be(expected);
    });
  });
});
