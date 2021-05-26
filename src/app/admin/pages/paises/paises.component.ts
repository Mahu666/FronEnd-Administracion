import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPaisComponent } from 'src/app/admin/component/dialog-pais/dialog-pais.component';

import { PaisesService } from '../../services/paises.service';
import { Pais } from 'src/app/models/paises.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements AfterViewInit {

  //#region VARIABLES  

  public totalPaises: number = 0;
  public paises: Pais[] = [];
  public paisById: Pais[] = [];
  public byId: any;
  public paisModal = {};
  public pagina: any = 0;
  public totalPais: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private paisesServices: PaisesService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO INICIAL

  ngOnInit(): void {
    this.paisesServices.cargarPaises(this.pagina)
      .subscribe(resp => {
        this.totalPaises = resp.total;
        this.est = resp.paises.length;
        this.paises = resp.paises;
        this.dataSource = new MatTableDataSource<Pais>(this.paises);
        this.totalPais = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalPais)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    if (this.pagina > (this.totalPaises)) {
      this.pagina -= 5;
    }
    this.paisesServices.cargarPaises(this.pagina)
      .subscribe(resp => {
        this.totalPaises = resp.total;
        this.paises = resp.paises;
        this.dataSource = new MatTableDataSource<Pais>(this.paises);
        this.totalPais = resp.total;
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.paisesServices.cargarPaises(this.pagina)
      .subscribe(resp => {
        this.totalPaises = resp.total;
        this.paises = resp.paises;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Pais>(this.paises);
        this.totalPais = resp.total;
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(_id: any, nombrePais: any, status: boolean): void {
    if (_id != null) {
      this.byId = _id;
      this.paisesServices.cargarPaisById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Pais>(this.paises);
      })
      const dialogRef = this.dialog.open(DialogPaisComponent, {
        height: '320px',
        width: '550px',
        data: {
          _id: _id,
          NombrePais: nombrePais,
          Status: status
        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogPaisComponent, {
      height: '320px',
      width: '550px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.paisesServices.cargarPaisById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Pais>(this.paises);
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
          this.paisesServices.borrarPais(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Pais>(this.paises);
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

  displayedColumns: string[] = ['nombrePais', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Pais>(ELEMENT_DATA);

  columnas = [
    { titulo: "Pais", name: "nombrePais" },
    { titulo: "Est", name: "status" },

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

const ELEMENT_DATA: Pais[] = [
  //Se tiene que enviar sin datos.
  // { nombre: 'Manuel', email: 'manuelcruzhuitron@gmail.com', status: true, role: 'ADMIN_ROLE' },
];

//#endregion
