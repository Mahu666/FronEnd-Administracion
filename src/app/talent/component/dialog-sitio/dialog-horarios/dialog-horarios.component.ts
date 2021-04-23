import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SitiosService } from 'src/app/talent/services/sitios.service';
import { Sitio } from 'src/app/models/sitio.model';

@Component({
  selector: 'app-dialog-horarios',
  templateUrl: './dialog-horarios.component.html',
  styleUrls: ['./dialog-horarios.component.css']
})
export class TDialogHorariosComponent implements OnInit {

  //#region VARIABLES 

  public hora: string = '';

  //#region TIMEPICKERS

  public pckLunes: any;
  public pckMartes: any;
  public pckMiercoles: any;
  public pckJueves: any;
  public pckViernes: any;
  public pckSabado: any;
  public pckDomingo: any;

  //#endregion

  //#region LABELS HORARIOS APERTURA Y CIERRE

  public txtLunesO: string = '';
  public txtLunesC: string = '';
  public txtMartesO: string = '';
  public txtMartesC: string = '';
  public txtMiercolesO: string = '';
  public txtMiercolesC: string = '';
  public txtJuevesO: string = '';
  public txtJuevesC: string = '';
  public txtViernesO: string = '';
  public txtViernesC: string = '';
  public txtSabadoO: string = '';
  public txtSabadoC: string = '';
  public txtDomingoO: string = '';
  public txtDomingoC: string = '';

  //#endregion

  //#region ARRAYS HORARIOS

  public datosSitioEdit: Sitio[] = [];
  public horSitioOpen: string[] = ['', '', '', '', '', '', ''];
  public horSitioClose: string[] = ['', '', '', '', '', '', ''];
  public arraysOpen: string[] = [];
  public arraysClose: string[] = [];

  //#endregion

  //#region ASIGNAR DATOS DE SITIO

  public dataSitio: any;
  selectedSTA: any;
  selectedUsu: any;
  selectedCat: any;
  selectedMun: any;

  public sitioId: any;
  public nombreSit: any;
  public sitI: any;
  public sitImg: any;
  public vid: any;

  public desc: any;
  public bann: any;
  public nombreCont1: any;
  public telCont1: any;
  public correoCont1: any;

  public nombreCont2: any;
  public telCont2: any;
  public correoCont2: any;

  public serv: any;
  public horOpen: any;
  public horClose: any;
  public ubi: any;
  //************************************************* licencia ES TIPO DATE EN MODEL API **************************************************
  public lice: any;
  public datosServicios: any;
  public fb: any;
  public ins: any;
  public sWeb: any;

  //#endregion

  //#endregion

  //#region CONSTRUCTOR Y ASIGNACIÓN DE DATOS

