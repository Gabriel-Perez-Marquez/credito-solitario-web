import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from '../../interfaces/categorias.interface';
import { CategoriesService } from '../../services/categories-service';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard-service';


@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit{
  
  isLoading = true;

  stats = {
    totalClientes: 0,
    pedidosPendientes: 0,
    ingresosMes: 0,
    productosBajoStock: 0
  };

  ultimosPedidos: any[] = [];
  productosReponer: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard() {
    this.isLoading = true;

    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        const clientes = data.clientes;
        const pedidos = data.pedidos;
        const productos = data.productos;

        // 1. TOTAL DE CLIENTES
        this.stats.totalClientes = clientes.length;

        // 2. PEDIDOS PENDIENTES
        this.stats.pedidosPendientes = pedidos.filter((p: any) => p.estado?.nombre === 'Pendiente').length;

        // 3. INGRESOS DEL MES ACTUAL
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        let ingresos = 0;

        pedidos.forEach((p: any) => {
          const date = new Date(p.fechaPedido);
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            const lineas = p.lineas_venta || p.lineasVenta || [];
            const totalPedido = lineas.reduce((sum: number, linea: any) => sum + Number(linea.precioTotal), 0);
            ingresos += totalPedido;
          }
        });
        this.stats.ingresosMes = ingresos;

        // 4. PRODUCTOS CON BAJO STOCK (Menos de 5 unidades)
        const UMBRAL_STOCK = 5;
        const bajoStock = productos.filter((p: any) => p.stock < UMBRAL_STOCK);
        this.stats.productosBajoStock = bajoStock.length;

        // 5. TABLA: ÚLTIMOS 5 PEDIDOS
        this.ultimosPedidos = pedidos
          // Ordenamos por fecha de más nuevo a más viejo
          .sort((a: any, b: any) => new Date(b.fechaPedido).getTime() - new Date(a.fechaPedido).getTime())
          .slice(0, 5) 
          .map((p: any) => {
            const lineas = p.lineas_venta || p.lineasVenta || [];
            const totalPedido = lineas.reduce((sum: number, linea: any) => sum + Number(linea.precioTotal), 0);
            
            return {
              id: p.id,
              cliente: p.cliente ? `${p.cliente.nombre} ${p.cliente.apellidos}` : 'Desconocido',
              fecha: new Date(p.fechaPedido).toLocaleDateString('es-ES'),
              total: totalPedido,
              estado: p.estado?.nombre || 'Desconocido'
            };
          });

        // 6. TABLA: PRODUCTOS A REPONER (Los 5 con menos stock)
        this.productosReponer = bajoStock
          .sort((a: any, b: any) => a.stock - b.stock) 
          .slice(0, 5)
          .map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            stock: p.stock
          }));

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Error al cargar los datos del Dashboard:", err);
        this.isLoading = false;
      }
    });
  }
}
