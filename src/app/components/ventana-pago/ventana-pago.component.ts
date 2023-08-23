import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IProducto, IProductoCarrito } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/services/pago.service';
import { ProductService } from 'src/app/services/product.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventana-pago',
  templateUrl: './ventana-pago.component.html',
  styleUrls: ['./ventana-pago.component.css']
})
export class VentanaPagoComponent implements OnInit, AfterViewInit {
  public pagoId: any = ``;
  productos: IProductoCarrito[] = [];
  detalle_productos: IProducto[] = [];
  public cargando:boolean = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoService: PagoService,
    private carritoSerive: CarritoService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // Obtener el id del pago de los parámetros de la ruta
    this.pagoId = this.route.snapshot.paramMap.get('id');
    this.obtenerProductos();
  }

  async ngAfterViewInit(): Promise<void> {
    const mp = new MercadoPago('TEST-c7757c35-78f0-4f78-bf14-379cb54d29c4', {
      locale: 'es-CL', });
    const bricksBuilder = mp.bricks();
    await mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: this.pagoId,
      },
    });
    this.cargando = false;
  }

  obtenerProductos() {
    this.carritoSerive.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
        this.productos.forEach((producto) => {
          this.productService.getProductosById(producto.id_producto).subscribe({
            next: (res) => {
              this.detalle_productos.push(res);
            },
            error: (err) => {
              console.log('Error:', err);
              this.toastr.error('Se ha producido un error con su carrito de compras', 'Error');
            }
          });
        });
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Se ha producido un error con su carrito de compras', 'Error');
      }
    });
  }

  calcularTotal() {
    let total = 0;
    this.productos.forEach((producto, index) => {
      total += this.detalle_productos[index].precio * producto.cantidad;
    });
    return total;
  }
}
