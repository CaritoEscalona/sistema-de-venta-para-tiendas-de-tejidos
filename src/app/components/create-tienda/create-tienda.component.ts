import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITienda } from 'src/app/interfaces/interfaces';
import { TiendaServiceService } from 'src/app/services/tiendaservice.service';
import { Router } from '@angular/router';
import { DecodedToken, AuthService } from 'src/app/services/auth.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';


@Component({
  selector: 'app-create-tienda',
  templateUrl: './create-tienda.component.html',
  styleUrls: ['./create-tienda.component.css']
})
export class CreateTiendaComponent implements OnInit {
  title = 'Registrar Tienda';
  newTienda!: ITienda;
  addTienda: FormGroup;
  img_url: string = "";
  widget:any;

  ngOnInit() {
    this.cloudinary.createUploadWidget(
     {
       cloudName: 'dpmqqisma',
       uploadPreset: 'tejidos',
       clientAllowedFormats: ["jpg", "png", "jpeg"]
     },
     (error, result) => {
       if (!error && result && result.event === "success") {
         this.img_url = result.info.secure_url;
       }
     }
   ).subscribe(widget => this.widget = widget);
 }

 openWidget() {
   if (this.widget) {
     this.widget.open();
   }
 }


  constructor(
    private _createTienda: TiendaServiceService, 
    private toastr: ToastrService, private router: Router,
    private authService: AuthService,
    private cloudinary: CloudinaryService
  ) {
    this.addTienda = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    })

    this.newTienda = {
      id: 0,
      nombre: '',
      descripcion: '',
      correo: '',
      img_url: ''
    }
  }

  saveTienda() {

    this.newTienda.nombre = this.addTienda.get('nombre')?.value;
    this.newTienda.descripcion = this.addTienda.get('descripcion')?.value;
    this.newTienda.correo = this.addTienda.get('correo')?.value;
    this.newTienda.img_url = this.img_url;

  }

  showSuccess() {
    this.toastr.success('Tienda registrado', 'Éxito');
  }

  showWarning() {
    this.toastr.warning('Complete todos los campos', 'Advertencia');
  }

  onTiendaSubmit(form: any) {
    if (!this.addTienda.valid) {
      this.showWarning();
    } else {
      this.saveTienda();
      this._createTienda.createTienda(this.newTienda).subscribe({
        next: (res) => {
          this.authService.updateTienda(res.newTienda.id)
      },
        error: (err) => {
          console.log(err);
      }});
      this.showSuccess();
      this.router.navigate(['/home']);
    }
  }
}
