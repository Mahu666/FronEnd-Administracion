import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { MunicipiosComponent } from './pages/municipios/municipios.component';
import { DialogMunicipioComponent } from './component/dialog-municipio/dialog-municipio.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { DialogSitioComponent } from './component/dialog-sitio/dialog-sitio.component';
import { DialogTalentComponent } from './component/dialog-talent/dialog-talent.component';
import { TalentosComponent } from './pages/talentos/talentos.component';
import { DialogProductoComponent } from './component/dialog-producto/dialog-producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { DialogEventoComponent } from './component/dialog-evento/dialog-evento.component';
import { DialogTallerComponent } from './component/dialog-taller/dialog-taller.component';
import { TalleresComponent } from './pages/talleres/talleres.component';
import { DialogHorariosComponent } from './component/dialog-sitio/dialog-horarios/dialog-horarios.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
//import { DialogMapaComponent } from './component/dialog-mapa/dialog-mapa.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DialogMapaComponent } from './component/dialog-municipio/dialog-mapa/dialog-mapa.component';
import { TalentDialogMapaComponent } from './component/dialog-talent/dialog-mapa/dialog-mapa.component';
import { TallerDialogMapaComponent } from './component/dialog-taller/dialog-mapa/dialog-mapa.component';
import { EventDialogMapaComponent } from './component/dialog-evento/dialog-mapa/dialog-mapa.component';


@NgModule({
  declarations: [IndexComponent, AdminComponent, UsuariosComponent, PaisesComponent, EstadosComponent, 
    CategoriasComponent, ServiciosComponent, MunicipiosComponent, SitiosComponent, TalentosComponent, 
    ProductosComponent, EventosComponent, TalleresComponent, PaypalComponent, DialogMapaComponent,TalentDialogMapaComponent,
    TallerDialogMapaComponent, EventDialogMapaComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
    NgxPayPalModule,
    
   
  ]
})
export class AdminModule { }
