import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/interfaces';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  title = 'Registrar usuario';
  newUser!: IUsuario;
  addUser: FormGroup;


  constructor(private _createUser: UsuarioServiceService, private toastr: ToastrService, private router: Router) {
    this.addUser =  new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

    this.newUser = {
      usuarioId: 0,
      nombre: '',
      apellido: '',
      rut: '',
      correo: '',
      pass: '',
      id_rol: 1
    }
   }

  ngOnInit(): void {

    
  }

  saveUser(){
    this.newUser.nombre = this.addUser.get('nombre')?.value;
    this.newUser.apellido = this.addUser.get('apellido')?.value;
    this.newUser.rut = this.addUser.get('rut')?.value;
    this.newUser.correo = this.addUser.get('correo')?.value;
    this.newUser.pass = this.addUser.get('pass')?.value;
    this.newUser.id_rol = 1;
  }

  showSuccess(){
    this.toastr.success('Usuario registrado', 'Éxito');
  }

  showWarning(){
    this.toastr.warning('Complete todos los campos', 'Advertencia');
  }

  onUserSubmit(form:any){
    if(!this.addUser.valid){
      this.showWarning();
    }else{
      this.saveUser();
      this.showSuccess();
  
      this._createUser.createUsuario(this.newUser).subscribe( res => {
        console.log('Usuario creado', res);
      }, err => console.log(err));

      this.router.navigate(['/home'])
    }

  }

}
