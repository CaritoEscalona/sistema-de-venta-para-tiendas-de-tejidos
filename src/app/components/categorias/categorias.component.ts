import { Component, OnInit } from '@angular/core';
import { ICategoria } from 'src/app/interfaces/interfaces';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  admin!:boolean;
  categorias!: ICategoria[];
  actualCategoria!:any;
  modalConfirmation:any;
  modalInUse:any;

  constructor(
    private categoriaService: CategoriaService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.updateCategorias();
      let notParsedUser = localStorage.getItem('currentUser');
      let currentUser = JSON.parse(notParsedUser ? notParsedUser : '');
      this.admin = currentUser.rol == 'Administrador';

      this.modalConfirmation = new window.bootstrap.Modal(
        document.getElementById("modal-confirmation"),
        {
          backdrop: "static",
          keyboard: false
        }
      );

      this.modalInUse = new window.bootstrap.Modal(
        document.getElementById("modal-in-use"),
        {
          backdrop: "static",
          keyboard: false
        }
      );

      // Suscribirse al BehaviorSubject
      this.categoriaService.categoriaChange$.subscribe(() => {
        this.updateCategorias();
      });
  }

  openModal(categoria:any) {
    this.actualCategoria=categoria;
    this.productService.getProductosByCategoria(categoria.id).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.modalInUse.show();
        } else {
          this.modalConfirmation.show();
        }
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Se ha producido un error', 'Error');
      }
    });
  }

  hideModal() {
    this.modalConfirmation.hide();
    this.modalInUse.hide();
  }

  deleteCategoria(){
    this.categoriaService.deleteCategoria(this.actualCategoria.id).subscribe({
      next: (res) => {
        this.hideModal();
        this.toastr.success('Categoría Eliminada Correctamente');
        this.updateCategorias();
      },
      error: (err) => {
        if (err.status == 200) {
          this.hideModal();
          this.toastr.success('Categoría Eliminada Correctamente');
          this.updateCategorias();
        } else {
          console.log('Error:', err);
          this.toastr.error('Se ha producido un error: ', 'Error');
        }
      }
    });
  }

  updateCategorias(){
    // Actualizar la lista de categorías
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    }, error => {
      console.log('Error:', error);
      this.toastr.error('Se ha producido un error', 'Error');
    });
  }
}
