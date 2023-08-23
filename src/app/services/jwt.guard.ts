import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Verificar fecha de expiración del token
      const expirationDate = new Date(currentUser.exp*1000);

      if (expirationDate > new Date()) {
        // El token no ha expirado, así que permite el acceso a la ruta
        console.log("Fecha de expiración del token: " + expirationDate);
      } else {
        // Si expiro el token se cierra sesión
        this.authService.logout();
      }
    }

    // El usuario no está autenticado, redirige a la página de inicio de sesión y rechaza el acceso
    return true;
  }
}
