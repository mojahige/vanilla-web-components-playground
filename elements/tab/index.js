// @ts-check

export default class Tab extends HTMLDivElement {
  /**
   * @type {HTMLElement|null}
   */
  tabList = null;

  /**
   * @type {HTMLElement[]}
   */
  tabs = [];

  /**
   * @type {HTMLElement[]}
   */
  tabPanels = [];

  constructor() {
    super();

    this.onKeydown = this.onKeydown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.destroy();
  }

  init() {
    this.tabList = this.querySelector('[role="tablist"]');
    this.tabs = Array.from(
      this.tabList?.querySelectorAll('[role="tab"]') ?? [],
    );
    this.tabPanels = Array.from(this.querySelectorAll('[role="tabpanel"]'));

    const userSelectedTabIndex = this.tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );

    this.update(userSelectedTabIndex === -1 ? 0 : userSelectedTabIndex);
    this.tabList?.addEventListener("keydown", this.onKeydown);
    this.tabList?.addEventListener("click", this.onClick);
  }

  destroy() {
    this.tabList?.removeEventListener("keydown", this.onKeydown);
    this.tabList?.removeEventListener("click", this.onClick);
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    const { target, key } = event;

    if (!target || !(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest('[role="tab"]');

    if (!(button instanceof HTMLElement)) {
      return;
    }

    const activeTabIndex = this.tabs.indexOf(button);

    /** @type {{ [key: string]: () => number }} */
    const keyActions = {
      ArrowLeft: () => Math.max(activeTabIndex - 1, 0),
      ArrowRight: () => Math.min(activeTabIndex + 1, this.tabs.length - 1),
      Home: () => 0,
      End: () => this.tabs.length - 1,
    };

    const updateIndex = keyActions[key]?.();

    if (updateIndex !== undefined) {
      event.stopPropagation();
      event.preventDefault();
      this.update(updateIndex, true);
    }
  }

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    const { target } = event;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest('[role="tab"]');

    if (
      !(button instanceof HTMLElement) ||
      button.getAttribute("aria-selected") === "true"
    ) {
      return;
    }

    this.update(this.tabs.indexOf(button));
  }

  /**
   * @param {number} index
   * @param {boolean} [setFocus]
   */
  update(index, setFocus) {
    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i];
      const tabPanel = this.tabPanels[i];
      const isActive = i === index;

      tab?.setAttribute("aria-selected", isActive ? "true" : "false");
      tab?.setAttribute("tabindex", isActive ? "0" : "-1");
      tabPanel?.classList.toggle("is-shown", isActive);
    }

    if (setFocus) {
      this.tabs[index]?.focus();
    }
  }
}
