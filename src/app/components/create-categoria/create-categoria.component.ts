import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategoria } from 'src/app/interfaces/interfaces';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit{
  title = 'Registrar Tienda';
  newCategoria!: ICategoria;
  addCategoria: FormGroup;
  img_url!:string;
  widget:any;

  constructor(private createCategory: CategoriaService, private toastr: ToastrService, private router: Router, private cloudinary: CloudinaryService){
    this.addCategoria = new FormGroup({
      nombre: new FormControl('', Validators.required),
    })

    this.newCategoria = {
      id: 0,
      nombre: '',
      img_url: ''
    }

  }

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

  saveCategoria() {
    this.newCategoria.nombre = this.addCategoria.get('nombre')?.value;
    this.newCategoria.img_url = this.img_url;
  }

  showSuccess() {
    this.toastr.success('Categoria registrada', 'Éxito');
  }

  showWarning() {
    this.toastr.warning('Complete todos los campos', 'Advertencia');
  }

  onCategoriaSubmit(form: any) {
    if (!this.addCategoria.valid) {
      this.showWarning();
    } else {
      this.saveCategoria();
      this.showSuccess();

      this.createCategory.createCategoria(this.newCategoria).subscribe(res => {
      }, err => console.log(err));
      this.router.navigate(['/categories']);
    }

  }

}
