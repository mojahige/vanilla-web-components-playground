// @ts-check

export default class ToggleButton extends HTMLButtonElement {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }

  init() {
    if (!this.getAttribute("aria-pressed")) {
      this.setAttribute("aria-pressed", "false");
    }

    this.addEventListener("click", this.onClick);
  }

  onClick() {
    this.setAttribute(
      "aria-pressed",
      String(!(this.getAttribute("aria-pressed") === "true")),
    );
  }
}
