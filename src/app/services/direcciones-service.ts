import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../interfaces/clientes-response';

@Injectable({
  providedIn: 'root',
})
export class DireccionesService {

  constructor(private http:HttpClient) {}


  getDirecciones (): Observable<Direccion[]> {
    return this.http.get<Direccion[]>('http://127.0.0.1:8000/api/direcciones')
  }

  
}
