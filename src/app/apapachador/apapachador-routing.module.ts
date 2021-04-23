import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from '../apapachador/pages/eventos/eventos.component';
import { ProductosComponent } from '../apapachador/pages/productos/productos.component';
import { SitiosComponent } from '../apapachador/pages/sitios/sitios.component';
import { TalleresComponent } from '../apapachador/pages/talleres/talleres.component';
import { AuthGuard } from '../guards/auth.guard';
import { ApapachadorComponent } from './apapachador.component';
import { IndexComponent } from './pages/index/index.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ApapachadorComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'perfil',        
        component: PerfilComponent,
        data: { titulo: 'Perfil'}
      },
      {
        path: 'sitios',
        component: SitiosComponent,
        data: { titulo: 'Sitio'}
      },
      {
        path: 'productos',
        component: ProductosComponent,
        data: { titulo: 'Producto'}
      },
      {
        path: 'eventos',
        component: EventosComponent,
        data: { titulo: 'Evento'}
      },
      {
        path: 'talleres',
        component: TalleresComponent,
        data: { titulo: 'Taller'}
      },
      {
        path: '**',
        redirectTo: 'index'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApapachadorRoutingModule { }
