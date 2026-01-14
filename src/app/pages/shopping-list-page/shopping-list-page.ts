import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../../interfaces/shopping-list';
import { CarritoService } from '../../services/carrito-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.css',
})
export class ShoppingListPage implements OnInit{

  saleLines: ShoppingList = [];
  totalBase: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(resp => {
      this.saleLines = resp;
    });
  }
  
  calculateTotals() {
    this.totalBase = 0;
    
    for (const line of this.saleLines) {
      const precio = Number(line.producto.precio); 
      const cantidad = Number(line.cantidad);
      
      this.totalBase += precio * cantidad;
    }

    this.iva = this.totalBase * 0.21;
    this.total = this.totalBase + this.iva;
  }

  getSubtotal(line: any): number {
    const precio = Number(line.producto.precio);
    const cantidad = Number(line.cantidad);
    return precio * cantidad;
  }

}