  constructor(public dialogRef: MatDialogRef<TDialogHorariosComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sitiosServices: SitiosService) {
    if (this.data !== null) {
      console.log('id Sitio:', this.data);
    }
    this.sitiosServices.cargarSitioById(this.data._id)
      .subscribe(resp => {
        this.dataSitio = resp.resp.sitio;
        this.selectedSTA = this.dataSitio.status;
        this.selectedCat = this.dataSitio.categoria;
        this.selectedUsu = this.dataSitio.usuario;
        this.selectedMun = this.dataSitio.municipio;
        this.datosServicios = this.dataSitio.servicios;

        console.log(this.dataSitio);
      })
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {
    if (this.data == null) {
      this.sitiosServices.cargarSitio()
        .subscribe(resp => {
          this.datosSitioEdit = resp.sitios;
        });
    } else {
      if (this.data != null) {

        this.sitiosServices.cargarSitioById(this.data._id)
          .subscribe(resp => {
            this.datosSitioEdit = resp.resp.sitio;
            this.arraysOpen = resp.resp.horarioOpen;
            this.arraysClose = resp.resp.horarioClose;

            this.txtLunesO = this.arraysOpen[0];
            this.txtLunesC = this.arraysClose[0];
            this.txtMartesO = this.arraysOpen[1];
            this.txtMartesC = this.arraysClose[1];
            this.txtMiercolesO = this.arraysOpen[2];
            this.txtMiercolesC = this.arraysClose[2];
            this.txtJuevesO = this.arraysOpen[3];
            this.txtJuevesC = this.arraysClose[3];
            this.txtViernesO = this.arraysOpen[4];
            this.txtViernesC = this.arraysClose[4];
            this.txtSabadoO = this.arraysOpen[5];
            this.txtSabadoC = this.arraysClose[5];
            this.txtDomingoO = this.arraysOpen[6];
            this.txtDomingoC = this.arraysClose[6];

            this.horSitioOpen[0] = this.arraysOpen[0];
            this.horSitioOpen[1] = this.arraysOpen[1];
            this.horSitioOpen[2] = this.arraysOpen[2];
            this.horSitioOpen[3] = this.arraysOpen[3];
            this.horSitioOpen[4] = this.arraysOpen[4];
            this.horSitioOpen[5] = this.arraysOpen[5];
            this.horSitioOpen[6] = this.arraysOpen[6];

            this.horSitioClose[0] = this.arraysClose[0];
            this.horSitioClose[1] = this.arraysClose[1];
            this.horSitioClose[2] = this.arraysClose[2];
            this.horSitioClose[3] = this.arraysClose[3];
            this.horSitioClose[4] = this.arraysClose[4];
            this.horSitioClose[5] = this.arraysClose[5];
            this.horSitioClose[6] = this.arraysClose[6];

            console.log('', resp.resp.sitio);
            console.log('ARRAYSOPEN: ', this.arraysOpen);
            console.log('ARRAYSCLOSE: ', this.arraysClose);
          })
      }
    }

  }

  //#endregion

  //#region AGREGAR HORARIOS OPEN Y CLOSE

  //#region LUNES

  agregarHorarioOpenL() {
    this.hora = this.pckLunes;
    this.txtLunesO = this.pckLunes
    console.log(this.hora);
    this.horSitioOpen[0] = this.txtLunesO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseL() {
    this.hora = this.pckLunes;
    this.txtLunesC = this.pckLunes
    console.log(this.hora);
    this.horSitioClose[0] = this.txtLunesC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#region MARTES

  agregarHorarioOpenMa() {
    this.hora = this.pckMartes;
    this.txtMartesO = this.pckMartes;
    console.log(this.hora);
    this.horSitioOpen[1] = this.txtMartesO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseMa() {
    this.hora = this.pckMartes;
    this.txtMartesC = this.pckMartes;
    console.log(this.hora);
    this.horSitioClose[1] = this.txtMartesC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#region MIÉRCOLES

  agregarHorarioOpenMi() {
    this.hora = this.pckMiercoles;
    this.txtMiercolesO = this.pckMiercoles;
    console.log(this.hora);
    this.horSitioOpen[2] = this.txtMiercolesO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseMi() {
    this.hora = this.pckMiercoles;
    this.txtMiercolesC = this.pckMiercoles;
    console.log(this.hora);
    this.horSitioClose[2] = this.txtMiercolesC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#region JUEVES

  agregarHorarioOpenJu() {
    this.hora = this.pckJueves;
    this.txtJuevesO = this.pckJueves;
    console.log(this.hora);
    this.horSitioOpen[3] = this.txtJuevesO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseJu() {
    this.hora = this.pckJueves;
    this.txtJuevesC = this.pckJueves;
    console.log(this.hora);
    this.horSitioClose[3] = this.txtJuevesC;
    console.log(this.horSitioClose);
  }

  //#endregion JUEVES

  //#region VIERNES

  agregarHorarioOpenVi() {
    this.hora = this.pckViernes;
    this.txtViernesO = this.pckViernes;
    console.log(this.hora);
    this.horSitioOpen[4] = this.txtViernesO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseVi() {
    this.hora = this.pckViernes;
    this.txtViernesC = this.pckViernes;
    console.log(this.hora);
    this.horSitioClose[4] = this.txtViernesC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#region SÁBADO

  agregarHorarioOpenSa() {
    this.hora = this.pckSabado;
    this.txtSabadoO = this.pckSabado;
    console.log(this.hora);
    this.horSitioOpen[5] = this.txtSabadoO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseSa() {
    this.hora = this.pckSabado;
    this.txtSabadoC = this.pckSabado;
    console.log(this.hora);
    this.horSitioClose[5] = this.txtSabadoC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#region DOMINGO

  agregarHorarioOpenDo() {
    this.hora = this.pckDomingo;
    this.txtDomingoO = this.pckDomingo;
    console.log(this.hora);
    this.horSitioOpen[6] = this.txtDomingoO;
    console.log(this.horSitioOpen);
  }

  agregarHorarioCloseDo() {
    this.hora = this.pckDomingo;
    this.txtDomingoC = this.pckDomingo;
    console.log(this.hora);
    this.horSitioClose[6] = this.txtDomingoC;
    console.log(this.horSitioClose);
  }

  //#endregion

  //#endregion

  //#region GUARDAR

  save() {

    this.sitioId = this.dataSitio._id;

    this.nombreSit = this.dataSitio.nombreSitio;
    this.sitImg = this.dataSitio.imgPrincipal;
    this.vid = this.dataSitio.video;
    this.desc = this.dataSitio.descripcion;
    this.bann = this.dataSitio.banner;

    this.nombreCont1 = this.dataSitio.nombreContacto1;
    this.telCont1 = this.dataSitio.telContacto1;
    this.correoCont1 = this.dataSitio.correoContacto1;

    this.nombreCont2 = this.dataSitio.nombreContacto2;
    this.telCont2 = this.dataSitio.telContacto2;
    this.correoCont2 = this.dataSitio.correoContacto2;

    this.horOpen = this.dataSitio.horarioOpen;
    this.horClose = this.dataSitio.horarioClose;
    this.ubi = this.dataSitio.ubicacion;
    this.lice = this.dataSitio.licencia;
    this.fb = this.dataSitio.facebook;
    this.ins = this.dataSitio.instagram;
    this.sWeb = this.dataSitio.sitioWeb;

    this.sitiosServices.actualizarSitio(this.nombreSit, this.sitImg, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.datosServicios, this.horSitioOpen, this.horSitioClose, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat,
      this.selectedUsu, this.selectedMun, this.selectedSTA, this.sitioId).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });

  }

  //#endregion


}
