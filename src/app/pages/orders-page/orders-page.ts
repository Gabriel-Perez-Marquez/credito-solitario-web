import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pedido } from '../../interfaces/pedidos-response';
import { OrdersService } from '../../services/orders-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage {
  orders: Pedido[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  successMessage: string | null = null;
  orderToFinish: Pedido | null = null;
  private successMessageTimeout: any = null;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.errorMessage = null;
    this.ordersService.getOrders().subscribe({
      next: (resp) => {
        this.orders = resp;
        this.isLoading = false;
      },
      error: () => {
        this.orders = [];
        this.errorMessage = 'No se pudieron cargar los pedidos.';
        this.isLoading = false;
      },
    });
  }

  getOrderTotal(order: Pedido): number {
    const lines = order.lineasVenta ?? order.lineas_venta ?? [];

    return lines.reduce((acc, line) => {
      const lineTotal =
        Number(line.precioTotal) ||
        Number(line.precioUnidad || 0) * Number(line.cantidad || 0);
      return acc + lineTotal;
    }, 0);
  }

  getStatusClass(statusName?: string): string {
    const normalized = (statusName || '').toLowerCase();

    if (normalized.includes('listo') || normalized.includes('complet')) {
      return 'badge bg-success bg-opacity-25 text-success';
    }
    if (normalized.includes('proceso') || normalized.includes('pendiente')) {
      return 'badge bg-warning bg-opacity-25 text-warning';
    }
    return 'badge bg-primary bg-opacity-25 text-primary';
  }

  getOrderTypeClass(orderType?: string): string {
    const normalized = (orderType || 'venta').toLowerCase();
    if (normalized === 'reposicion') {
      return 'badge bg-info bg-opacity-25 text-info';
    }
    return 'badge bg-secondary bg-opacity-25 text-secondary';
  }

  prepareFinish(order: Pedido) {
    this.orderToFinish = order;
  }

  confirmFinish() {
    if (!this.orderToFinish) return;

    const ID_ESTADO_FINALIZADO = 2; 

    this.ordersService.updateOrderStatus(this.orderToFinish.id, ID_ESTADO_FINALIZADO).subscribe({
      next: () => {
        this.showSuccessMessage(`Pedido #${this.orderToFinish!.id} finalizado correctamente.`);
        this.orderToFinish = null; 
        this.loadOrders(); 
      },
      error: () => {
        this.errorMessage = 'Error al actualizar el estado del pedido.';
        this.orderToFinish = null;
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
    }, 3000); 
  }

}
