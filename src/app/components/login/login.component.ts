import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.get('correo')?.value;
      const pass = this.loginForm.get('pass')?.value;
  
      this.authService.login(correo, pass).subscribe({
        next: (res) => {
          // Verificar si tiene carrito creado
          this.carritoService.getCarrito().subscribe({
            next: (res) => {
              console.log('Carrito ya estaba creado');

              // Redirigir al usuario a la página principal
              this.toastr.success('Inicio de sesión exitoso', 'Éxito');
              this.router.navigate(['/home']);
            },
            error: (err) => {
              // Crear Carrito
              this.carritoService.createCarrito().subscribe({
                next: (res) => {
                  console.log("Carrito Creado con exito");

                  // Redirigir al usuario a la página principal
                  this.toastr.success('Inicio de sesión exitoso', 'Éxito');
                  this.router.navigate(['/home']);
                },
                error: (err) => {
                  // Redirigir al usuario a la página principal
                  this.toastr.success('Inicio de sesión exitoso', 'Éxito');
                  this.router.navigate(['/home']);

                  // Notificar problemas con el carrito
                  console.log('Error con carrito de compras, porfavor logearse nuevamente', err);
                  this.toastr.error('Error con carrito de compras, porfavor logearse nuevamente', 'Error');
                }
              })
            }
          })
        },
        error: (err) => {
          console.log('Error al iniciar sesión:', err);
          this.toastr.error('Error al iniciar sesión', 'Error');
        }
      });
    } else {
      this.toastr.warning('Por favor complete todos los campos correctamente', 'Advertencia');
    }
  }
}
