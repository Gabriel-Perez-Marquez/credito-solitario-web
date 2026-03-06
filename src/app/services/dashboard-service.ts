import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return forkJoin({
      clientes: this.http.get<any[]>(`${this.apiUrl}/clientes`),
      pedidos: this.http.get<any[]>(`${this.apiUrl}/pedidos`),
      productos: this.http.get<any[]>(`${this.apiUrl}/productos`)
    });
  }
}