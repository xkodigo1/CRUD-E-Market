import { LitElement, html, css } from 'lit';

export class crudComponent extends LitElement {
  static properties = {
    productos: { type: Array },
    showCreateForm: { type: Boolean },
    showEditForm: { type: Boolean },
    productoEdit: { type: Object }
  };

  static styles = css`
    .crud-buttons {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: #f5f5f5;
      margin-bottom: 1rem;
    }

    .crud-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .create { background: #2ecc71; color: white; }
    .edit { background: #3498db; color: white; }
    .delete { background: #e74c3c; color: white; }
    .list { background: #f1c40f; color: black; }

    .crud-button:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .form-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 500px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .productos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      padding: 2rem;
    }

    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 1rem;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      background: #f5f5f5;
    }
  `;

  constructor() {
    super();
    this.productos = [];
    this.showCreateForm = false;
    this.showEditForm = false;
    this.productoEdit = null;
  }

  render() {
    return html`
      <div class="crud-buttons">
        <button class="crud-button create" @click=${this._showCreateForm}>
          Crear Producto
        </button>
        <button class="crud-button list" @click=${this._loadProducts}>
          Listar Productos
        </button>
      </div>

      ${this.showCreateForm ? this._renderCreateForm() : ''}
      ${this.showEditForm ? this._renderEditForm() : ''}

      <div class="productos-grid">
        ${this.productos.map(producto => html`
          <div class="card">
            <img class="card-image" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
              <h3>${producto.nombre}</h3>
              <p>Código: ${producto.codigo}</p>
              <p>Precio: $${producto.precio}</p>
              <p>Stock: ${producto.stock}</p>
            </div>
            <div class="card-actions">
              <button class="crud-button edit" @click=${() => this._showEditForm(producto)}>
                Editar
              </button>
              <button class="crud-button delete" @click=${() => this._deleteProduct(producto.codigo)}>
                Eliminar
              </button>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _renderCreateForm() {
    return html`
      <div class="form-container">
        <form class="form" @submit=${this._createProduct}>
          <h2>Crear Nuevo Producto</h2>
          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" id="codigo" name="codigo" required>
          </div>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
          </div>
          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="number" id="precio" name="precio" step="0.01" required>
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="number" id="stock" name="stock" required>
          </div>
          <div class="form-group">
            <label for="imagen">URL Imagen</label>
            <input type="url" id="imagen" name="imagen" required>
          </div>
          <div class="crud-buttons">
            <button type="submit" class="crud-button create">Guardar</button>
            <button type="button" class="crud-button delete" @click=${this._hideForm}>Cancelar</button>
          </div>
        </form>
      </div>
    `;
  }

  _renderEditForm() {
    return html`
      <div class="form-container">
        <form class="form" @submit=${this._updateProduct}>
          <h2>Editar Producto</h2>
          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" id="codigo" name="codigo" value=${this.productoEdit.codigo} disabled>
          </div>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value=${this.productoEdit.nombre} required>
          </div>
          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="number" id="precio" name="precio" value=${this.productoEdit.precio} step="0.01" required>
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="number" id="stock" name="stock" value=${this.productoEdit.stock} required>
          </div>
          <div class="form-group">
            <label for="imagen">URL Imagen</label>
            <input type="url" id="imagen" name="imagen" value=${this.productoEdit.imagen} required>
          </div>
          <div class="crud-buttons">
            <button type="submit" class="crud-button edit">Actualizar</button>
            <button type="button" class="crud-button delete" @click=${this._hideForm}>Cancelar</button>
          </div>
        </form>
      </div>
    `;
  }

  _showCreateForm() {
    this.showCreateForm = true;
  }

  _showEditForm(producto) {
    this.productoEdit = producto;
    this.showEditForm = true;
  }

  _hideForm() {
    this.showCreateForm = false;
    this.showEditForm = false;
    this.productoEdit = null;
  }

  async _loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/productos');
      this.productos = await response.json();
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }

  async _createProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    
    try {
      const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        this._hideForm();
        this._loadProducts();
      }
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  }

  async _updateProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    product.codigo = this.productoEdit.codigo;
    
    try {
      const response = await fetch(`http://localhost:3000/productos/${this.productoEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        this._hideForm();
        this._loadProducts();
      }
    } catch (error) {
      console.error('Error actualizando producto:', error);
    }
  }

  async _deleteProduct(codigo) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3000/productos/${codigo}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          this._loadProducts();
        }
      } catch (error) {
        console.error('Error eliminando producto:', error);
      }
    }
  }
}

customElements.define('crud-component', crudComponent);
// export class ProductosComponent extends LitElement {
//   static properties = {
//     productos: { type: Array }
//   };

//   static styles = css`
//     .productos-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//       gap: 1rem;
//       padding: 1rem;
//     }
//     .producto-card {
//       border: 1px solid #ddd;
//       border-radius: 8px;
//       padding: 1rem;
//       text-align: center;
//     }
//     img {
//       max-width: 100%;
//       height: auto;
//     }
//   `;

//   render() {
//     return html`
//       <div class="productos-grid">
//         ${this.productos?.map(producto => html`
//           <div class="producto-card">
//             <img src=${producto.imagen} alt=${producto.nombre}>
//             <h3>${producto.nombre}</h3>
//             <p>$${producto.precio}</p>
//             <button @click=${() => this._handleEdit(producto)}>Editar</button>
//             <button @click=${() => this._handleDelete(producto)}>Eliminar</button>
//           </div>
//         `)}
//       </div>
//     `;
//   }

//   _handleEdit(producto) {
//     // La lógica de edición se manejará en el controlador
//   }

//   _handleDelete(producto) {
//     // La lógica de eliminación se manejará en el controlador
//   }
// }
// customElements.define('productos-component', ProductosComponent);