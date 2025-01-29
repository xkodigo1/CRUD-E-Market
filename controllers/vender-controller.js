export class VenderController {
    constructor() {
      this.initializeComponent();
    }
  
    initializeComponent() {
      const venderComponent = document.querySelector('vender-component');
      if (venderComponent) {
        // Escuchar actualizaciones de productos
        window.addEventListener('products-updated', (e) => {
          venderComponent.productos = e.detail.productos;
        });
      }
    }
  }