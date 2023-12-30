// @ts-check

const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 1,
});

export default class Placeholder extends HTMLElement {
  /**
   * @type {ShadowRoot}
   */
  #shadowRoot = this.attachShadow({ mode: "open" });

  /**
   * @type {number}
   */
  #width = 0;

  /**
   * @type {number}
   */
  #height = 0;

  /**
   * @type {HTMLParagraphElement}
   */
  #infoTarget = document.createElement("p");

  /**
   * @type {ResizeObserver}
   */
  #resizeObserver = new ResizeObserver(this.#onResize.bind(this));

  /**
   * @type {{ width?: number, height?: number}}}
   */
  #fixSize = {};

  connectedCallback() {
    this.#init();
  }

  #init() {
    const styleElement = document.createElement("style");

    styleElement.textContent = `
      :host {
        box-sizing: border-box;
        display: grid;
        place-items: center;
        width: var(--width, auto);
        height: var(--height, auto);
        background-color: #eee;
      }

      * {
        box-sizing: inherit;
      }

      .info {
        margin: 0;
        text-align: center;
      }
    `;

    const { width, height } = this.dataset;

    this.#fixSize = {
      width: width ? this.#parse(width) : undefined,
      height: height ? this.#parse(height) : undefined,
    };

    const { width: fixWidth, height: fixHeight } = this.#fixSize;

    if (fixWidth !== undefined) {
      this.style.setProperty("--width", `${fixWidth}px`);
    }

    if (fixHeight !== undefined) {
      this.style.setProperty("--height", `${fixHeight}px`);
    }

    this.#infoTarget.classList.add("info");
    this.#shadowRoot.appendChild(this.#infoTarget);
    this.#shadowRoot.appendChild(styleElement);
    this.#resizeObserver.observe(this);
    this.#setSize();
    this.#render();
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
  }

  #setSize() {
    const { width: rectWidth, height: rectHeight } =
      this.getBoundingClientRect();
    const { width: fixWidth, height: fixHeight } = this.#fixSize;
    const width = this.#parse(rectWidth.toString()) ?? 0;
    const height = this.#parse(rectHeight.toString()) ?? 0;

    this.#width = fixWidth ?? width;
    this.#height = fixHeight ?? height;
  }

  /**
   * @param {string} value
   * @returns {number|undefined}
   */
  #parse(value) {
    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }

  #render() {
    this.#infoTarget.textContent = `
      ${formatter.format(this.#width)} x ${formatter.format(this.#height)}
    `;
  }

  #onResize() {
    this.#setSize();
    this.#render();
  }
}
