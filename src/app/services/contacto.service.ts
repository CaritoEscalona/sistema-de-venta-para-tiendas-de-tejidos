import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root',
})
export class ContactoService {

  private readonly api_url = `${base_url}/tiendas/pedido`

  constructor(private http: HttpClient) { }

  enviarCorreo(correo = {}): Observable<any> {
    return this.http.post<any>(this.api_url, correo);
  }
}
