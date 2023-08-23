import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

const base_url = environment.url_api;

export interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  id_tienda: number;
  forgottenPassword: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private readonly api_url = `${base_url}/auth`;

  constructor(private http: HttpClient) {
    let storageCurrentUser: string = String(localStorage.getItem('currentUser'));

    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('currentUser') ? JSON.parse(storageCurrentUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(correo: string, pass: string) {
    return this.http.post<any>(
      `${this.api_url}/login`,
      { correo, pass }
    ).pipe(
      map((user) => {
        return this.processToken(user);
      })
    );
  }

  logout() {
    // Elimina el objeto 'user' del localStorage y establece el currentUserSubject en null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.put<any>(`${this.api_url}/changePassword`, { oldPassword, newPassword });
  }

  changeForgottenPassword(newPassword: string) {
    return this.http.put<any>(`${this.api_url}/changeForgottenPassword`, { newPassword });
  }

  mailLogin(correo = {}): Observable<any> {
    return this.http.post<any>(`${this.api_url}/forgetPw`, correo);
  }

  processToken(user: any) {
    if (user && user.token) {
      const decodedToken = jwt_decode(user.token) as DecodedToken;
      user.id = decodedToken.id;
      user.rol = decodedToken.rol;
      user.nombre = decodedToken.nombre;
      user.correo = decodedToken.correo;
      user.id_tienda = decodedToken.id_tienda; // si es -1 el usuario no tiene tienda
      user.forgottenPassword = decodedToken.forgottenPassword;
      user.exp = decodedToken.exp;
      user.iat = decodedToken.iat;

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    return user;
  }

  updateTienda(store:any) {
        let user: DecodedToken = JSON.parse(localStorage.getItem('currentUser')?? '');
        user.id_tienda = store.id;
        localStorage.setItem('currentUser', JSON.stringify(user));
        let currentUser = this.currentUserValue;
        currentUser.id_tienda = store.id;
        this.currentUserSubject.next(currentUser);
  }
  
}
