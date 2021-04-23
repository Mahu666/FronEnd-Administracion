import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ApapachadorRoutingModule } from './apapachador-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ApapachadorComponent } from './apapachador.component';
import { MaterialModule } from '../material/material.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditperfilComponent } from './pages/editperfil/editperfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADialogTallerComponent } from './component/dialog-taller/dialog-taller.component';
import { ADialogSitioComponent } from './component/dialog-sitio/dialog-sitio.component';
import { ADialogProductoComponent } from './component/dialog-producto/dialog-producto.component';
import { ADialogEventoComponent } from './component/dialog-evento/dialog-evento.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { TalleresComponent } from './pages/talleres/talleres.component';
import { AEventoDialogMapaComponent } from './component/dialog-evento/dialog-mapa/dialog-mapa.component';
import { ATallerDialogMapaComponent } from './component/dialog-taller/dialog-mapa/dialog-mapa.component';


@NgModule({
  declarations: [IndexComponent, ApapachadorComponent, PerfilComponent, EditperfilComponent,
    EventosComponent, ProductosComponent, SitiosComponent, TalleresComponent, AEventoDialogMapaComponent, ATallerDialogMapaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ApapachadorRoutingModule,

  ]
})
export class ApapachadorModule { }
