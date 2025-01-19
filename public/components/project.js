class Project extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "link"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute("title") || "Default Title";
    const link = this.getAttribute("link") || "#";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${import.meta.resolve('/public/css/styles.css')}">
      <div>
        <h1>${title}</h1>
        <p><slot>No additional content provided.</slot></p>
        <a href="${link}">Learn more</a>
      </div>
    `;
  }
}

customElements.define("x-project", Project);
export default Project;