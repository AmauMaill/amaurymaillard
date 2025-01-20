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
    const linkELem = document.createElement("link");
    linkELem.setAttribute("rel", "stylesheet");
    linkELem.setAttribute("href", "public/css/styles.css")

    const title = this.getAttribute("title") || "Default Title";
    const link = this.getAttribute("link") || "#";

    const style = document.createElement("style");
    style.textContent = `
    h1 {
      font-size: 1.5rem;
    }
    `

    this.shadowRoot.innerHTML = `
      <div>
        <h1>${title}</h1>
        <p><slot>No additional content provided.</slot></p>
        <a href="${link}" target="_blank" rel="noopener noreferrer">En savoir plus !</a>
      </div>
    `;

    this.shadowRoot.appendChild(linkELem); // Global style
    this.shadowRoot.appendChild(style); // Custom style

    // Ajout des attributs aux liens dans le slot
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
        slot.addEventListener('slotchange', () => {
            const assignedElements = slot.assignedNodes({ flatten: true });
            assignedElements.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
                    node.setAttribute('target', '_blank');
                    node.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });
    }
  }
}

customElements.define("x-project", Project);
export default Project;