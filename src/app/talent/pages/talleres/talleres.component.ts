import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ATDialogTallerComponent } from 'src/app/talent/component/dialog-taller/dialog-taller.component';
import { TalleresService } from '../../services/talleres.service';
import { Taller } from 'src/app/models/taller.model';

import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SitiosService } from '../../services/sitios.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {

  //#region VARIABLES

  public IdUsuario!: Usuario;
  public _idSitio?: string = '60381ddbbd59193a642fef24';

  public totalTalleres: number = 0;
  public talleres: Taller[] = [];
  public tallerById: Taller[] = [];
  public byId: any;
  public tallerModal = {};
  public pagina: any = 0;
  public totalTaller: any = 0;

  public idSitioSelect: any;
  public datosSitio: Sitio[] = [];
  selectedSit: any;
  opcionSeleccionado: Sitio[] = [];

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private talleresService: TalleresService, private sitiosServices: SitiosService, private authService: AuthService, public dialog: MatDialog,) {
    this.IdUsuario = authService.usuario;
    console.log(this.IdUsuario);
  }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.sitiosServices.cargarSitioByUsuario(this.IdUsuario.uid)
      .subscribe(resp => {
        this.datosSitio = resp.sitios;
        console.log(this.datosSitio);
        this.selectedSit = this.datosSitio;
      });

  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalTaller)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.talleresService.cargarTallerBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalTaller = resp.total;
        this.talleres = resp.talleres;
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.talleresService.cargarTallerBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalTaller = resp.total;
        this.talleres = resp.talleres;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(nombreTaller: string, imgPrincipal: string, descripcion: string, precio: string, ubicacion: string,
    sitio: Sitio, talent: Talent, status: boolean, _id?: string): void {
    if (_id != null) {
      this.byId = _id;
      this.talleresService.cargarTallerById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
      })
      const dialogRef = this.dialog.open(ATDialogTallerComponent, {
        height: '620px',
        width: '900px',
        data: {
          NombreTaller: nombreTaller,
          ImgPrincipal: imgPrincipal,
          Descripcion: descripcion,
          Precio: precio,
          Ubicacion: ubicacion,

          Sitio: sitio,
          Talent: talent,

          Status: status,
          _id: _id

        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ATDialogTallerComponent, {
      height: '620px',
      width: '900px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.talleresService.cargarTallerById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
      })
  }

  BorrarId(_id: any) {
    if (confirm('Seguro que desea eliminar?')) {
      this.talleresService.borrarTaller(_id).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
        window.location.reload();
      })
    }
  }

  obtenerSitio() {
    this.idSitioSelect = this.opcionSeleccionado;
    console.log(this.idSitioSelect);
    this.talleresService.cargarTallerBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalTalleres = resp.total;
        this.est = resp.talleres.length;
        this.talleres = resp.talleres;
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
        this.totalTaller = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region FORMATO TABLA DINÁMICA

  displayedColumns: string[] = ['nombreTaller', 'precio', 'ubicacion', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Taller>(ELEMENT_DATA);

  columnas = [    
    { titulo: "Producto", name: "nombreTaller" },    
    { titulo: "Precio", name: "precio" },
    { titulo: "Ubicacion", name: "ubicacion" },
    { titulo: "Status", name: "status" },

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

const ELEMENT_DATA: Taller[] = [
  //Se tiene que enviar sin datos.
];

//#endregion

