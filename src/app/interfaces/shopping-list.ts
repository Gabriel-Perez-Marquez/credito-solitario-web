import { Producto } from "./producto.interface"

export type ShoppingList = SaleLine[]

export interface SaleLine {
  id: number
  producto_id: number
  cantidad: number
  prioridad: string
  created_at: string
  updated_at: string
  producto: Producto
}