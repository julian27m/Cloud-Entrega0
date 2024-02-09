import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  darCategorias(): Observable<Categoria[]> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/${idUsuario}`, { headers: headers })
  }

  darCategoria(idCategoria: number): Observable<Categoria> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${idCategoria}`, { headers: headers })
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Categoria>(`${this.apiUrl}/categorias/${idUsuario}`, categoria, { headers: headers })
  }

  editarCategoria(categoria: Categoria): Observable<Categoria> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Categoria>(`${this.apiUrl}/categoria/${categoria.id}`, categoria, { headers: headers })
  }


  borrarCategoria(idCategoria: number): Observable<Categoria> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Categoria>(`${this.apiUrl}/categoria/${idCategoria}`, { headers: headers })
  }

}
