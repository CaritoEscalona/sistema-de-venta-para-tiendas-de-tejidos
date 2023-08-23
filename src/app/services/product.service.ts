import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/interfaces';
import { query } from '@angular/animations';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly api_url = `${base_url}/productos`;

  constructor(private http: HttpClient) {}

  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.api_url, producto);
  }
  getProductos(): Observable<any> {
    return this.http.get<any>(this.api_url);
  }
  getProductosById(id: number): Observable<IProducto> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<IProducto>(url);
  }
  getProductosBySku(sku: string): Observable<IProducto> {
    const url = `${this.api_url}/${sku}`;
    return this.http.get<IProducto>(url);
  }
  getProductosBySkuAndTienda(sku: string, idTienda:number): Observable<IProducto> {
    const url = `${this.api_url}/tienda/${idTienda}/sku/${sku}`;
    return this.http.get<IProducto>(url);
  }
  getProductosByTienda(id: number): Observable<IProducto[]> {
    const url = `${this.api_url}/tienda/${id}`;
    return this.http.get<IProducto[]>(url);
  }
  getProductosByCategoria(id: number): Observable<IProducto[]> {
    const url = `${this.api_url}/categoria/${id}`;
    return this.http.get<IProducto[]>(url);
  }
  searchProductos(query: string): Observable<any>{
    const url = `${this.api_url}/search/${query}`;
    return this.http.get<IProducto>(url);
  }
  changeDisponibilidad(producto: any): Observable<any> {
    const url = `${this.api_url}/disponibilidad/${producto.id_producto}`;
    return this.http.put<any>(url, { "disponible": false });
  }
}