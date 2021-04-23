import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ADialogEventoComponent } from 'src/app/apapachador/component/dialog-evento/dialog-evento.component';
import { EventosService } from '../../services/eventos.service';
import { Evento } from 'src/app/models/evento.model';

import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';
import { SitiosService } from '../../services/sitios.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  //#region VARIABLES

  public IdUsuario!: Usuario;
  public totalEventos: number = 0;
  public eventos: Evento[] = [];
  public eventoById: Evento[] = [];
  public byId: any;
  public eventoModal = {};
  public pagina: any = 0;
  public totalEvento: any = 0;

  public idSitioSelect: any;
  public datosSitio: Sitio[] = [];
  selectedSit: any;
  opcionSeleccionado: Sitio[] = [];

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private eventosService: EventosService, private sitiosServices: SitiosService, private authService: AuthService,
    public dialog: MatDialog) {
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

    if (this.pagina >= (this.totalEvento)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.eventosService.cargarEventoBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalEvento = resp.total;
        this.eventos = resp.eventos;
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.eventosService.cargarEventoBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalEvento = resp.total;
        this.eventos = resp.eventos;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(nombreEvento: string, imgPrincipal: string, descripcion: string, horario: string, ubicacion: string,
    sitio: Sitio, talent: Talent, status: boolean, _id?: string): void {
    if (_id != null) {
      this.byId = _id;
      this.eventosService.cargarEventoById(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
      })
      const dialogRef = this.dialog.open(ADialogEventoComponent, {
        height: '700px',
        width: '950px',
        data: {
          NombreEvento: nombreEvento,
          ImgPrincipal: imgPrincipal,
          Descripcion: descripcion,
          Horario: horario,
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
    const dialogRef = this.dialog.open(ADialogEventoComponent, {
      height: '700px',
      width: '950px',
    });
  }

  //#endregion

  //#region MÉTODOS PRINCIPALES BY ID

  obtenerById(_id: any): void {
    this.byId = _id;
    this.eventosService.cargarEventoById(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
      })
  }

  BorrarId(_id: any) {
    if (confirm('Seguro que desea eliminar?')) {
      this.eventosService.borrarEvento(_id).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
        window.location.reload();
      })
    }
  }

  obtenerSitio() {
    this.idSitioSelect = this.opcionSeleccionado;
    console.log(this.idSitioSelect);
    this.eventosService.cargarEventoBySitio(this.idSitioSelect)
      .subscribe(resp => {
        this.totalEventos = resp.total;
        this.est = resp.eventos.length;
        this.eventos = resp.eventos;
        this.dataSource = new MatTableDataSource<Evento>(this.eventos);
        this.totalEvento = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region FORMATO TABLA DINÁMICA

  displayedColumns: string[] = ['nombreEvento', 'horario', 'ubicacion', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Evento>(ELEMENT_DATA);

  columnas = [    
    { titulo: "Evento", name: "nombreEvento" },
    { titulo: "Horario", name: "horario" },
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

const ELEMENT_DATA: Evento[] = [
  //Se tiene que enviar sin datos.
];

//#endregion
