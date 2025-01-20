class Social extends HTMLElement {
    constructor() {
      super();
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
      const arialLabel = this.getAttribute("aria-label") || "";
  
      this.innerHTML = `
          <a href="${href}" aria-label="${arialLabel}" role="link" target="_blank" rel="noopener noreferrer">
                   <img src="${src}" alt="${alt}" />
          </a>
      `;
    }
  }
  
  customElements.define("x-social", Social);
  export default Social;