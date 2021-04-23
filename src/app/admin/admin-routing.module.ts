import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { IndexComponent } from './pages/index/index.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { TalentosComponent } from './pages/talentos/talentos.component';
import { TalleresComponent } from './pages/talleres/talleres.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: 'index',
        canActivate: [AdminGuard],
        component: IndexComponent
      },
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent
      },
      {
        path: 'paises',
        canActivate: [AdminGuard],
        component: PaisesComponent
      },
      {
        path: 'estados',
        canActivate: [AdminGuard],
        component: EstadosComponent
      },
      {
        path: 'categorias',
        canActivate: [AdminGuard],
        component: CategoriasComponent
      },
      {
        path: 'servicios',
        canActivate: [AdminGuard],
        component: ServiciosComponent
      },
      {
        path: 'municipios',
        canActivate: [AdminGuard],
        component: MunicipiosComponent
      },
      {
        path: 'sitios',
        canActivate: [AdminGuard],
        component: SitiosComponent
      },
      {
        path: 'talentos',
        canActivate: [AdminGuard],
        component: TalentosComponent
      },
      {
        path: 'productos',
        canActivate: [AdminGuard],
        component: ProductosComponent
      },
      {
        path: 'eventos',
        canActivate: [AdminGuard],
        component: EventosComponent
      },
      {
        path: 'talleres',
        canActivate: [AdminGuard],
        component: TalleresComponent
      },
      {
        path: 'paypal',
        canActivate: [AdminGuard],
        component: PaypalComponent
      },
      {
        path: '**',
        redirectTo: 'index'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
