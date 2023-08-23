import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITienda, IProducto, IProductoCarrito } from 'src/app/interfaces/interfaces';
import { TiendaServiceService } from 'src/app/services/tiendaservice.service';
import { ProductService } from 'src/app/services/product.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css'],
  animations: [
    trigger('sideState', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(600, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class ProductviewComponent implements OnInit {
  producto!: IProducto;
  tienda!: ITienda;
  idProducto: any;
  cantidad: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService,
    private tiendaService: TiendaServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.idProducto = params.get('idProducto');
      this.getDetalleProducto();
    });
  }

  getDetalleProducto() {
    this.productService.getProductosById(this.idProducto).subscribe({
      next: (res:any) => {
        this.producto = res;
        this.getDetalleTienda();
      },
      error: (err:any) => {
        console.log('Error:', err);
        this.toastr.error('Error con el producto solicitado', 'Error');
      }
    });
  }

  getDetalleTienda() {
    this.tiendaService.getTiendaById(this.producto.id_tienda).subscribe({
      next: (res:any) => {
        this.tienda = res;
      },
      error: (err:any) => {
        console.log('Error:', err);
        this.toastr.error('Error con la tienda solicitada', 'Error');
      }
    });
  }

  addCarrito() {
    const productoCarrito: IProductoCarrito = {
      id_producto: this.idProducto,
      cantidad: this.cantidad
    }

    this.carritoService.addProducto(productoCarrito).subscribe({
      next: (res:any) => {
        this.toastr.success(`¡Se ha(n) añadido la(s) unidad(es) de ${this.producto.nombre} al carrito!`)
      },
      error: (err:any) => {
        console.log('Error:', err);
        this.toastr.error('Error al añadir producto', 'Error');
      }
    });
  }

  verTienda() {
    this.router.navigate([`/tienda/${this.tienda.id}`])
  }
}





