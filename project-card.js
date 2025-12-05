class ProjectCard extends HTMLElement {
    static get observedAttributes() {
        return ['title','role','img-small','img-large','alt','link','link-text'];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <link rel="stylesheet" href="style.css">
            <article class="experience-item">
                <picture>
                    <source srcset="${this.getAttribute('img-small')}" media="(max-width: 700px)">
                    <source srcset="${this.getAttribute('img-large')}" media="(min-width: 701px)">
                    <img src="${this.getAttribute('img-large')}" alt="${this.getAttribute('alt')}">
                </picture>
                <div class="experience-content">
                    <h3>${this.getAttribute('title') || ''}</h3>
                    <p><i>${this.getAttribute('role') || ''}</i></p>
                    <ul>${this.innerHTML}</ul>
                    <a href="${this.getAttribute('link')}" target="_blank">${this.getAttribute('link-text') || 'Learn more'}</a>
                </div>
            </article>
        `;
    }
}

customElements.define("project-card", ProjectCard);
