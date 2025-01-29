import { LitElement, html, css } from 'lit';

export class ProductosComponent extends LitElement {
  static properties = {
    productos: { type: Array }
  };

  static styles = css`
    .productos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .producto-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  `;

  render() {
    return html`
      <div class="productos-grid">
        ${this.productos?.map(producto => html`
          <div class="producto-card">
            <img src=${producto.imagen} alt=${producto.nombre}>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button @click=${() => this._handleEdit(producto)}>Editar</button>
            <button @click=${() => this._handleDelete(producto)}>Eliminar</button>
          </div>
        `)}
      </div>
    `;
  }

  _handleEdit(producto) {
    // La lógica de edición se manejará en el controlador
  }

  _handleDelete(producto) {
    // La lógica de eliminación se manejará en el controlador
  }
}
customElements.define('productos-component', ProductosComponent);