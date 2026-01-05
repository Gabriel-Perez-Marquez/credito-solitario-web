export type ClienteResponse = Cliente[]

export interface Cliente {
  id: number
  nombre: string
  apellidos: string
  telefono: string
  email: string
  direccion_id: number
  created_at: string
  updated_at: string
  direccion: Direccion
}

export interface Direccion {
  id: number
  municipio: string
  calle: string
  numCasa: string
  provincia: string
  created_at: string
  updated_at: string
}