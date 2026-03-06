import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product-interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-list-service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-products-page',
  imports: [CommonModule, RouterLink, FormsModule, RouterLinkActive],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit{

  products: Product[] = [];
  searchTerm = '';
  sortBy = '';
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  successMessageTimeout: any = null;
  productToDelete: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.errorMessage = null;
    this.productsService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
        this.isLoading = false;
      },
      error: () => {
        this.products = [];
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.isLoading = false;
      }
    });
  }

  prepareDelete(product: Product) {
    this.productToDelete = product;
  }

  confirmDelete() {
    if (!this.productToDelete) return;

    this.productsService.deleteProduct(this.productToDelete.id).subscribe({
      next: () => {
        this.showSuccessMessage(`Producto "${this.productToDelete!.nombre}" eliminado correctamente.`);
        this.productToDelete = null; 
        this.loadProducts(); 
      },
      error: () => {
        this.productToDelete = null;
        this.errorMessage = 'No se puede eliminar el producto ya que tiene pedidos asignados.';
      }
    });
  }

  toggleVisibility(product: Product) {
    const updatedProduct: any = {
      nombre: product.nombre,
      urlImagen: product.urlImagen,
      stock: product.stock,
      precio: product.precio,
      categoria_id: product.categoria_id,
      descripcion: product.descripcion,
      activo: !product.activo
    };
    
    this.productsService.updateProduct(product.id, updatedProduct).subscribe({
      next: () => {
        product.activo = !product.activo; 
        this.showSuccessMessage(`Producto marcado como ${product.activo ? 'Activo' : 'Inactivo'}.`);
      },
      error: () => {
        this.errorMessage = 'No se pudo actualizar el estado del producto. Por favor, inténtalo de nuevo.';
      }
    });
  }

  addToCart(productId: number) {
    this.shoppingListService.addItem(productId, 1, 'Media').subscribe({
      next: () => this.showSuccessMessage('Producto agregado al carrito'),
      error: () => {
        this.errorMessage = 'No se pudo agregar el producto al carrito.';
      }
    });
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;

    if (this.successMessageTimeout) {
      clearTimeout(this.successMessageTimeout);
    }

    this.successMessageTimeout = setTimeout(() => {
      this.successMessage = null;
      this.successMessageTimeout = null;
    }, 2500);
  }

  get filteredAndSortedProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();

    let result = this.products.filter((product) => {
      if (!term) return true;
      return (
        product.nombre?.toLowerCase().includes(term) ||
        product.descripcion?.toLowerCase().includes(term)
      );
    });

    result = [...result];

    switch (this.sortBy) {
      case 'nombre-asc':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        result.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precio-asc':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'stock-asc':
        result.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        result.sort((a, b) => b.stock - a.stock);
        break;
    }

    return result;
  }


}
