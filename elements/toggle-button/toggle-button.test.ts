import { afterEach, expect, test } from "vitest";
import ToggleButton from ".";

customElements.define("x-toggle-button", ToggleButton, { extends: "button" });

afterEach(() => {
  document.body.innerHTML = "";
});

test(`"When 'aria-pressed' is not specified, 'aria-pressed="false"' is added."`, () => {
  const toggleButton = document.createElement("button", {
    is: "x-toggle-button",
  });

  document.body.appendChild(toggleButton);

  expect(toggleButton.getAttribute("aria-pressed")).toBe("false");
});

test.each([
  { ariaPressed: "true", expected: "true" },
  { ariaPressed: "false", expected: "false" },
])(
  "When 'aria-pressed' is specified, it is not changed.",
  ({ ariaPressed, expected }) => {
    const toggleButton = document.createElement("button", {
      is: "x-toggle-button",
    });

    toggleButton.setAttribute("aria-pressed", ariaPressed);

    document.body.appendChild(toggleButton);

    expect(toggleButton.getAttribute("aria-pressed")).toBe(expected);
  },
);

test('button click toggles "aria-pressed"', () => {
  const toggleButton = document.createElement("button", {
    is: "x-toggle-button",
  });

  document.body.appendChild(toggleButton);

  toggleButton.click();

  expect(toggleButton.getAttribute("aria-pressed")).toBe("true");

  toggleButton.click();

  expect(toggleButton.getAttribute("aria-pressed")).toBe("false");
});
