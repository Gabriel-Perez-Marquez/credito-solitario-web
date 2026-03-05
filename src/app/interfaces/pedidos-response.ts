export type PedidosResponse = Pedido[];

export interface Pedido {
  id: number;
  nombre?: string | null;
  tipo?: 'venta' | 'reposicion' | string;
  cliente_id: number;
  estado_id: number;
  direccionEntrega: string;
  fechaPedido: string;
  fechaEntrega?: string | null;
  created_at?: string;
  updated_at?: string;
  cliente?: PedidoCliente;
  estado?: PedidoEstado;
  lineas_venta?: PedidoLineaVenta[];
  lineasVenta?: PedidoLineaVenta[];
}

export interface PedidoCliente {
  id: number;
  nombre: string;
  apellidos?: string;
  email?: string;
}

export interface PedidoEstado {
  id: number;
  nombre: string;
}

export interface PedidoLineaVenta {
  id: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precioUnidad: number | string;
  precioTotal: number | string;
}
