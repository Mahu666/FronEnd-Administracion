import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { EventosService } from 'src/app/apapachador/services/eventos.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class AEventoDialogMapaComponent implements AfterViewInit {

  public obtenida: boolean = false;
  public txtTexto: string = '';

  mapa!: mapboxgl.Map;
  cordenadas: string = '20.053774997902067,-99.34392488414645';
  public prueba: [number, number] = [-99.34392488414645, 20.053774997902067];

  public pru1: any;
  public pru2: any;

  public ub: any;
  public dataSitio: any;
  public divi: any;

  public eventoId: any;
  public nombreEve: any;
  public eveI: any;
  public desc: any;
  public hor: any;
  public ubi: any;
  public imgPrincipal: any;

  selectedSit: any;
  selectedTal: any;
  selectedSTA: any;

  constructor(public dialogRef: MatDialogRef<AEventoDialogMapaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private eventosServices: EventosService) {

  }

  ngAfterViewInit() {

    if (this.ub !== null) {
      //AQUI DEBE IR UN IF VALIDANDO QUE LA UBICACION NO SEA NULL
      this.eventosServices.cargarEventoById(this.data._id)
        .subscribe(resp => {
          console.log(resp);
          this.dataSitio = resp.resp.evento;
          this.selectedSTA = this.dataSitio.status;
          this.selectedSit = this.dataSitio.sitio;
          this.selectedTal = this.dataSitio.talent;
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
    this.eventoId = this.data._id;

    this.nombreEve = this.dataSitio.nombreEvento;
    this.imgPrincipal = this.dataSitio.imgPrincipal;
    //imgPrincipal  sitImg
    this.desc = this.dataSitio.descripcion;
    this.hor = this.dataSitio.horario;
    //this.ubi = this.data.Ubicacion;


    if (this.selectedSit !== null && this.selectedTal === undefined) {
      //this.selectedSit = this.data.Sitio;
      this.eventosServices.actualizarEvento(this.nombreEve, this.imgPrincipal, this.desc, this.hor, this.cordenadas,
        this.selectedSTA, this.selectedSit, undefined, this.eventoId).subscribe(resp => {
          this.dialogRef.close("Se ha actualizado correctamente");
          window.location.reload();
        });
    } else {
      this.eventosServices.actualizarEvento(this.nombreEve, this.imgPrincipal, this.desc, this.hor, this.cordenadas,
        this.selectedSTA, undefined, this.selectedTal, this.eventoId).subscribe(resp => {
          this.dialogRef.close("Se ha actualizado correctamente");
          window.location.reload();
        });
    }

  }


}
