import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


export interface Product {
  id:number,
  nombre:String,
  precio:number,
  stock:number,
  urlImagen: String
}


@Component({
  selector: 'app-products-page',
  imports: [CommonModule],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {

  products: Product[] = [
    {
      id: 1,
      nombre: "Laptop HP",
      precio: 15000,
      stock: 10,
      urlImagen: "https://www.hp.com/es-es/shop/Html/Merch/Images/c08502053_1750x1285.jpg"
    },
    {
      id: 2,
      nombre: "Mouse Inalámbrico",
      precio: 350,
      stock: 25,
      urlImagen: "https://m.media-amazon.com/images/I/314Bb3srrCL._SS200_.jpg"
    },
    {
      id: 3,
      nombre: "Teclado Mecánico",
      precio: 1200,
      stock: 15,
      urlImagen: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8435693106340_1.jpg"
    },
    {
      id: 4,
      nombre: "Teclado Mecánico",
      precio: 1200,
      stock: 15,
      urlImagen: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8435693106340_1.jpg"
    },
    {
      id: 5,
      nombre: "Teclado Mecánico",
      precio: 1200,
      stock: 15,
      urlImagen: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8435693106340_1.jpg"
    }
  ]


}
