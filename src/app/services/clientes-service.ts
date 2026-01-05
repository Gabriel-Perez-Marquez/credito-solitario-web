import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../interfaces/clientes-response';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  private apiUrl = 'http://127.0.0.1:8000/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(this.apiUrl); 
  }
}
  
