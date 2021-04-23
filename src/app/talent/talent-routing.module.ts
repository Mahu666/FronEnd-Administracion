import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from '../talent/pages/eventos/eventos.component';
import { ProductosComponent } from '../talent/pages/productos/productos.component';
import { SitiosComponent } from '../talent/pages/sitios/sitios.component';
import { TalleresComponent } from '../talent/pages/talleres/talleres.component';
import { AuthGuard } from '../guards/auth.guard';
import { TalentComponent } from './talent.component';
import { IndexComponent } from './pages/index/index.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: TalentComponent,
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
  export class TalentRoutingModule { }
  