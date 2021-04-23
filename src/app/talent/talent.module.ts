import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TalentRoutingModule } from './talent-routing.module';

import { IndexComponent } from './pages/index/index.component';
import { TalentComponent } from './talent.component';
import { MaterialModule } from '../material/material.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditperfilComponent } from './pages/editperfil/editperfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { TalleresComponent } from './pages/talleres/talleres.component';
import { TEventoDialogMapaComponent } from './component/dialog-evento/dialog-mapa/dialog-mapa.component';
import { TTallerDialogMapaComponent } from './component/dialog-taller/dialog-mapa/dialog-mapa.component';
//import { DialogHorariosComponent } from './component/dialog-sitio/dialog-horarios/dialog-horarios.component';


@NgModule({
    declarations: [IndexComponent, TalentComponent, PerfilComponent, EditperfilComponent,
      EventosComponent, ProductosComponent, SitiosComponent, TalleresComponent, TEventoDialogMapaComponent, TTallerDialogMapaComponent, ],
    imports: [
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TalentRoutingModule,
  
    ]
  })
  export class TalentModule { }
  