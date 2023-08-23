import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoria } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';


const base_url = environment.url_api;


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // BehaviorSubject que emitirá un valor cada vez que una categoría sea creada o eliminada
  private categoriaChange = new BehaviorSubject(null);
  categoriaChange$ = this.categoriaChange.asObservable();

  constructor(private http: HttpClient) { }

  private readonly api_url = `${base_url}/categorias`;

  getCategorias(categorias = {}) : Observable<any>{
    return this.http.get<any>(`${this.api_url}`, categorias);
  }

  getCategoriaById(id: number): Observable<ICategoria> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<ICategoria>(url);
  }

  createCategoria(categoria = {}): Observable<any>{
    return this.http.post<any>(`${this.api_url}/`, categoria).pipe(
      tap(() => this.categoriaChange.next(null))
    );;
  }

  deleteCategoria(id: number): Observable<ICategoria> {
    const url = `${this.api_url}/${id}`;
    return this.http.delete<ICategoria>(url).pipe(
      tap(() => this.categoriaChange.next(null))
    );
  }
}
