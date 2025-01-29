import { LitElement, html, css } from 'lit';

export class NavbarComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #2c3e50;
      padding: 1rem;
    }
    nav {
      display: flex;
      gap: 1rem;
    }
    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
    }
    a:hover {
      background: #34495e;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/vender">Vender</a>
        <a href="/productos">Productos</a>
      </nav>
    `;
  }
}
customElements.define('navbar-component', NavbarComponent);
