import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITienda, IProducto } from 'src/app/interfaces/interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TiendaServiceService } from 'src/app/services/tiendaservice.service';
import { ProductService } from 'src/app/services/product.service';
import { ContactoService } from 'src/app/services/contacto.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
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
export class TiendaComponent {
  @ViewChild('contactForm') contactForm!: NgForm;
  tienda: ITienda = {
    id: -1,
    nombre: "Error, no se encontro tienda",
    descripcion: "Error",
    correo: "tejidos@contacto.cl",
    img_url: "",
  };
  productos: IProducto[] = [];
  idTienda: any;
  modalContacto: any;
  nombreContacto: string = '';
  correoContacto: string = '';
  mensajeContacto: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tiendaService: TiendaServiceService,
    private productoService: ProductService,
    private contactoService: ContactoService,
    private renderer: Renderer2,
    private el: ElementRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idTienda = params.get('idTienda');
      this.getTienda();
      this.getProductosTienda();

    });

    this.modalContacto = new window.bootstrap.Modal(
      document.getElementById("modal-contacto"),
      {
        backdrop: "static",
        keyboard: false
      }
    );
  }

  getTienda() {
    this.tiendaService.getTiendaById(this.idTienda).subscribe({
      next: (res) => {
        this.tienda = res;
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Error con la tienda solicitada', 'Error');
      }
    });
  }

  getProductosTienda() {
    this.productoService.getProductosByTienda(this.idTienda).subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.log('Error:', err);
        this.toastr.error('Error con la tienda solicitada', 'Error');
      }
    });
  }

  enviarCorreo(): void {
    if (this.contactForm.valid) {
      // Llama al método del servicio para enviar el correo
      const correo: any = {
        nombreContacto: this.nombreContacto,
        correoContacto: this.correoContacto,
        mensajeContacto: this.mensajeContacto,
        idTienda: this.idTienda
      };
      this.contactoService.enviarCorreo(correo).subscribe({
        next: (res) => {
          this.toastr.success('¡Correo Enviado Exitosamente!');
        },
        error: (err) => {
          console.log('Error:', err);
          this.toastr.error('Se ha producido un error con su pedido', 'Error');
        }
      });

      // Restablece los campos del formulario después de enviar el correo
      this.nombreContacto = '';
      this.correoContacto = '';
      this.mensajeContacto = '';
    }
  }

  scrollToContact() {
    const element = this.el.nativeElement.querySelector('#contacto');
    element.scrollIntoView({ behavior: 'smooth' });
  }
  mostrarFormulario: boolean = false;

  toggleContactForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  showModal() {
    this.modalContacto.show();
  }

  closeModal() {
    this.modalContacto.hide();
  }

  navigateProducto(id:number){
    this.router.navigateByUrl(`/product-detail/${id}`)
  }
}

