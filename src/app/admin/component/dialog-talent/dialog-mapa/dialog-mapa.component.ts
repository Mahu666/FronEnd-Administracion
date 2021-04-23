import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { TalentosService } from 'src/app/admin/services/talentos.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class TalentDialogMapaComponent implements AfterViewInit {

  mapa!: mapboxgl.Map;
  cordenadas: string = '20.053774997902067,-99.34392488414645';
  public prueba: [number, number] = [-99.34392488414645, 20.053774997902067];

  public pru1: any;
  public pru2: any;

  public obtenida: boolean = false;
  public divi: any;
  public txtTexto: string = '';
  public dataSitio: any;

  public ub: any;

  public talentoId: any;
  public nombreTal: any;
  public talI: any;
  public desc: any;
  public vid: any;

  public nombreCont1: any;
  public telCont1: any;
  public correoCont1: any;

  public nombreCont2: any;
  public telCont2: any;
  public correoCont2: any;

  public ubi: any;
  public lice: any;
  public facebook: any;
  public instagram: any;
  public sitioWeb: any;
  public talImg: any;

  public fb: any;
  public ins: any;
  public sWeb: any;

  selectedSTA: any;
  selectedCat: any;
  selectedUsu: any;
  selectedMun: any;


  constructor(public dialogRef: MatDialogRef<TalentDialogMapaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private talentosServices: TalentosService) {

     }

  ngAfterViewInit() {

    if (this.ub !== null) {
      //AQUI DEBE IR UN IF VALIDANDO QUE LA UBICACION NO SEA NULL
      this.talentosServices.cargarTalentoById(this.data._id)
        .subscribe(resp => {
          this.dataSitio = resp.resp.talent;
          this.selectedSTA = this.dataSitio.status;
          this.selectedCat = this.dataSitio.categoria;
          this.selectedMun = this.dataSitio.municipio;
          this.selectedUsu = this.dataSitio.usuario;

          this.ub = this.dataSitio.ubicacion;

          if (this.ub !== undefined) {
            this.cordenadas = this.dataSitio.ubicacion;
            this.divi = this.cordenadas.split(",", 2);

            this.prueba[0] = parseFloat(this.divi[0]);
            this.prueba[1] = parseFloat(this.divi[1]);

            console.log('SEPARADO DE LAS COMAS: ', this.prueba);
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

  obtenerUbicacion() {
    this.pru1 = this.prueba[0].toString();
    this.pru2 = this.prueba[1].toString();

    this.cordenadas = (this.pru1 + ',' + this.pru2);
    this.txtTexto = 'Ubicación obtenida';
    this.obtenida = true;

  }

  guardarUbicacion() {
    this.talentoId = this.data._id;

    this.nombreTal = this.dataSitio.nombreTalent;
    this.talImg = this.dataSitio.imgPrincipal;
    this.desc = this.dataSitio.descripcion;
    this.vid = this.dataSitio.video;

    this.nombreCont1 = this.dataSitio.nombreContacto1;
    this.telCont1 = this.dataSitio.telContacto1;
    this.correoCont1 = this.dataSitio.correoContacto1;

    this.nombreCont2 = this.dataSitio.nombreContacto2;
    this.telCont2 = this.dataSitio.telContacto2;
    this.correoCont2 = this.dataSitio.correoContacto2;

    //this.ubi = this.data.Ubicacion;
    this.lice = this.dataSitio.licencia;
    this.fb = this.dataSitio.facebook;
    this.ins = this.dataSitio.instagram;
    this.sWeb = this.dataSitio.sitioWeb;

    this.talentosServices.actualizarTalento(this.nombreTal, this.talImg, this.desc, this.vid, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.cordenadas, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat, this.selectedUsu,
      this.selectedMun, this.selectedSTA, this.talentoId).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });
  }



}
