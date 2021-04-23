import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { SitiosService } from '../../../services/sitios.service';


@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class ADialogMapaComponent implements AfterViewInit {

  //#region VARIABLES

  mapa!: mapboxgl.Map;
  cordenadas: string = '20.053774997902067,-99.34392488414645';
  public prueba: [number, number] = [-99.34392488414645, 20.053774997902067];

  public pru1: any;
  public pru2: any;

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
  selectedSTA: any;
  selectedUsu: any;
  selectedCat: any;
  selectedMun: any;
  public obtenida: boolean = false;
  public divi: any;
  public txtTexto: string = '';
  public dataSitio: any;

  public ub: any;
  public fb: any;
  public ins: any;
  public sWeb: any;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<ADialogMapaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private sitiosServices: SitiosService) {

  }

  //#endregion

  //#region CARGA INICIAL MAPA

  ngAfterViewInit() {

    if (this.ub !== null) {
      //AQUI DEBE IR UN IF VALIDANDO QUE LA UBICACION NO SEA NULL
      this.sitiosServices.cargarSitioById(this.data._id)
        .subscribe(resp => {
          this.dataSitio = resp.resp.sitio;
          this.selectedSTA = this.dataSitio.status;
          this.selectedCat = this.dataSitio.categoria;
          this.selectedUsu = this.dataSitio.usuario;
          this.selectedMun = this.dataSitio.municipio;
          this.ub = this.dataSitio.ubicacion;

          if (this.ub !== undefined) {
            this.cordenadas = this.dataSitio.ubicacion;
            this.divi = this.cordenadas.split(",", 2);

            this.prueba[0] = parseFloat(this.divi[0]);
            this.prueba[1] = parseFloat(this.divi[1]);

            console.log('SEPARADO DE LAS COMAS: ', this.prueba);
            console.log(this.dataSitio);
            const Lat = Number((this.prueba[1]));
            const Lon = Number((this.prueba[0]));
            console.log(Lat, Lon);
            (mapboxgl as any).accessToken = environment.mapboxkey;
            this.mapa = new mapboxgl.Map({
              container: 'mapa', // container id
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [Lon, Lat], // starting position
              zoom: 13 // starting zoom
            });

            this.mapa.addControl(new mapboxgl.NavigationControl());
            this.crearMarker(Lon, Lat);
          }
          else {
            console.log(('ELSE'));
            const Lat = Number((this.prueba[1]));
            const Lon = Number((this.prueba[0]));
            console.log(Lat, Lon);
            (mapboxgl as any).accessToken = environment.mapboxkey;
            this.mapa = new mapboxgl.Map({
              container: 'mapa', // container id
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [Lon, Lat], // starting position
              zoom: 13 // starting zoom
            });

            this.mapa.addControl(new mapboxgl.NavigationControl());
            this.crearMarker(Lon, Lat);
          }
        })
    }

  }

  crearMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    //console.log(marker.getLngLat());
    marker.on('drag', () => {
      this.prueba = [marker.getLngLat().lng, marker.getLngLat().lat];
    })
  }

  //#endregion

  //#region MÉTODOS OBTENER Y GUARDAR UBICACIÓN

  obtenerUbicacion() {

    this.pru1 = this.prueba[0].toString();
    this.pru2 = this.prueba[1].toString();

    this.cordenadas = (this.pru1 + ',' + this.pru2);
    console.log('PRUEBA2: ', this.cordenadas)
    this.txtTexto = 'Ubicación obtenida';
    this.obtenida = true;

  }

  guardarUbicacion() {

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

    this.serv = this.dataSitio.servicios;
    this.horOpen = this.dataSitio.horarioOpen;
    this.horClose = this.dataSitio.horarioClose;
    //this.ubi = this.co;
    this.lice = this.dataSitio.licencia;
    this.fb = this.dataSitio.facebook;
    this.ins = this.dataSitio.instagram;
    this.sWeb = this.dataSitio.sitioWeb;

    this.sitiosServices.actualizarSitio(this.nombreSit, this.sitImg, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.serv, this.horOpen, this.horClose, this.cordenadas, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat,
      this.selectedUsu, this.selectedMun, this.selectedSTA, this.sitioId).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });
  }

  //#endregion

}
