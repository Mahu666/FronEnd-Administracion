import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCategoriaComponent } from 'src/app/admin/component/dialog-categoria/dialog-categoria.component';

import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from 'src/app/models/categoria.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements AfterViewInit {

  //#region VARIABLES

  public totalCategorias: number = 0;
  public categorias: Categoria[] = [];
  public categoriaById: Categoria[] = [];
  public byId: any;
  public categoriaModal = {};// Usuario[] = [];
  public pagina: any = 0;
  public totalCategoria: any = 0;
  public color: any;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private categoriasServices: CategoriasService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO INICIAL

  ngOnInit(): void {
    this.categoriasServices.cargarCategorias(this.pagina)
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.est = resp.categorias.length;
        this.categorias = resp.categorias;
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
        this.totalCategoria = resp.total;
        this.dataSource.paginator = this.paginator;
        if (status == 'true') {
          this.color = 'green'
        } else {
          this.color = 'red'
        }
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalCategoria)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.categoriasServices.cargarCategorias(this.pagina)
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
        this.totalCategoria = resp.total;
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.categoriasServices.cargarCategorias(this.pagina)
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
        this.totalCategoria = resp.total;
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(_id: any, nombreCategoria: any, descripcion: string, status: boolean, tipo: string,): void {
    if (_id != null) {
      this.byId = _id;
      this.categoriasServices.cargarCategoriaById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
      })
      const dialogRef = this.dialog.open(DialogCategoriaComponent, {
        height: '620px',
        width: '600px',
        data: {
          _id: _id,
          NombreCategoria: nombreCategoria,
          Descripcion: descripcion,
          Status: status,
          Tipo: tipo
        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      height: '620px',
      width: '600px',
    });
  }

  //#endregion

  //#region MÉTODDOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.categoriasServices.cargarCategoriaById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
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
          this.categoriasServices.borrarCategoria(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
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

  displayedColumns: string[] = ['nombreCategoria', 'tipo', 'status', 'acciones',];
  dataSource = new MatTableDataSource<Categoria>(ELEMENT_DATA);

  columnas = [
    { titulo: "Categoria", name: "nombreCategoria" },
    { titulo: "Tipo", name: "tipo" },
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

const ELEMENT_DATA: Categoria[] = [
  //Se tiene que enviar sin datos.
];

//#endregion
