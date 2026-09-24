import { describe, expect, it } from "vitest";

import { formatSessionLevel } from "./format-session-level";

describe("formatSessionLevel", () => {
  it("capitalizes the first letter of each level", () => {
    expect(formatSessionLevel("beginner")).toBe("Beginner");
    expect(formatSessionLevel("intermediate")).toBe("Intermediate");
    expect(formatSessionLevel("advanced")).toBe("Advanced");
  });
});
