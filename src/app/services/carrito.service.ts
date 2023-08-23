import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly api_url = `${base_url}/carritos`

  constructor(private http: HttpClient) { }

  createCarrito(carrito = {}): Observable<any> {
    return this.http.post<any>(this.api_url, carrito);
  }

  addProducto(producto_carrito: any): Observable<any> {
    return this.http.put<any>(this.api_url, producto_carrito);
  }

  getProductos(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/productos`);
  }

  getCarrito(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/usuario`);
  }
}
