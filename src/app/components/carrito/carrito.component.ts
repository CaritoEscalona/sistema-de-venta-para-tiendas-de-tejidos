import { Component, OnInit } from '@angular/core';
import { IProducto, IProductoCarrito } from 'src/app/interfaces/interfaces';
import { ProductService } from 'src/app/services/product.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { PagoService } from 'src/app/services/pago.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: IProductoCarrito[] = [];
  detalle_productos: IProducto[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private carritoSerive: CarritoService,
    private pagoService: PagoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  goToProductDetail() {
    this.router.navigateByUrl('/product-detail');
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

  verDetalleProducto(id_producto: number) {
    this.router.navigate([
      '/productos',
      id_producto
    ]);
  }

  calcularTotal() {
    let total = 0;
    this.productos.forEach((producto, index) => {
      total += this.detalle_productos[index].precio * producto.cantidad;
    });
    return total;
  }

  limpiarCarrito(){
    while(this.productos.length>0){
      let productDelete: any = this.productos.pop() ;
      productDelete.cantidad *= -1;
      this.carritoSerive.addProducto(productDelete).subscribe({
        next: (res) => {
          productDelete = this.detalle_productos.pop();
        },
        error: (err) => {
          console.log('Error:', err);
          this.toastr.error('Se ha producido un error al limpiar su carrito de compras', 'Error');
        }
      });
    }
  }

  finalizarCompra() {
    //const redirection = `${this.location.host}/resultadoPago`;
    const redirection = `${document.location.host}/#/resultadoPago`; 
    this.pagoService.createPago({redirection}).subscribe({
      next: (res) => {
        // Redirigir al usuario a la ventana de pago con el id del pago como parámetro
        console.log(res)
        this.router.navigate([
          '/ventanaPago',
          res.body.id
        ]);

      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Se ha producido un error al finalizar el pago', 'Error');
      }
    });
  }

  eliminarProducto(index:number){
    let productDelete: any = this.productos[index] ;
      productDelete.cantidad *= -1;
      this.carritoSerive.addProducto(productDelete).subscribe({
        next: (res) => {
          this.detalle_productos = [];
          this.productos = [];
          this.obtenerProductos();
          this.toastr.success("Elemento eliminado correctamente")
        },
        error: (err) => {
          console.log('Error:', err);
          this.toastr.error('Se ha producido un error al limpiar su carrito de compras', 'Error');
        }
      });
  }
  
}
