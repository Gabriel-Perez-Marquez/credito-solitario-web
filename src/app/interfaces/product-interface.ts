export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  urlImagen: string; 
  categoria_id?: number;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}