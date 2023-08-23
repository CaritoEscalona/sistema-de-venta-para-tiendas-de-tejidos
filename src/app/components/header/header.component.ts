import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  admin!:boolean;
  idTienda!:number;
  loged!:boolean;
  hasTienda!:boolean;



  constructor(public authService: AuthService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/search'){
          this.showHeader = false;
        }else{
          this.showHeader = true;
        }
      }
    })
  }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject
    this.authService.currentUser.subscribe(() => {
      this.setAtributes();
    });
  }

  setAtributes(){
    if (this.authService.currentUserValue) {
      this.admin = this.authService.currentUserValue.rol == 'Administrador';
      this.idTienda = this.authService.currentUserValue.id_tienda;
      this.loged = true;
      this.hasTienda = this.idTienda != -1;
    } else {
      this.admin = false;
      this.idTienda = -1;
      this.loged = false;
      this.hasTienda = false;
    }
  }

  navSearch() {
    this.router.navigate(['search/']);
  }
}
