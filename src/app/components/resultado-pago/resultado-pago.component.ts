import {
  ElementRef,
  ViewChild,
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { IProducto, IProductoCarrito } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { PagoService } from 'src/app/services/pago.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resultado-pago',
  templateUrl: './resultado-pago.component.html',
  styleUrls: ['./resultado-pago.component.css']
})
export class ResultadoPagoComponent implements OnInit, AfterViewInit {
  @ViewChild('boleta', { static: false }) getHTML!: ElementRef;
  public cargando:boolean = true;
  observer!: MutationObserver;
  public DOM_boleta!: any;
  public pagoId: any = '';
  collectionId: any = '';
  collectionStatus: any = '';
  payment_id: any = '';
  status: any = '';
  external_reference: any = '';
  payment_type: any = '';
  merchant_order_id: any = '';
  preference_id: any = '';
  site_id: any = '';
  processing_mode: any = '';
  merchant_account_id: any = '';
  productos: IProductoCarrito[] = [];
  detalle_productos: IProducto[] = [];

  constructor(
    private pagoService: PagoService,
    private productService: ProductService,
    private carritoSerive: CarritoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pagoId = this.route.snapshot.paramMap.get('id');
    this.obtenerProductos();
    this.route.queryParamMap.subscribe(params => {
      this.collectionId = params.get('collection_id');
      this.collectionStatus = params.get('collection_status');
      this.payment_id = params.get('payment_id');
      this.status = params.get('status');
      this.external_reference = params.get('external_reference');
      this.payment_type = params.get('payment_type');
      this.merchant_order_id = params.get('merchant_order_id');
      this.preference_id = params.get('preference_id');
      this.site_id = params.get('site_id');
      this.processing_mode = params.get('processing_mode');
      this.merchant_account_id = params.get('merchant_account_id');
    });
  }

  ngAfterViewInit(): void {
    let timerId: any = null;
    this.observer = new MutationObserver(mutations => {
      this.DOM_boleta = this.getHTML.nativeElement.innerHTML;
      // Cancelar el temporizador anterior
      if (timerId != null) {
        clearTimeout(timerId);
      }

      // Iniciar un nuevo temporizador
      timerId = setTimeout(() => {
        this.enviarPorCorreo();
        if (this.status == "approved") {
          this.limpiarCarrito();
        }

        // Puedes desconectar el observador aquí si no esperas más mutaciones
        this.observer.disconnect();
      }, 5000);  // Aquí, 5000 es 5 segundos
    });

    this.observer.observe(this.getHTML.nativeElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  limpiarCarrito() {
    this.carritoSerive.getProductos().subscribe({
      next: (res) => {
        let productos: IProductoCarrito[] = res;
        while (productos.length > 0) {
          let productDelete: any = productos.pop();
          productDelete.cantidad *= -1;
          this.carritoSerive.addProducto(productDelete).subscribe({
            next: (res) => {
              this.productService.changeDisponibilidad(productDelete).subscribe({
                next: (res) => {
                  console.log("Producto eliminado:");
                  console.log(productDelete);
                },
                error: (err) => {
                  console.log('Error:', err);
                  this.toastr.error('Se ha producido un error al limpiar su carrito de compras', 'Error');
                }
              });
            },
            error: (err) => {
              console.log('Error:', err);
              this.toastr.error('Se ha producido un error al limpiar su carrito de compras', 'Error');
            }
          });
        }
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Se ha producido un error con su carrito de compras', 'Error');
      }
    });
  }

  goToHome() {
    this.router.navigate(['/home'])
  }

  enviarPorCorreo() {
    // Envía el contenido como texto plano al backend mediante una petición POST
    this.pagoService.sendBoleta({ contenido: this.DOM_boleta }).subscribe({
      next: (res) => {
        this.showBoleta();
        this.toastr.success('Se le ha enviado un correo con la boleta');
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Se ha producido un error con el envío de su boleta', 'Error');
      }
    });
  }

  showBoleta() {
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
