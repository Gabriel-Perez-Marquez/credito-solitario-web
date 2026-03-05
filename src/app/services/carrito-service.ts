import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleLine, ShoppingList } from '../interfaces/shopping-list';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  constructor(private http: HttpClient) {}


  obtenerCarrito(): Observable<ShoppingList> {
    return this.http.get<ShoppingList>("http://127.0.0.1:8000/api/carrito");
  }

  agregarProducto(producto_id: number, cantidad: number = 1): Observable<SaleLine> {
    const body = { producto_id, cantidad };
    return this.http.post<SaleLine>("http://127.0.0.1:8000/api/carrito", body);
  }
  
}
