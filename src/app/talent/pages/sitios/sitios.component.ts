import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ATDialogSitioComponent } from 'src/app/talent/component/dialog-sitio/dialog-sitio.component';
import { SitiosService } from '../../services/sitios.service';
import { UsuarioService } from '../../services/usuario.service';
import { Sitio } from 'src/app/models/sitio.model';

import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Municipio } from 'src/app/models/municipio.model';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.css']
})
//*****************************************VER CÓMO TRAER EL ID DEL APAPACHADOR****************************************** */
//*****************RESP.BODY._ID ??  RESP._ID ************************** */
//*****************EN EL APARTADO MÉTODOS PRINCIPALES BY ID, CREAR UNO PARA OBTENER ID DEL USUARIO ?? */
export class SitiosComponent implements AfterViewInit {

  //#region VARIABLES
  
  public IdUsuario!: Usuario;
  public usuario!: Usuario;
  public totalSitios: number = 0;
  public sitios: Sitio[] = [];
  public sitioById: Sitio[] = [];
  public byId: any;
  public sitioModal = {};
  public pagina: any = 0;
  public totalSitio: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private sitiosService: SitiosService, public dialog: MatDialog, private authService: AuthService) {
    this.IdUsuario = authService.usuario;
    console.log(this.IdUsuario);
  }

  //#endregion

  //#region CARGADO PRINCIPAL BY USUARIO

  ngOnInit(): void {
    //this.idUsuario();
    console.log(this.IdUsuario.uid);
    this.sitiosService.cargarSitioByUsuario(this.IdUsuario.uid)
      .subscribe(resp => {
        this.totalSitios = resp.total;
        this.est = resp.sitios.length;
        this.sitios = resp.sitios;
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
        this.totalSitio = resp.total;
        this.dataSource.paginator = this.paginator;

      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalSitio)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }
    //THIS.PAGINA ???? O THIS._ID
    this.sitiosService.cargarSitioByUsuario(this.IdUsuario.uid)
      .subscribe(resp => {
        this.totalSitio = resp.total;
        this.sitios = resp.sitios;
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.sitiosService.cargarSitioByUsuario(this.IdUsuario.uid)
      .subscribe(resp => {
        this.totalSitio = resp.total;
        this.sitios = resp.sitios;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(nombreSitio: string, imgPrincipal: string, video: string, descripcion: string, banner: string, nombreContacto1: string, telContacto1: string,
    correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, servicios: string, horarioOpen: string, horarioClose: string,
    ubicacion: string, licencia: Date, categoria: Categoria, usuario: Usuario, municipio: Municipio, status: boolean, _id?: string): void {
    if (_id != null) {
      this.byId = _id;
      this.sitiosService.cargarSitioById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
      const dialogRef = this.dialog.open(ATDialogSitioComponent, {
        height: '770px',
        width: '1300px',
        data: {
          NombreSitio: nombreSitio,
          ImgPrincipal: imgPrincipal,
          Video: video,
          Descripcion: descripcion,
          Banner: banner,

          NombreContacto1: nombreContacto1,
          TelContacto1: telContacto1,
          CorreoContacto1: correoContacto1,

          NombreContacto2: nombreContacto2,
          TelContacto2: telContacto2,
          CorreoContacto2: correoContacto2,

          Servicios: servicios,
          HorarioOpen: horarioOpen,
          HorarioClose: horarioClose,
          Ubicacion: ubicacion,
          Licencia: licencia,

          Categoria: categoria,
          Usuario: usuario,
          Municipio: municipio,

          Status: status,
          _id: _id

        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ATDialogSitioComponent, {
      height: '620px',
      width: '1300px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(): void {
    //this.byId = apapa    
    this.sitiosService.cargarSitioById(this.byId)
      .subscribe(resp => {
        const id = resp.resp.uid;
        console.log(id);
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
  }

  BorrarId(_id: any) {
    if (confirm('Seguro que desea eliminar?')) {
      this.sitiosService.borrarSitio(_id).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
        window.location.reload();
      })
    }
  }

  //#endregion

  //#region FORMATO TABLA DINÁMICA

  displayedColumns: string[] = ['nombreSitio', 'ubicacion', 'licencia', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Sitio>(ELEMENT_DATA);

  columnas = [    
    { titulo: "Sitio", name: "nombreSitio" },
    { titulo: "Servicios", name: "servicios" },
    { titulo: "Ubicacion", name: "ubicacion" },
    { titulo: "Licencia", name: "licencia" },

    { titulo: "Acciones", name: "acciones" },
  ];

  //#endregion

  //#region FILTRADO POR TEXTO

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //#endregion

}

//#region ELEMENT_DATA

const ELEMENT_DATA: Sitio[] = [
  //Se tiene que enviar sin datos.
];

//#endregion

