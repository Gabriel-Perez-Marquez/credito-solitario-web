import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list-service';
import { LineaVentaInterface } from '../../interfaces/linea-venta-interface';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoriesService } from '../../services/categories-service';
import { Categoria } from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-shopping-list-page',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './shopping-list-page.html',
  styleUrl: './shopping-list-page.css',
})
export class ShoppingListPage {
  
  shoppingList: LineaVentaInterface[] | null = null;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  categorias: Categoria[] = [];
  successMessage: string | null = null;


  constructor(private shoppingService: ShoppingListService, private categoriaService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategorias();
    this.loadData();
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe(resp => {
      this.categorias = resp;
    });
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
    this.shoppingService.confirmOrder().subscribe({
      next: (resp) => {
        const pedidoId = resp?.data?.id;
        this.shoppingList = [];
        this.calculateTotals();
        this.successMessage = pedidoId
            ? `Pedido #${pedidoId} creado correctamente.`
            : 'Pedido creado correctamente.';
      },
      error: (err) => {
        const message = err?.error?.message || 'No se pudo crear el pedido';
        alert(message);
      },
    });
  }

  getNombreCategoria(id?: number) {
    if (!id) return 'Sin categoría';
    
    const cat = this.categorias.find(c => c.id === id);
    return cat ? cat.nombre : 'Cargando...';
  }

  
}
