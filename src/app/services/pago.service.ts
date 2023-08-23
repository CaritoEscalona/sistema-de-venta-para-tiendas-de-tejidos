import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }

  createPago(pagoMercadoPago = { }): Observable<any> {
    return this.http.post<any>(`${base_url}/pagoUsuario`, pagoMercadoPago);
  }

  sendBoleta(html = { }): Observable<any> {
    return this.http.post<any>(`${base_url}/sendBoleta`, html);
  }
}
