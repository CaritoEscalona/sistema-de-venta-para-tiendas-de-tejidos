import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  admin!:boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject
    this.authService.currentUser.subscribe(() => {
      this.setAtributes();
    });
  }

  setAtributes(){
    if (this.authService.currentUserValue) {
      this.admin = this.authService.currentUserValue.rol == 'Administrador';
    } else {
      this.admin = false;
    }
  }
}
