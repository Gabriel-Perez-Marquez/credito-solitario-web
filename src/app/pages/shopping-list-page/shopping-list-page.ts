import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list-service';
import { LineaVentaInterface } from '../../interfaces/linea-venta-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-page',
  imports: [FormsModule],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.css',
})
export class ShoppingListPage {
  
  shoppingList: LineaVentaInterface[] | null = null;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.shoppingService.getShoppingList().subscribe(resp => {
       
      this.shoppingList = resp;
      this.calculateTotals();
      
    });
  }

  calculateTotals() {
    this.subtotal = this.shoppingList!.reduce((acc, line) => {
      const precio = Number(line.producto.precio) || 0;
      return acc + (precio * line.cantidad);
    }, 0);

    this.iva = this.subtotal * 0.21;
    this.total = this.subtotal + this.iva;
  }

  onLineChange(line: LineaVentaInterface) {
    if (line.cantidad < 1) line.cantidad = 1;
    
    this.shoppingService.updateItem(line.id, line.cantidad, line.prioridad).subscribe(() => {
      this.calculateTotals()
    });
  }

  deleteLine(id: number) {
    if(!confirm('¿Estás seguro de eliminar este producto?')) return;

    this.shoppingService.deleteItem(id).subscribe(() => {
      this.shoppingList = this.shoppingList!.filter(l => l.id !== id);
      this.calculateTotals();
    });
  }

  processOrder() {
    this.shoppingService.confirmRestock().subscribe(() => {

      alert('Pedido confirmado y stock actualizado.');
      this.shoppingList = [];
      this.calculateTotals();
      
    });
  }
}