import { Categoria } from "./categorias.interface"

export type ProductosResponse = Producto[]

export interface Producto {
  nombre: string
  descripcion: string
  categoria_id: number
  precio: string
  activo: boolean
  descuento: string
  stock: number
  urlImagen: string
  updated_at: string
  created_at: string
  id: number
  categoria: Categoria
}
