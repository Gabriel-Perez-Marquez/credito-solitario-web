export type CategoriesResponse = Categoria[]

export interface Categoria {
  id: number
  nombre: string
  activa: boolean
  created_at: string
  updated_at: string
}
