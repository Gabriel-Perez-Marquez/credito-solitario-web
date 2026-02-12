import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../interfaces/clientes-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DireccionesService {

  private apiUrl = `${environment.apiBaseUrl}/direcciones`;

  constructor(private http:HttpClient) {}


  getDirecciones (): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.apiUrl);
  }

  
}
