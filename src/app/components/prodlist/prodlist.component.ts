import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/interfaces';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-prodlist',
  templateUrl: './prodlist.component.html',
  styleUrls: ['./prodlist.component.css'],
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
export class ProdlistComponent {
  productos: IProducto[] = [];

  constructor(private router: Router, private ProductService: ProductService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  goToProductDetail(id: number) {
    this.router.navigateByUrl('/product-detail/' + id);
  }

  obtenerProductos() {
    this.ProductService.getProductos().subscribe(
      (res: any) => {
        this.productos = res;
      },
      err => console.log(err)
    );
  }

  obtenerProductoById(id: number) {
    this.ProductService.getProductosById(id).subscribe(
      (res: any) => {
        this.productos = res;
        console.log(this.productos);
      },
      err => console.log(err)
    );
  }
}