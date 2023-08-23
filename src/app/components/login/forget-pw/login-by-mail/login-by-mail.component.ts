import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-by-mail',
  templateUrl: './login-by-mail.component.html',
  styleUrls: ['./login-by-mail.component.css']
})
export class LoginByMailComponent implements OnInit {
  public bareerToken: any;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bareerToken = params.get('bareerToken');
      let user = {
        token: this.bareerToken
      }
      if(this.authService.processToken(user)){
        this.router.navigate(['/change-password']);
        this.toastr.success('Usted ha sido logeado por correo electronico, por favor cambie su clave')
      } else {
        this.router.navigate(['/login']);
        this.toastr.error('Error link caducado o invalido', 'Error');
      }
    });
  }

}
