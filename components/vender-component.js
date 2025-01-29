import { LitElement, html, css } from 'lit';

export class VenderComponent extends LitElement {
  static properties = {
    producto: { type: Object }
  };

  static styles = css`
    form {
      display: grid;
      gap: 1rem;
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .form-group {
      display: grid;
      gap: 0.5rem;
    }
    input, button {
      padding: 0.5rem;
    }
  `;

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <div class="form-group">
          <label for="codigo">Código:</label>
          <input type="text" id="codigo" required>
        </div>
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" required>
        </div>
        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" id="stock" required min="0">
        </div>
        <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" required min="0" step="0.01">
        </div>
        <div class="form-group">
          <label for="imagen">Imagen URL:</label>
          <input type="url" id="imagen" required>
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    `;
  }

  _handleSubmit(e) {
    e.preventDefault();
    // La lógica de submit se manejará en el controlador
  }
}
customElements.define('vender-component', VenderComponent);
