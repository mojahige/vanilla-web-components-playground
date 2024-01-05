import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import ToggleButton from ".";

import "./toggle-button.css";

customElements.define("x-toggle-button", ToggleButton, { extends: "button" });

const meta: Meta = {
  title: "Customized built-in element/ToggleButton",
  tags: ["autodocs"],
  render: () => html`<button is="x-toggle-button">Toggle Button</button>`,
};

export default meta;
type Story = StoryObj;

export const Example: Story = {};
