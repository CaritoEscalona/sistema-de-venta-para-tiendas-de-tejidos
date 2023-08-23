import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProducto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  productos: IProducto[] = [];


  constructor(config: NgbCarouselConfig, private router: Router, private productService: ProductService) {
    config.showNavigationArrows = false;
    config.wrap = true;
    config.pauseOnFocus = false;
    config.pauseOnHover = false;
    config.interval = 4000;
  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductos().subscribe(
      (res: any) => {
        this.productos = res;
  
        // Filtrar los productos que tienen imagen (img_url no es null o undefined)
        const productosConImagen = this.productos.filter(producto => producto.img_url);
  
        // Tomar los últimos 5 productos con imagen y cambiar su orden (el más nuevo primero)
        this.productos = productosConImagen.slice(-5).reverse();
      },
      err => console.log(err)
    );
  }

  goToProductDetail(id: number) {
    this.router.navigateByUrl('/product-detail/' + id);
  }
}
