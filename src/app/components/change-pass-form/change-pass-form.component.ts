import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-form.component.html',
  styleUrls: ['./change-pass-form.component.css']
})
export class ChangePassFormComponent implements OnInit {
  public forgottenPassword: boolean = false;
  changePassForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => {
      this.forgottenPassword = this.authService.currentUserValue.forgottenPassword;
      if (this.forgottenPassword) {
        this.changePassForm.removeControl('oldPassword');
      }
    });
  }

  onSubmit() {
    if (!this.forgottenPassword) {
      const oldPassword = this.changePassForm.get('oldPassword')?.value;
      const newPassword = this.changePassForm.get('newPassword')?.value;
      const confirmNewPassword = this.changePassForm.get('confirmNewPassword')?.value;
      if (this.changePassForm.valid) {
        if (newPassword !== confirmNewPassword) {
          this.toastr.error('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
          return;
        }

        this.authService.changePassword(oldPassword, newPassword).subscribe({
          next: (res) => {
            console.log('Cambio de contraseña exitoso:', res);
            this.toastr.success('Cambio de contraseña exitoso', 'Éxito');
            this.authService.logout();
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.log('Error al cambiar la contraseña:', err);
            if (err.error.message === "Contraseña incorrecta") {
              this.toastr.error('La contraseña antigua ingresada es incorrecta. Inténtelo de nuevo.');
            } else {
              this.toastr.error('Error al cambiar la contraseña', 'Error');
            }
          }
        });
      } else {
        if (newPassword.length < 8) {
          this.toastr.error('La nueva contraseña es demasiado corta. Debe contener al menos 8 caracteres. Por favor, inténtelo de nuevo.');
          return;
        } else {
          this.toastr.warning('Por favor complete todos los campos correctamente', 'Advertencia');
        }
      }
    } else {
      const newPassword = this.changePassForm.get('newPassword')?.value;
      const confirmNewPassword = this.changePassForm.get('confirmNewPassword')?.value;
      if (this.changePassForm.valid) {
        if (newPassword !== confirmNewPassword) {
          this.toastr.error('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
          return;
        }

        this.authService.changeForgottenPassword(newPassword).subscribe({
          next: (res) => {
            console.log('Cambio de contraseña exitoso:', res);
            this.toastr.success('Cambio de contraseña exitoso', 'Éxito');
            this.authService.logout();
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.log('Error al cambiar la contraseña:', err);
            if (err.error.message === "Contraseña incorrecta") {
              this.toastr.error('La contraseña antigua ingresada es incorrecta. Inténtelo de nuevo.');
            } else {
              this.toastr.error('Error al cambiar la contraseña', 'Error');
            }
          }
        });
      } else {
        if (newPassword.length < 8) {
          this.toastr.error('La nueva contraseña es demasiado corta. Debe contener al menos 8 caracteres. Por favor, inténtelo de nuevo.');
          return;
        } else {
          this.toastr.warning('Por favor complete todos los campos correctamente', 'Advertencia');
        }
      }
    }
  }

}
