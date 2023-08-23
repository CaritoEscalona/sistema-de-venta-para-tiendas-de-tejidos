import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-mail',
  templateUrl: './request-mail.component.html',
  styleUrls: ['./request-mail.component.css']
})
export class RequestMailComponent implements OnInit {
  changePassForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router:Router) {
    this.changePassForm = new FormGroup({
      userMail: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const userMail = this.changePassForm.get('userMail')?.value;
    if (this.changePassForm.valid) {
        // Llama al método del servicio para enviar el correo
        const correo: any = {
          correo: userMail,
          urlLoged: `${document.location.host}/#/login-by-mail`
      };
        this.authService.mailLogin(correo).subscribe({
          next: (res) => {
            this.toastr.success('Se le ha enviado un correo para que pueda acceder a la cuentañ');
          },
          error: (err) => {
            console.log('Error:', err);
            this.toastr.error('No se encontró una cuenta asociada a su correo', 'Error');
          }
        });
    }
  }
}