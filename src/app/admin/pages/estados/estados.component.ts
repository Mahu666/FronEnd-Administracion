import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogEstadoComponent } from 'src/app/admin/component/dialog-estado/dialog-estado.component';
import { EstadosService } from '../../services/estados.service';
import { Estado } from 'src/app/models/estado.model';
import { Pais } from 'src/app/models/paises.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements AfterViewInit {

  //#region VARIABLES

  public totalEstados: number = 0;
  public estados: Estado[] = [];
  public estadoById: Estado[] = [];
  public byId: any;
  public estadoModal = {};
  public pagina: any = 0;
  public totalEstado: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private estadosService: EstadosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.estadosService.cargarEstado(this.pagina)
      .subscribe(resp => {
        this.totalEstados = resp.total;
        this.est = resp.estados.length;
        this.estados = resp.estados;
        this.dataSource = new MatTableDataSource<Estado>(this.estados);
        this.totalEstado = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalEstado)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.estadosService.cargarEstado(this.pagina)
      .subscribe(resp => {
        this.totalEstado = resp.total;
        this.estados = resp.estados;
        this.dataSource = new MatTableDataSource<Estado>(this.estados);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.estadosService.cargarEstado(this.pagina)
      .subscribe(resp => {
        this.totalEstado = resp.total;
        this.estados = resp.estados;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Estado>(this.estados);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(_id: any, nombreEstado: any, status: boolean, pais?: Pais): void {
    if (_id != null) {
      this.byId = _id;
      console.log(pais)
      this.estadosService.cargarEstadoById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Estado>(this.estados);
      })
      const dialogRef = this.dialog.open(DialogEstadoComponent, {
        height: '430px',
        width: '600px',
        data: {
          _id: _id,
          NombreEstado: nombreEstado,
          Status: status,
          Pais: pais
        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogEstadoComponent, {
      height: '430px',
      width: '600px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.estadosService.cargarEstadoById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Estado>(this.estados);
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
          this.estadosService.borrarEstado(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Estado>(this.estados);
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

  //#region FORMATO TABLA DINÁMICA

  displayedColumns: string[] = ['nombreEstado', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Estado>(ELEMENT_DATA);

  columnas = [
    { titulo: "Estado", name: "nombreEstado" },
    { titulo: "Pais", name: "pais" },

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

const ELEMENT_DATA: Estado[] = [
  //Se tiene que enviar sin datos.
];

//#endregion
