export class ProductosController {
    constructor() {
      this.initializeComponent();
    }
  
    initializeComponent() {
      const productosComponent = document.querySelector('productos-component');
      if (productosComponent) {
        window.addEventListener('products-updated', (e) => {
          productosComponent.productos = e.detail.productos;
        });
      }
    }
  }