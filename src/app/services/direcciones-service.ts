import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../interfaces/clientes-response';
import { environment } from '../../environments/environment';

interface CreateDireccionPayload {
  municipio: string;
  calle: string;
  numCasa: string;
  provincia: string;
}

@Injectable({
  providedIn: 'root',
})
export class DireccionesService {

  private apiUrl = `${environment.apiBaseUrl}/direcciones`;

  constructor(private http:HttpClient) {}


  getDirecciones (): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.apiUrl);
  }

  createDireccion(payload: CreateDireccionPayload): Observable<Direccion> {
    return this.http.post<Direccion>(this.apiUrl, payload);
  }

  editDireccion(id: number, payload: CreateDireccionPayload): Observable<Direccion> {
    return this.http.put<Direccion>(`${this.apiUrl}/${id}`, payload);
  }
}
