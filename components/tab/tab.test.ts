import { beforeEach, describe, expect, test } from "vitest";
import Tab from ".";

customElements.define("x-tab", Tab, { extends: "div" });

test('If aria-selected="true" is not specified. Only the first tab is selected.', async () => {
  const tab = document.createElement("div", { is: "x-tab" });

  tab.innerHTML = `
    <div role="tablist" aria-label="test">
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
  `;

  document.body.appendChild(tab);

  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  for (const [index, tab] of tabs.entries()) {
    if (index === 0) {
      expect(tab.getAttribute("aria-selected")).toBe("true");
    } else {
      expect(tab.getAttribute("aria-selected")).toBe("false");
    }
  }

  for (const [index, tabPanel] of tabPanels.entries()) {
    if (index === 0) {
      expect(tabPanel.classList.contains("is-shown")).toBe(true);
    } else {
      expect(tabPanel.classList.contains("is-shown")).toBe(false);
    }
  }

  document.body.removeChild(tab);
});

test.each([
  {
    tabsTemplate: `
      <button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
        Tab 1
      </button>
      <button id="tab-2" type="button" role="tab" aria-controls="tabpanel-2">
        Tab 2
      </button>
      <button id="tab-3" type="button" role="tab" aria-controls="tabpanel-3">
        Tab 3
      </button>`,
    selectedIndex: 0,
  },
  {
    tabsTemplate: `
      <button id="tab-1" type="button" role="tab" aria-controls="tabpanel-1">
        Tab 1
      </button>
      <button id="tab-2" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-2">
        Tab 2
      </button>
      <button id="tab-3" type="button" role="tab" aria-controls="tabpanel-3">
        Tab 3
      </button>`,
    selectedIndex: 1,
  },
  {
    tabsTemplate: `
      <button id="tab-1" type="button" role="tab" aria-controls="tabpanel-1">
        Tab 1
      </button>
      <button id="tab-2" type="button" role="tab" aria-controls="tabpanel-2">
        Tab 2
      </button>
      <button id="tab-3" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-3">
        Tab 3
      </button>`,
    selectedIndex: 2,
  },
])(
  'If there is a tab with aria-selected="true", it will be followed.',
  ({ tabsTemplate, selectedIndex }) => {
    const tab = document.createElement("div", { is: "x-tab" });

    tab.innerHTML = `
      <div role="tablist" aria-label="test">
        ${tabsTemplate}
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
    `;

    document.body.appendChild(tab);

    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    for (const [index, tab] of tabs.entries()) {
      if (index === selectedIndex) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === selectedIndex) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }

    document.body.removeChild(tab);
  },
);

test("Click tab to change selected status.", async () => {
  const tab = document.createElement("div", { is: "x-tab" });

  tab.innerHTML = `
    <div role="tablist" aria-label="test">
      <button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
        Tab 1
      </button>

      <button id="tab-2" type="button" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabpanel-2">
        Tab 2
      </button>

      <button id="tab-3" type="button" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabpanel-3">
        Tab 3
      </button>
    </div>

    <div id="tabpanel-1" class="is-shown" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
      <p>Tab Panel 1</p>
    </div>

    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
      <p>Tab Panel 2</p>
    </div>

    <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
      <p>Tab Panel 3</p>
    </div>
  `;

  document.body.appendChild(tab);

  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  // At the start, it does not start from 0 because the first tab is in the selected state.
  for (const clickTabIndex of [1, 2, 0]) {
    const tab = tabs[clickTabIndex];

    if (tab && tab instanceof HTMLButtonElement) {
      tab.click();
    }

    for (const [index, tab] of tabs.entries()) {
      if (index === clickTabIndex) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === clickTabIndex) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  }

  document.body.removeChild(tab);
});

describe("Keydown", async () => {
  beforeEach(() => {
    const tab = document.createElement("div", { is: "x-tab" });

    tab.innerHTML = `
      <div role="tablist" aria-label="test">
        <button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
          Tab 1
        </button>
  
        <button id="tab-2" type="button" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabpanel-2">
          Tab 2
        </button>
  
        <button id="tab-3" type="button" role="tab" tabindex="-1" aria-selected="false" aria-controls="tabpanel-3">
          Tab 3
        </button>
      </div>
  
      <div id="tabpanel-1" class="is-shown" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
        <p>Tab Panel 1</p>
      </div>
  
      <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2">
        <p>Tab Panel 2</p>
      </div>
  
      <div id="tabpanel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3">
        <p>Tab Panel 3</p>
      </div>
    `;

    document.body.appendChild(tab);

    return () => {
      document.body.removeChild(tab);
    };
  });

  test("The right cursor key can be used to select the next tab.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    // first tab to second tab
    if (tabs[0] && tabs[0] instanceof HTMLButtonElement) {
      tabs[0].click();
    }

    tabs[0]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 1) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 1) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }

    //Automatically switches focus when changing the selection state with the keyboard.
    const activeTab = document.activeElement;

    // second tab to third tab
    activeTab?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 2) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 2) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });

  test("If the right cursor key is pressed while the last tab is selected, the selection status does not change.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (tabs[2] && tabs[2] instanceof HTMLButtonElement) {
      tabs[2].click();
    }

    tabs[2]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 2) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 2) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });

  test("The left cursor key can be used to select the previous tab.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    // third tab to second tab
    if (tabs[2] && tabs[2] instanceof HTMLButtonElement) {
      tabs[2].click();
    }

    tabs[2]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 1) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 1) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }

    //Automatically switches focus when changing the selection state with the keyboard.
    const activeTab = document.activeElement;

    // second tab to third tab
    activeTab?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 0) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 0) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });

  test("If the left cursor key is pressed while the first tab is selected, the selection status does not change.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (tabs[0] && tabs[0] instanceof HTMLButtonElement) {
      tabs[0].click();
    }

    tabs[0]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 0) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 0) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });

  test("The Home key can be used to select the first tab.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (tabs[2] && tabs[2] instanceof HTMLButtonElement) {
      tabs[2].click();
    }

    tabs[2]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Home",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 0) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 0) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });

  test("The End key can be used to select the last tab.", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    if (tabs[0] && tabs[0] instanceof HTMLButtonElement) {
      tabs[0].click();
    }

    tabs[0]?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "End",
        cancelable: true,
        bubbles: true,
      }),
    );

    for (const [index, tab] of tabs.entries()) {
      if (index === 2) {
        expect(tab.getAttribute("aria-selected")).toBe("true");
      } else {
        expect(tab.getAttribute("aria-selected")).toBe("false");
      }
    }

    for (const [index, tabPanel] of tabPanels.entries()) {
      if (index === 2) {
        expect(tabPanel.classList.contains("is-shown")).toBe(true);
      } else {
        expect(tabPanel.classList.contains("is-shown")).toBe(false);
      }
    }
  });
});
