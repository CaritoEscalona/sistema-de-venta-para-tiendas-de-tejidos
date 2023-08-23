import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel/carousel.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CreateTiendaComponent } from './components/create-tienda/create-tienda.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CreateCategoriaComponent } from './components/create-categoria/create-categoria.component';
import { ProdlistComponent } from './components/prodlist/prodlist.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CloudinaryModule } from '@cloudinary/ng';

import { ChangePassFormComponent } from './components/change-pass-form/change-pass-form.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ContactoService } from './services/contacto.service';
import { SearchComponent } from './components/search/search.component';
import { FilterSearchPipe } from './pipes/filter-search.pipe';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { FilterTiendaPipe } from './pipes/filter-tienda.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { RequestMailComponent } from './components/login/forget-pw/request-mail/request-mail.component';
import { VentanaPagoComponent } from './components/ventana-pago/ventana-pago.component';
import { ResultadoPagoComponent } from './components/resultado-pago/resultado-pago.component';
import { LoginByMailComponent } from './components/login/forget-pw/login-by-mail/login-by-mail.component';
import { defaultPipe } from './pipes/default.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateUserComponent,
    LoginComponent,
    CarouselComponent,
    ProductFormComponent,
    CreateTiendaComponent,
    DropdownDirective,
    CategoriasComponent,
    CreateCategoriaComponent,
    ProdlistComponent,
    ProductviewComponent,
    CarritoComponent,
    ChangePassFormComponent,
    TiendasComponent,
    TiendaComponent,
    SearchComponent,
    FilterSearchPipe,
    FilterCategoryPipe,
    FilterTiendaPipe,
    FooterComponent,
    RequestMailComponent,
    VentanaPagoComponent,
    ResultadoPagoComponent,
    LoginByMailComponent,
    defaultPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    CloudinaryModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
