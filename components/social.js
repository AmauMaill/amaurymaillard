class Social extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get observedAttributes() {
      return ["src", "alt", "href"];
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
      const src = this.getAttribute("src") || "";
      const alt = this.getAttribute("alt") || "";
      const href = this.getAttribute("href") || "#";
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${import.meta.resolve('/assets/css/styles.css')}">
        <div>
          ${
            src
              ? `<a href="${href}" target="_blank" rel="noopener noreferrer">
                   <img src="${src}" alt="${alt}" />
                 </a>`
              : `<p>No SVG provided.</p>`
          }
        </div>
      `;
    }
  }
  
  customElements.define("x-social", Social);
  export default Social;