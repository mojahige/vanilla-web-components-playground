import { fixture, html } from "@open-wc/testing";
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
    const el = await fixture<Placeholder>(
      html`<x-placeholder data-width="${value}"></x-placeholder>`,
    );

    expect(el.style.getPropertyValue("--width")).toBe(expected);
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
    const el = await fixture<Placeholder>(
      html`<x-placeholder data-height="${value}"></x-placeholder>`,
    );

    expect(el.style.getPropertyValue("--height")).toBe(expected);
  },
);
