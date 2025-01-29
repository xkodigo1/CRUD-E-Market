import { LitElement, html, css } from 'lit';

export class VenderComponent extends LitElement {
  static properties = {
    productos: { type: Array }
  };

  static styles = css`
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
      transition: transform 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }

    .card-content {
      padding: 1rem;
    }

    .card-title {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    .card-price {
      font-size: 1.5rem;
      color: #2c3e50;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .card-stock {
      color: #666;
      margin-bottom: 1rem;
    }

    .card-code {
      font-size: 0.9rem;
      color: #999;
      margin-bottom: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.productos = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/productos');
      this.productos = await response.json();
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }

  render() {
    return html`
      <div class="productos-grid">
        ${this.productos.map(producto => html`
          <div class="card">
            <img 
              class="card-image" 
              src="${producto.imagen}" 
              alt="${producto.nombre}"
            >
            <div class="card-content">
              <div class="card-code">Código: ${producto.codigo}</div>
              <h3 class="card-title">${producto.nombre}</h3>
              <div class="card-stock">Stock: ${producto.stock} unidades</div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('vender-component', VenderComponent);