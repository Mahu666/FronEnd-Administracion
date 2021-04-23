import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ResetpassComponent } from './auth/pages/resetpass/resetpass.component';
import { PublicModule } from './public/public.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MyDialogComponent } from './admin/component/DialogUsuario/my-dialog.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogPaisComponent } from './admin/component/dialog-pais/dialog-pais.component';
import { DialogEstadoComponent } from './admin/component/dialog-estado/dialog-estado.component';
import { DialogCategoriaComponent } from './admin/component/dialog-categoria/dialog-categoria.component';
import { DialogServicioComponent } from './admin/component/dialog-servicio/dialog-servicio.component';
import { DialogMunicipioComponent } from './admin/component/dialog-municipio/dialog-municipio.component';
import { DialogSitioComponent } from './admin/component/dialog-sitio/dialog-sitio.component';
import { DialogEventoComponent } from './admin/component/dialog-evento/dialog-evento.component';
import { DialogProductoComponent } from './admin/component/dialog-producto/dialog-producto.component';
import { DialogTalentComponent } from './admin/component/dialog-talent/dialog-talent.component';
import { DialogTallerComponent } from './admin/component/dialog-taller/dialog-taller.component';
import { ADialogSitioComponent } from './apapachador/component/dialog-sitio/dialog-sitio.component';
import { ADialogEventoComponent } from './apapachador/component/dialog-evento/dialog-evento.component';
import { ADialogProductoComponent } from './apapachador/component/dialog-producto/dialog-producto.component';
import { ADialogTallerComponent } from './apapachador/component/dialog-taller/dialog-taller.component';
import { AServiciosComponent } from './admin/component/dialog-sitio/servicios/servicios.component';
import { APServiciosComponent } from './apapachador/component/dialog-sitio/servicios/servicios.component';
//import { TalentComponent } from './talent/talent.component'
import { ATDialogSitioComponent } from './talent/component/dialog-sitio/dialog-sitio.component';
import { ATDialogEventoComponent } from './talent/component/dialog-evento/dialog-evento.component';
import { ATDialogProductoComponent } from './talent/component/dialog-producto/dialog-producto.component';
import { ATDialogTallerComponent } from './talent/component/dialog-taller/dialog-taller.component';
import { ATPServiciosComponent } from './talent/component/dialog-sitio/servicios/servicios.component';
import { DialogMapaComponent } from 'src/app/admin/component/dialog-sitio/dialog-mapa/dialog-mapa.component'
import { ADialogMapaComponent } from 'src/app/apapachador/component/dialog-sitio/dialog-mapa/dialog-mapa.component'
import { TDialogMapaComponent } from 'src/app/talent/component/dialog-sitio/dialog-mapa/dialog-mapa.component'
import { DialogHorariosComponent } from 'src/app/admin/component/dialog-sitio/dialog-horarios/dialog-horarios.component'
import { ADialogHorariosComponent } from 'src/app/apapachador/component/dialog-sitio/dialog-horarios/dialog-horarios.component'
import { TDialogHorariosComponent } from 'src/app/talent/component/dialog-sitio/dialog-horarios/dialog-horarios.component'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPayPalModule } from 'ngx-paypal';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,    
    MyDialogComponent,    
    ADialogSitioComponent,
    ADialogEventoComponent,
    ADialogProductoComponent,
    ADialogTallerComponent,
    DialogPaisComponent,
    DialogEstadoComponent,
    DialogCategoriaComponent,
    DialogServicioComponent,
    DialogMunicipioComponent,
    DialogSitioComponent,
    DialogEventoComponent,
    DialogProductoComponent,
    DialogTalentComponent,
    DialogTallerComponent,
    AServiciosComponent,
    APServiciosComponent,
    ATDialogSitioComponent,
    ATDialogEventoComponent,
    ATDialogProductoComponent,
    ATDialogTallerComponent,
    ATPServiciosComponent,
    DialogMapaComponent,
    ADialogMapaComponent,
    TDialogMapaComponent,
    DialogHorariosComponent,
    ADialogHorariosComponent,
    TDialogHorariosComponent,
    
  ],
  imports: [

    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    NgxPaginationModule,
    PublicModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMaterialTimepickerModule,
    AngularEditorModule,
    NgxPayPalModule,
    MatTabsModule,
    MatCardModule,
    ScrollingModule
  ],
  providers: [],
  entryComponents: [MyDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
