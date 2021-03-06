import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogSitioComponent } from 'src/app/admin/component/dialog-sitio/dialog-sitio.component';
import { SitiosService } from '../../services/sitios.service';
import { Sitio } from 'src/app/models/sitio.model';

import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Municipio } from 'src/app/models/municipio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.css']
})

export class SitiosComponent implements AfterViewInit {

  //#region VARIABLES

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

  constructor(private sitiosService: SitiosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.sitiosService.cargarSitio(this.pagina)
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

    this.sitiosService.cargarSitio(this.pagina)
      .subscribe(resp => {
        this.totalSitio = resp.total;
        this.sitios = resp.sitios;
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.sitiosService.cargarSitio(this.pagina)
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

  openDialog(nombreSitio: string, imgPrincipal: string, video: string, descripcion: string, banner: string, nombreContacto1: string, telContacto1: string, correoContacto1: string,
    nombreContacto2: string, telContacto2: string, correoContacto2: string, servicios: string[], horarioOpen: string, horarioClose: string,
    ubicacion: string, licencia: Date, facebook: string, instagram: string, sitioWeb: string, categoria: Categoria, usuario: Usuario, municipio: Municipio, status: boolean, _id?: string): void {
    if (_id != null) {
      this.byId = _id;
      this.sitiosService.cargarSitioById(this.byId).subscribe(resp => {
        //this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
      const dialogRef = this.dialog.open(DialogSitioComponent, {
        height: '750px',
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
          Facebook: facebook,
          Instagram: instagram,
          SitioWeb: sitioWeb,

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
    const dialogRef = this.dialog.open(DialogSitioComponent, {
      height: '750px',
      width: '1300px',
    });
  }

  //#endregion

  //#region M??TODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.sitiosService.cargarSitioById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
      })
  }

  BorrarId(_id: any) {

    Swal.fire({
      title: 'Seguro que desea eliminar?',
      text: 'Se eliminar?? el registro.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'S??, borralo!',
      cancelButtonText: 'No!',
    }).then((result) => {

      if (result.value) {
        Swal.fire(
          'Borrado',
          'Tu registro se ha eliminado.',
          'success',
        )

        if (result.isConfirmed) {
          this.sitiosService.borrarSitio(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Sitio>(this.sitios);
          })
          setTimeout(function () {
            window.location.reload()
          }, 1000)
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu registro est?? seguro',
          'error'
        )
      }
    })

  }

  //#endregion

  //#region FORMATO TABLA DIN??MICA

  displayedColumns: string[] = ['nombreSitio', 'ubicacion', 'licencia', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Sitio>(ELEMENT_DATA);

  columnas = [
    { titulo: "Sitio", name: "nombreSitio" },
    { titulo: "Ubicacion", name: "ubicacion" },
    { titulo: "Licencia", name: "licencia" },
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

const ELEMENT_DATA: Sitio[] = [
  //Se tiene que enviar sin datos.
];

//#endregion
