import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto-service';
import { RouterLink } from "@angular/router";




@Component({
  selector: 'app-products-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit{


  constructor(private productoService: ProductoService) {}

  products: Producto[] = [];
    

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(resp => {
      this.products = resp;
    });
  }

  deleteProduct(id: number){
    this.productoService.deleteProducto(id).subscribe(() => {
      this.productoService.getProductos().subscribe(resp => {
        this.products = resp;
      });
    });
  }


}
