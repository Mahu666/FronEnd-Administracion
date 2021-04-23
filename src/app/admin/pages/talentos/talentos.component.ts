import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogTalentComponent } from 'src/app/admin/component/dialog-talent/dialog-talent.component';
import { TalentosService } from '../../services/talentos.service';
import { Talent } from 'src/app/models/talent.model';

import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Municipio } from 'src/app/models/municipio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talentos',
  templateUrl: './talentos.component.html',
  styleUrls: ['./talentos.component.css']
})

export class TalentosComponent implements OnInit {

  //#region VARIABLES

  public totalTalentos: number = 0;
  public talentos: Talent[] = [];
  public talentoById: Talent[] = [];
  public byId: any;
  public talentoModal = {};
  public pagina: any = 0;
  public totalTalento: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private talentosService: TalentosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGADO PRINCIPAL

  ngOnInit(): void {

    this.talentosService.cargarTalento(this.pagina)
      .subscribe(resp => {
        console.log('equisde', resp);
        this.totalTalentos = resp.total;
        this.est = resp.talentos.length;
        this.talentos = resp.talentos;
        this.dataSource = new MatTableDataSource<Talent>(this.talentos);
        this.totalTalento = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalTalento)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.talentosService.cargarTalento(this.pagina)
      .subscribe(resp => {
        this.totalTalento = resp.total;
        this.talentos = resp.talentos;
        this.dataSource = new MatTableDataSource<Talent>(this.talentos);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.talentosService.cargarTalento(this.pagina)
      .subscribe(resp => {
        this.totalTalento = resp.total;
        this.talentos = resp.talentos;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Talent>(this.talentos);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(nombreTalent: string, imgPrincipal: string, descripcion: string, video: string, nombreContacto1: string, telContacto1: string,
    correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, ubicacion: string, licencia: Date, facebook: string,
    instagram: string, sitioWeb: string, categoria: Categoria, usuario: Usuario, municipio: Municipio, status: boolean, _id?: string): void {
    if (_id != null) {
      this.byId = _id;
      this.talentosService.cargarTalentoById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Talent>(this.talentos);
      })
      const dialogRef = this.dialog.open(DialogTalentComponent, {
        height: '750px',
        width: '1300px',
        data: {
          NombreTalent: nombreTalent,
          ImgPrincipal: imgPrincipal,
          Descripcion: descripcion,
          Video: video,

          NombreContacto1: nombreContacto1,
          TelContacto1: telContacto1,
          CorreoContacto1: correoContacto1,

          NombreContacto2: nombreContacto2,
          TelContacto2: telContacto2,
          CorreoContacto2: correoContacto2,

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
    const dialogRef = this.dialog.open(DialogTalentComponent, {
      height: '750px',
      width: '1300px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.talentosService.cargarTalentoById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Talent>(this.talentos);
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
          this.talentosService.borrarTalento(_id).subscribe(resp => {
            this.dataSource = new MatTableDataSource<Talent>(this.talentos);
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

  displayedColumns: string[] = ['nombreTalent', 'ubicacion', 'licencia', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Talent>(ELEMENT_DATA);

  columnas = [
    { titulo: "Sitio", name: "nombreTalent" },
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

const ELEMENT_DATA: Talent[] = [
  //Se tiene que enviar sin datos.
];

//#endregion