import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TiendaServiceService } from 'src/app/services/tiendaservice.service';
import { Router } from '@angular/router';
import { ITienda } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
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
export class TiendasComponent {
  tiendas: ITienda[]= [];
  constructor(private tiendaService: TiendaServiceService, private router: Router) { }


  ngOnInit(): void {
    this.obtenerTiendas();
  }
  
  obtenerTiendas(): void {
    this.tiendaService.getTiendas().subscribe(
      (res:any) => {
        this.tiendas = res;
      },
      (error:any) => {
        console.error('Error al obtener las tiendas:', error);
      }
    );
  }

  verDetalleTienda(tiendaId: number): void {
    this.tiendaService.getTiendaById(tiendaId).subscribe(
      (res: any) => {
        console.log('Detalles de la tienda:', res);
        this.router.navigate(['/tienda', tiendaId]);
      },
      (error: any) => {
        console.error('Error al obtener los detalles de la tienda:', error);
      }
    );
  }
}
