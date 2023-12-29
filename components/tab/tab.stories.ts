import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import Tab from ".";

import "./tab.css";

customElements.define("x-tab", Tab, { extends: "div" });

const meta: Meta = {
  title: "Customized built-in element/Tab",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const AutoInitialSelect: Story = {
  render: () => html`
  <div is="x-tab">
    <h1 id="tab">Tab</h1>

    <div role="tablist" aria-labelledby="tab">
      <button id="tab-1" type="button" role="tab" aria-controls="tabpanel-1">
        Tab 1
      </button>

      <button id="tab-2" type="button" role="tab" aria-controls="tabpanel-2">
        Tab 2
      </button>

      <button id="tab-3" type="button" role="tab" aria-controls="tabpanel-3">
        Tab 3
      </button>
    </div>

    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
      <p>Tab Panel 1</p>
    </div>

    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
      <p>Tab Panel 2</p>
    </div>

    <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
      <p>Tab Panel 3</p>
    </div>
  </div>
  `,
};

export const UserInitialSelect: Story = {
  render: () => html`
  <div is="x-tab">
    <h1 id="tab">Tab</h1>

    <div role="tablist" aria-labelledby="tab">
      <button id="tab-1" type="button" role="tab" aria-controls="tabpanel-1">
        Tab 1
      </button>

      <button
        id="tab-2"
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="tabpanel-2"
      >
        Tab 2
      </button>

      <button id="tab-3" type="button" role="tab" aria-controls="tabpanel-3">
        Tab 3
      </button>
    </div>

    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
      <p>Tab Panel 1</p>
    </div>

    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
      <p>Tab Panel 2</p>
    </div>

    <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
      <p>Tab Panel 3</p>
    </div>
  </div>
  `,
};
