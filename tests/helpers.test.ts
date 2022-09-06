import { assert, expect, test } from "vitest";
import { getMaxProperty } from "../src/helpers";
import { countLanguages } from "../src/helpers/repos";

// Edit an assertion and save to see HMR in action

test("Test getMaxProperty()", () => {
  const object = { javascript: 10, css: 20, html: 30 };
  expect(getMaxProperty(object)).toBe("html");
});

test("Test countLanguages()", () => {
  const data = [
    { language: "css" },
    { language: "css" },
    { language: "javascript" },
    { language: "null" },
  ];
  expect(countLanguages(data).css).toBe(2);
  expect(countLanguages(data).javascript).toBe(1);
});
