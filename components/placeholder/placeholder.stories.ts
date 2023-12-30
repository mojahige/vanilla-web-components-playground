import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import Placeholder from ".";

customElements.define("x-placeholder", Placeholder);

const meta: Meta = {
  title: "Autonomous custom element/Placeholder",
  tags: ["autodocs"],
  argTypes: {
    "data-width": {
      control: false,
      defaultValue: undefined,
      description: "Width of the placeholder",
    },
    "data-height": {
      control: false,
      defaultValue: undefined,
      description: "Height of the placeholder",
    },
  },
  render: ({ "data-width": width, "data-height": height }) =>
    html`
      <x-placeholder
        data-width=${width ?? nothing}
        data-height=${height ?? nothing}
      ></x-placeholder>`,
};

export default meta;
type Story = StoryObj;

export const Auto: Story = {
  args: {
    "data-width": undefined,
    "data-height": undefined,
  },
};

export const FixWidth: Story = {
  args: {
    ...Auto.args,
    "data-width": "200",
  },
};

export const FixHeight: Story = {
  args: {
    ...Auto.args,
    "data-height": "200",
  },
};

export const FixSize: Story = {
  args: {
    "data-width": "200",
    "data-height": "200",
  },
};
