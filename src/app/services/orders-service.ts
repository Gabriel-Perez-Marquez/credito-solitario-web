import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido, PedidosResponse } from '../interfaces/pedidos-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.apiBaseUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<PedidosResponse> {
    return this.http.get<PedidosResponse>(this.apiUrl);
  }

  getOrder(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
}
