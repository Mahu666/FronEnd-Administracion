import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NopagefoundComponent } from './public/pages/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'apapachador',
    loadChildren: () => import('./apapachador/apapachador.module').then(m => m.ApapachadorModule)
  },
  {
    path: 'talent',
    loadChildren: () => import('./talent/talent.module').then(m => m.TalentModule)
  },
  {
    path: '404',
    component: NopagefoundComponent
  },
  {
    path: '**',
    redirectTo: '/auth', pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
