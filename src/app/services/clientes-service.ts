import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClienteRequest, ClienteResponse } from '../interfaces/clientes-response';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  apiUrl = `${environment.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(this.apiUrl);
  }

  getClient(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createClient(payload: ClienteRequest): Observable<Cliente> {
    return this.http.post<Cliente>('http://127.0.0.1:8000/api/register', payload);
  }

  editClient(
    id: number,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    dni: string,
    saldo: number,
    activo: boolean,
    direccion_id: number
  ): Observable<Cliente> {
    const body = { nombre, apellidos, telefono, email, dni, saldo, activo, direccion_id };
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, body);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
