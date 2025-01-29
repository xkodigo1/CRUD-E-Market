export class ProductController {
    constructor() {
      this.productos = [];
      this.initializeEventListeners();
      this.loadProducts();
    }
  
    initializeEventListeners() {
      window.addEventListener('product-create', (e) => this.createProduct(e.detail.product));
      window.addEventListener('product-update', (e) => this.updateProduct(e.detail.product));
      window.addEventListener('product-delete', (e) => this.deleteProduct(e.detail.codigo));
    }
  
    async loadProducts() {
      try {
        const response = await fetch('http://localhost:3000/productos');
        this.productos = await response.json();
        this.dispatchProductsUpdate();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  
    async createProduct(product) {
      try {
        const response = await fetch('http://localhost:3000/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        
        if (response.ok) {
          await this.loadProducts();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error creating product:', error);
        return false;
      }
    }
  
    async updateProduct(product) {
      try {
        const response = await fetch(`http://localhost:3000/productos/${product.codigo}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        
        if (response.ok) {
          await this.loadProducts();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating product:', error);
        return false;
      }
    }
  
    async deleteProduct(codigo) {
      try {
        const response = await fetch(`http://localhost:3000/productos/${codigo}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await this.loadProducts();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error deleting product:', error);
        return false;
      }
    }
  
    dispatchProductsUpdate() {
      window.dispatchEvent(new CustomEvent('products-updated', {
        detail: { productos: this.productos }
      }));
    }
  }