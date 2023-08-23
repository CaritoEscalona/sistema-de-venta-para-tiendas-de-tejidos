import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { JwtGuard } from './services/jwt.guard';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CreateTiendaComponent } from './components/create-tienda/create-tienda.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CreateCategoriaComponent } from './components/create-categoria/create-categoria.component';
import { ChangePassFormComponent } from './components/change-pass-form/change-pass-form.component';
import { RequestMailComponent } from './components/login/forget-pw/request-mail/request-mail.component';
import { LoginByMailComponent } from './components/login/forget-pw/login-by-mail/login-by-mail.component';

import { TiendasComponent } from './components/tiendas/tiendas.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProdlistComponent } from './components/prodlist/prodlist.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SearchComponent } from './components/search/search.component';

import { VentanaPagoComponent } from './components/ventana-pago/ventana-pago.component';
import { ResultadoPagoComponent } from './components/resultado-pago/resultado-pago.component';

const routes: Routes = [
  // Aplica AuthGuard a las rutas que requieran autenticación siguiendo el template:
  // { path: 'ruta-protegida', component: ComponenteProtegido, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [JwtGuard]  },
  { path: 'createUser', component: CreateUserComponent, canActivate: [JwtGuard] },
  { path: 'login', component: LoginComponent, canActivate: [JwtGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'createProduct', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'createTienda', component: CreateTiendaComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'createCategory', component: CreateCategoriaComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePassFormComponent, canActivate: [AuthGuard] },
  { path: 'tiendas', component: TiendasComponent, canActivate: [JwtGuard] },
  { path: 'tienda/:idTienda', component: TiendaComponent, canActivate: [JwtGuard] },
  { path: 'products', component: ProdlistComponent, canActivate: [JwtGuard] },
  { path: 'product-detail/:idProducto', component: ProductviewComponent, canActivate: [JwtGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [JwtGuard] },
  { path: 'ventanaPago/:id', component: VentanaPagoComponent, canActivate: [AuthGuard] },
  { path: 'resultadoPago/:id', component: ResultadoPagoComponent, canActivate: [AuthGuard] },
  { path: 'forgetPassword', component: RequestMailComponent, canActivate: [JwtGuard] },
  { path: 'login-by-mail/:bareerToken', component: LoginByMailComponent, canActivate: [JwtGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
