import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, CategoriesResponse } from '../interfaces/categorias.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {


  apiUrl = 'http://127.0.0.1:8000/api/categorias';

  constructor(private http: HttpClient) { }

  
  createCategory (nombre:String, activa: boolean): Observable<Categoria> {

    const body = {nombre, activa};

    return this.http.post<Categoria>(this.apiUrl, body)
  }

  editCategory(id: number, nombre: string, activa: boolean): Observable<Categoria> {
    const body = { nombre, activa };
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, body);
  }

  getCategorias():Observable<CategoriesResponse>{
    return this.http.get<CategoriesResponse>(this.apiUrl);
  }

  getCategory(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }


  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
