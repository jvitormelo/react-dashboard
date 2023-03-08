import { numberUtils } from "./index";
import { describe, expect, it } from "vitest";

describe("Number utils", () => {
  it("Calculate average", () => {
    const average = numberUtils.calculateAverage([1, 2, 3, 4, 5]);

    expect(average).toBe(3);
  });
});
