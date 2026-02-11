import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product-interface';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-products-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {

  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe(resp => {
      this.products = resp;
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => {
       this.loadProducts(); 
    });
  }


}
