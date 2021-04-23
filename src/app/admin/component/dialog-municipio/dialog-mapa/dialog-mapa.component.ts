import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { MunicipiosService } from 'src/app/admin/services/municipios.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class DialogMapaComponent implements AfterViewInit {

  public obtenida: boolean = false;
  public txtTexto: string = '';

  mapa!: mapboxgl.Map;
  cordenadas: string = '20.053774997902067,-99.34392488414645';
  public prueba: [number, number] = [-99.34392488414645, 20.053774997902067];

  public muniId: any;
  public nombreMun: any;
  public his: any;
  public videoHis: any;
  public trad: any;
  public videoTrad: any;
  public cult: any;
  public videoCult: any;
  public cli: any;
  public ubic: any;

  public ub: any;
  public dataSitio: any;
  public pru1: any;
  public pru2: any;
  public divi: any;

  selectedSTA: any;
  selectedEst: any;

  public munI: any;
  public munIC: any;
  public munIT: any;
  public munIH: any;


  constructor(public dialogRef: MatDialogRef<DialogMapaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private municipiosServices: MunicipiosService) {

  }


  ngAfterViewInit() {

    if (this.ub !== null) {
      //AQUI DEBE IR UN IF VALIDANDO QUE LA UBICACION NO SEA NULL
      this.municipiosServices.cargarMunicipioById(this.data._id)
        .subscribe(resp => {
          this.dataSitio = resp.resp.municipio;
          this.selectedSTA = this.dataSitio.status;
          this.selectedEst = this.dataSitio.estado;
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
    this.muniId = this.data._id;

    this.nombreMun = this.dataSitio.nombreMunicipio;
    this.munI = this.dataSitio.imgPrincipal;
    this.his = this.dataSitio.historia;
    this.munIH = this.dataSitio.imgHistoria;
    this.videoHis = this.dataSitio.videoHistoria;
    this.trad = this.dataSitio.tradiciones;
    this.munIT = this.dataSitio.imgTradiciones;
    this.videoTrad = this.dataSitio.videoTradiciones
    this.cult = this.dataSitio.cultura;
    this.munIC = this.dataSitio.imgCultura;
    this.videoCult = this.dataSitio.videoCultura;
    this.cli = this.dataSitio.clima;


    this.municipiosServices.actualizarMunicipio(this.nombreMun, this.munI, this.his, this.munIH, this.videoHis, this.trad,
      this.munIT, this.videoTrad, this.cult, this.munIC, this.videoCult, this.cli, this.cordenadas, this.selectedSTA, this.muniId, this.selectedEst).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });
  }

}
