import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITienda } from '../interfaces/interfaces';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class TiendaServiceService {

  constructor(private http: HttpClient) { }

  private readonly api_url = `${base_url}/tiendas`;

  createTienda(tienda = {}): Observable<any> {
    return this.http.post<any>(`${this.api_url}/`, tienda);
  }

  getTiendas(): Observable<any> {
    return this.http.get<any>(`${this.api_url}`);
  }

  getTiendaById(id: number): Observable<ITienda> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<ITienda>(url);
  }

  

}
