interface HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void;
  adoptedCallback(): void;
}

declare module "*?raw" {
  const content: string;
  export default content;
}
