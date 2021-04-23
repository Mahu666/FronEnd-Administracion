import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';

import { Servicio } from 'src/app/models/servicio.model';
import { ServiciosService } from 'src/app/admin/services/servicios.service'
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Sitio } from 'src/app/models/sitio.model';
import { SitiosService } from 'src/app/apapachador/services/sitios.service';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class AServiciosComponent implements OnInit {

  //#region VARIABLES

  public IdUsuario!: Usuario;

  public idServicioSelect: any;
  public datosServicio: Servicio[] = [];
  selectedSer: any;
  opcionServicio: Servicio[] = [];
  opcionServicioElim: Servicio[] = [];

  public idServicioSelectEdit: any;
  public datosServicioEdit: Sitio[] = [];
  public tempServicioEdit!: string[];
  selectedSerEdit: any;
  opcionServicioEdit: Sitio[] = [];

  public dataSitio: any;

  public nomServicio: any;
  public dto: any = [];

  public datosServicios: string[] = [];
  public prueba: Servicio[] = [];

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
  public fb: any;
  public ins: any;
  public sWeb: any;

  public txtAccion: string = '';
  selectedSTA: any;
  selectedUsu: any;
  selectedCat: any;
  selectedMun: any;

  //#endregion

  //#region VALIDACIÓN INICIAL

  selected = (this.data == null) ? this.datosServicioEdit : this.dto;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<AServiciosComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private serviciosServices: ServiciosService, private sitiosServices: SitiosService) {

    if (this.data !== null) {
      console.log('id Sitio:', this.data);
    }
    this.IdUsuario = authService.usuario;

    this.sitiosServices.cargarSitioById(this.data._id)
      .subscribe(resp => {
        this.dataSitio = resp.resp.sitio;
        this.selectedSTA = this.dataSitio.status;
        this.selectedCat = this.dataSitio.categoria;
        this.selectedUsu = this.dataSitio.usuario;
        this.selectedMun = this.dataSitio.municipio;
        console.log(this.dataSitio);
      })

    // console.log(this.IdUsuario);

  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {

    if (this.data == null) {
      this.sitiosServices.cargarSitio()
        .subscribe(resp => {
          this.datosServicioEdit = resp.sitios;
        });
    } else {
      if (this.data != null) {
        //AQUI DEBERÍA SER CARGARSERVICIOSBYSITIO
        this.sitiosServices.cargarSitioById(this.data._id)
          .subscribe(resp => {
            this.datosServicios = resp.resp.servicios;

            for (let i = 0; i < this.datosServicios.length; i++) {
              //console.log(this.datosServicios[i]);
              const dato1 = this.datosServicios[i];

              for (let i = 0; i < this.datosServicio.length; i++) {
                //console.log(this.datosServicio[i]);
                const dato2 = this.datosServicio[i]
                if (dato1 === dato2._id) {
                  console.log(dato2);
                  this.prueba.push(dato2);
                }
              }
            }

            console.log('', resp.resp.sitio);
          })
      }
    }

    this.serviciosServices.cargarServiciosTodos()
      .subscribe(resp => {
        this.datosServicio = resp.servicios;
        this.selectedSer = this.datosServicio;
      });
  }

  //#endregion

  //#region MÉTODO ACTUALIZAR

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

    //this.serv = this.dataSitio.servicios;
    this.horOpen = this.dataSitio.horarioOpen;
    this.horClose = this.dataSitio.horarioClose;
    this.ubi = this.dataSitio.ubicacion;
    this.lice = this.dataSitio.licencia;
    this.fb = this.dataSitio.facebook;
    this.ins = this.dataSitio.instagram;
    this.sWeb = this.dataSitio.sitioWeb;

    this.sitiosServices.actualizarSitio(this.nombreSit, this.sitImg, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.datosServicios, this.horOpen, this.horClose, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat,
      this.selectedUsu, this.selectedMun, this.selectedSTA, this.sitioId).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });

  }

  //#endregion

  //#region MÉTODOS OBTENER, AGREGAR Y ELIMINAR

  obtenerServicio() {
    this.idServicioSelect = this.opcionServicio;
    console.log(this.idServicioSelect);
  }

  agregarServicio() {

    this.serviciosServices.cargarServiciosById(this.idServicioSelect).subscribe(resp => {
      //AQUI GUARDAR EL SERVICIO QUE ME TRAIGA AL SITIO      
      this.nomServicio = resp.resp.servicio;
      console.log(this.nomServicio);
      this.prueba.push(this.nomServicio);
      this.datosServicios.push(this.nomServicio);
      this.txtAccion = this.nomServicio.nombreServicio + ' agregado -> ';
      console.log(this.datosServicios);
    });

  }

  eliminarServicio() {

    this.idServicioSelect = this.opcionServicioElim;
    console.log(this.idServicioSelect);

    const inde = this.datosServicios.indexOf(this.idServicioSelect)
    this.datosServicios.splice(inde, 1);
    this.prueba.splice(inde, 1);
    console.log(this.datosServicios);
  }

  //#endregion

}
