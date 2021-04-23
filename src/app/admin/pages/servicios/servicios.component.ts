import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogServicioComponent } from 'src/app/admin/component/dialog-servicio/dialog-servicio.component';

import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from 'src/app/models/servicio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements AfterViewInit {

  //#region VARIABLES

  public totalServicios: number = 0;
  public servicios: Servicio[] = [];
  public serviciosById: Servicio[] = [];
  public byId: any;
  public serviciosModal = {};
  public pagina: any = 0;
  public totalServicio: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private serviciosServices: ServiciosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO INICIAL

  ngOnInit(): void {
    this.serviciosServices.cargarServicios(this.pagina)
      .subscribe(resp => {
        this.totalServicios = resp.total;
        this.est = resp.servicios.length;
        this.servicios = resp.servicios;
        this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
        this.totalServicio = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalServicios)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.serviciosServices.cargarServicios(this.pagina)
      .subscribe(resp => {
        this.totalServicios = resp.total;
        this.servicios = resp.servicios;
        this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
        this.totalServicio = resp.total;
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.serviciosServices.cargarServicios(this.pagina)
      .subscribe(resp => {
        this.totalServicios = resp.total;
        this.servicios = resp.servicios;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
        this.totalServicio = resp.total;
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(_id: any, nombreServicio: any, iconoIonic: any, iconoMaterial: any, descripcion: any, status: 'true' | 'false'): void {
    if (_id != null) {
      this.byId = _id;
      this.serviciosServices.cargarServiciosById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
      })
      const dialogRef = this.dialog.open(DialogServicioComponent, {
        height: '720px',
        width: '700px',

        data: {
          _id: _id,
          NombreServicio: nombreServicio,
          IconoIonic: iconoIonic,
          IconoMaterial: iconoMaterial,
          Descripcion: descripcion,
          Status: status
        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogServicioComponent, {
      height: '720px',
      width: '700px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.serviciosServices.cargarServiciosById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
      })
  }

  BorrarId(_id: any) {

    Swal.fire({
      title: 'Seguro que desea eliminar?',
      text: 'Se eliminará el registro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borralo!',
      cancelButtonText: 'No!',
    }).then((result) => {

      if (result.value) {
        Swal.fire(
          'Borrado',
          'Tu registro se ha eliminado.',
          'success',
        )

        if (result.isConfirmed) {
          this.serviciosServices.borrarServicio(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Servicio>(this.servicios);
          })
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu registro está seguro',
          'error'
        )
      }
    })
  }

  //#endregion

  //#region FORMATO DE TABLA DINÁMICA

  displayedColumns: string[] = ['nombreServicio', 'iconoIonic', 'iconoMaterial', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Servicio>(ELEMENT_DATA);

  columnas = [
    { titulo: "Servicio", name: "nombreServicio" },
    { titulo: "Ionic", name: "iconoIonic" },
    { titulo: "Material", name: "iconoMaterial" },
    { titulo: "Estado", name: "status" },

    { titulo: "Acciones", name: "acciones" },
  ];

  //#endregion

  //#region  FILTRADO POR TEXTO

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

const ELEMENT_DATA: Servicio[] = [
  //Se tiene que enviar sin datos.
];

//#endregion