import { expect, test } from "vitest";
import Placeholder from ".";

customElements.define("x-placeholder", Placeholder);

test.each([
  {
    value: "100",
    expected: "100px",
  },
  {
    value: "foo",
    expected: "",
  },
])(
  "For data-width=$value, the value of the custom property is $expected",
  async ({ value, expected }) => {
    const xPlaceholder = document.createElement("x-placeholder");

    xPlaceholder.setAttribute("data-width", value);
    document.body.appendChild(xPlaceholder);

    expect(xPlaceholder.style.getPropertyValue("--width")).toBe(expected);
  },
);

test.each([
  {
    value: "100",
    expected: "100px",
  },
  {
    value: "foo",
    expected: "",
  },
])(
  "For data-height=$value, the value of the custom property is $expected",
  async ({ value, expected }) => {
    const xPlaceholder = document.createElement("x-placeholder");

    xPlaceholder.setAttribute("data-height", value);
    document.body.appendChild(xPlaceholder);

    expect(xPlaceholder.style.getPropertyValue("--height")).toBe(expected);
  },
);
