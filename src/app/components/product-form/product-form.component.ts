import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ICategoria, IProducto } from 'src/app/interfaces/interfaces';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  newProduct: IProducto;
  categorias: ICategoria[] = [];
  img_url: string = "";
  widget:any;
  tiendaId: number = 0;

  constructor(private formBuilder: FormBuilder, private router:Router, private productService: ProductService, private toastr: ToastrService, private cloudinary: CloudinaryService, private categoriaService:CategoriaService) {
    this.productForm = this.formBuilder.group({
      sku: ['', [Validators.required], this.codeValidator()],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.maxLength(8)]],
      id_categoria: [0, [Validators.required, Validators.min(1)]],
    });

    this.newProduct = {
      id: 0,
      sku: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      id_categoria: 0,
      id_tienda: 0,
      img_url: ''
    };
  }

  ngOnInit() {
    this.getCategorias();
    this.getTienda();
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

 getTienda(){
  let tienda = localStorage.getItem("currentUser");
  let tiendaJson = JSON.parse(tienda!);
  this.tiendaId = tiendaJson.id_tienda;
 }

 codeValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    let code = control.value;
    return this.productService.getProductosBySkuAndTienda(control.value, this.tiendaId)
      .pipe(map(res => {
        if (res) {
          console.log('codigo encontrado');
          return { 'existe': true };
        }
        console.log("codigo no existe");
        return null;
      }))
  }
}

 getCategorias(){
  this.categoriaService.getCategorias().subscribe(
    resp => {
      this.categorias = resp;
    }
  )
 }

 openWidget() {
   if (this.widget) {
     this.widget.open();
   }
 }
  

  submitForm() {
    if (this.productForm.invalid) {
      this.toastr.warning('Complete todos los campos', 'Advertencia');
      return;
    }

    this.newProduct.sku = this.productForm.get('sku')?.value;
    this.newProduct.nombre = this.productForm.get('nombre')?.value;
    this.newProduct.descripcion = this.productForm.get('descripcion')?.value;
    this.newProduct.precio = this.productForm.get('precio')?.value;
    this.newProduct.id_categoria = parseInt(this.productForm.get('id_categoria')?.value);
    this.newProduct.img_url = this.img_url;
   

    this.productService.createProducto(this.newProduct).subscribe(
      (response) => {
        console.log(response);
        // Aquí puedes agregar código para mostrar un mensaje de éxito o redireccionar al usuario a otra página
        this.toastr.success('Producto registrado', 'Éxito');
        this.router.navigateByUrl("/home");
      },
      (error) => {
        console.log(error);
        // Aquí puedes agregar código para mostrar un mensaje de error
        this.toastr.error(
          'Ha ocurrido un error al registrar el producto',
          'Error'
        );
      }
    );
  }
}
