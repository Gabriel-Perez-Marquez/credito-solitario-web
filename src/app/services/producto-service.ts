import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, ProductosResponse } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  

  constructor(private http: HttpClient) {}

  getProductos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>('http://127.0.0.1:8000/api/productos');
  }

  createProducto (nombre:String, descripcion:String, categoria_id:number, precio:string, activo:boolean, descuento:string, stock:number, urlImagen:string): Observable<Producto> {

    const body = {nombre, descripcion, categoria_id, precio, activo, descuento, stock, urlImagen};
    return this.http.post<Producto>('http://127.0.0.1:8000/api/productos', body);
  }

  getProducto(productoId: number): Observable<Producto> {
    return this.http.get<Producto>(`http://127.0.0.1:8000/api/productos/${productoId}`);
  }

  editarProducto(productoId: number, nombre:String, descripcion:String, categoria_id:number, precio:string, activo:boolean, descuento:string, stock:number, urlImagen:string): Observable<Producto> {

    const body = {nombre, descripcion, categoria_id, precio, activo, descuento, stock, urlImagen};
    return this.http.put<Producto>(`http://127.0.0.1:8000/api/productos/${productoId}`, body);
  }

  deleteProducto(productoId: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/productos/${productoId}`);
  }
}