import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogTallerComponent } from 'src/app/admin/component/dialog-taller/dialog-taller.component';
import { TalleresService } from '../../services/talleres.service';
import { Taller } from 'src/app/models/taller.model';

import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})

export class TalleresComponent implements OnInit {

  //#region VARIABLES

  public totalTalleres: number = 0;
  public talleres: Taller[] = [];
  public tallerById: Taller[] = [];
  public byId: any;
  public tallerModal = {};
  public pagina: any = 0;
  public totalTaller: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private talleresService: TalleresService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.talleresService.cargarTaller(this.pagina)
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

    this.talleresService.cargarTaller(this.pagina)
      .subscribe(resp => {
        this.totalTaller = resp.total;
        this.talleres = resp.talleres;
        this.dataSource = new MatTableDataSource<Taller>(this.talleres);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.talleresService.cargarTaller(this.pagina)
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
      const dialogRef = this.dialog.open(DialogTallerComponent, {
        height: '700px',
        width: '950px',
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
    const dialogRef = this.dialog.open(DialogTallerComponent, {
      height: '700px',
      width: '950px',
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
          this.talleresService.borrarTaller(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Taller>(this.talleres);
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

  displayedColumns: string[] = ['nombreTaller', 'ubicacion', 'precio', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Taller>(ELEMENT_DATA);

  columnas = [
    { titulo: "Taller", name: "nombreTaller" },
    { titulo: "Ubicacion", name: "ubicacion" },
    { titulo: "Precio", name: "precio" },
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
