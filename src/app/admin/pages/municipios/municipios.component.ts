import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogMunicipioComponent } from 'src/app/admin/component/dialog-municipio/dialog-municipio.component';
import { MunicipiosService } from '../../services/municipios.service';
import { Municipio } from 'src/app/models/municipio.model';

import { Estado } from 'src/app/models/estado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})

export class MunicipiosComponent implements AfterViewInit {

  //#region VARIABLES

  public totalMunicipios: number = 0;
  public municipios: Municipio[] = [];
  public municipioById: Municipio[] = [];
  public byId: any;
  public municipioModal = {};
  public pagina: any = 0;
  public totalMunicipio: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private municipiosService: MunicipiosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.municipiosService.cargarMunicipio(this.pagina)
      .subscribe(resp => {
        this.totalMunicipios = resp.total;
        this.est = resp.municipios.length;
        this.municipios = resp.municipios;
        this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
        this.totalMunicipio = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalMunicipio)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.municipiosService.cargarMunicipio(this.pagina)
      .subscribe(resp => {
        this.totalMunicipio = resp.total;
        this.municipios = resp.municipios;
        this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.municipiosService.cargarMunicipio(this.pagina)
      .subscribe(resp => {
        this.totalMunicipio = resp.total;
        this.municipios = resp.municipios;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(nombreMunicipio: string, imgPrincipal: string, historia: string, imgHistoria: string, videoHistoria: string,
    tradiciones: string, imgTradiciones: string, videoTradiciones: string, cultura: string, imgCultura: string,
    videoCultura: string, clima: string, ubicacion: string, status: boolean, _id: any, estado?: Estado): void {
    if (_id != null) {
      this.byId = _id;
      this.municipiosService.cargarMunicipioById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
      })
      const dialogRef = this.dialog.open(DialogMunicipioComponent, {
        height: '620px',
        width: '1200px',
        data: {

          NombreMunicipio: nombreMunicipio,
          ImgPrincipal: imgPrincipal,
          Historia: historia,
          ImgHistoria: imgHistoria,
          VideoHistoria: videoHistoria,
          Tradiciones: tradiciones,
          ImgTradiciones: imgTradiciones,
          VideoTradiciones: videoTradiciones,
          Cultura: cultura,
          ImgCultura: imgCultura,
          VideoCultura: videoCultura,
          Clima: clima,
          Ubicacion: ubicacion,

          Status: status,
          _id: _id,
          Estado: estado

        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogMunicipioComponent, {
      height: '620px',
      width: '1200px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.municipiosService.cargarMunicipioById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
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
          this.municipiosService.borrarMunicipio(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Municipio>(this.municipios);
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

  displayedColumns: string[] = ['nombreMunicipio', 'ubicacion', 'clima', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Municipio>(ELEMENT_DATA);

  columnas = [
    { titulo: "Municipio", name: "nombreMunicipio" },
    { titulo: "Ubicacion", name: "ubicacion" },
    { titulo: "Clima", name: "clima" },
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

const ELEMENT_DATA: Municipio[] = [
  //Se tiene que enviar sin datos.
];

//#endregion