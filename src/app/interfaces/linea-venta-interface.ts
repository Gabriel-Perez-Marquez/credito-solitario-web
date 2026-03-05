import { Product } from "./product-interface";

export interface LineaVentaInterface {
    id: number;
    producto_id: number;
    cantidad: number;
    prioridad: 'Baja' | 'Media' | 'Alta';
    created_at?: string;
    updated_at?: string;
    producto: Product;
}