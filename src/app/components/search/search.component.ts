import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoria, IProducto, ITienda } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductService } from 'src/app/services/product.service';
import { TiendaServiceService } from 'src/app/services/tiendaservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: IProducto[] | any = [];
  categorias: ICategoria[] = [];
  tiendas: ITienda[] = [];
  filtroBusqueda: string = '';
  filtroCategoria: number | any = null;
  filtroTienda: number | any = null;
  admin!:boolean;
  idTienda!:number;
  loged!:boolean;
  hasTienda!:boolean;



  constructor(private router:Router, public authService: AuthService ,private productService: ProductService, private categoriaService: CategoriaService, private tiendaService: TiendaServiceService) { }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject
    this.authService.currentUser.subscribe(() => {
      this.setAtributes();
    });

    this.categoriaService.getCategorias().subscribe((res)=>{
      this.categorias = res;
    });

    this.tiendaService.getTiendas().subscribe((res)=> {
      this.tiendas = res;
    })
    

    this.productService.getProductos().subscribe((res) => {
      this.products = res;
    })
  }

  setAtributes(){
    if (this.authService.currentUserValue) {
      this.admin = this.authService.currentUserValue.rol == 'Administrador';
      this.idTienda = this.authService.currentUserValue.id_tienda;
      this.loged = true;
      this.hasTienda = this.idTienda != -1;

    } else {
      this.admin = false;
      this.idTienda = -1;
      this.loged = false;
      this.hasTienda = false;
    }

  }

  verDetalle(id: number){
    this.router.navigateByUrl(`/product-detail/${id}`)
  }
}
