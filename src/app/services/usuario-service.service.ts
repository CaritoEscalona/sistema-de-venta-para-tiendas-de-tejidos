import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.url_api;

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  private readonly api_url = `${base_url}/usuarios`;

  createUsuario(usuario = {}) : Observable<any>{
    return this.http.post<any>(`${this.api_url}/`, usuario);
  }
}
