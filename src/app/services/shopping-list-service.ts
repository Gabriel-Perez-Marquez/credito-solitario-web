import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineaVentaInterface } from '../interfaces/linea-venta-interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  private apiUrl = 'http://127.0.0.1:8000/api/shopping-list';

  constructor(private http: HttpClient) {}


  getShoppingList(): Observable<LineaVentaInterface[]> {
    return this.http.get<LineaVentaInterface[]>(this.apiUrl);
  }


  addItem(producto_id: number, cantidad: number = 1, prioridad: string = 'Media'): Observable<LineaVentaInterface> {
    return this.http.post<LineaVentaInterface>(this.apiUrl, { producto_id, cantidad, prioridad });
  }


  updateItem(id: number, cantidad: number, prioridad: string): Observable<LineaVentaInterface> {
    return this.http.put<LineaVentaInterface>(`${this.apiUrl}/${id}`, { cantidad, prioridad });
  }


  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  confirmRestock(): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-restock`, {});
  }
  
}
