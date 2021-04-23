import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { TalleresService } from 'src/app/admin/services/talleres.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-mapa',
  templateUrl: './dialog-mapa.component.html',
  styleUrls: ['./dialog-mapa.component.css']
})
export class TallerDialogMapaComponent implements AfterViewInit {

  public obtenida: boolean = false;
  public txtTexto: string = '';

  mapa!: mapboxgl.Map;
  cordenadas: string = '20.053774997902067,-99.34392488414645';
  public prueba: [number, number] = [-99.34392488414645, 20.053774997902067];

  public ub: any;
  public dataSitio: any;
  public pru1: any;
  public pru2: any;
  public divi: any;

  selectedSTA: any;
  selectedSit: any;
  selectedTal: any;

  public tallerId: any;
  public nombreTall: any;
  public talI: any;
  public desc: any;
  public prec: any;
  //public ubic: any;
  //public sit: any;
  public imgPrincipal: any;

  constructor(public dialogRef: MatDialogRef<TallerDialogMapaComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,
    private talleresServices: TalleresService) { }


  ngAfterViewInit() {

    if (this.ub !== null) {
      //AQUI DEBE IR UN IF VALIDANDO QUE LA UBICACION NO SEA NULL
      this.talleresServices.cargarTallerById(this.data._id)
        .subscribe(resp => {
          this.dataSitio = resp.resp.taller;
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
    this.tallerId = this.data._id;

    this.nombreTall = this.dataSitio.nombreTaller;
    this.imgPrincipal = this.dataSitio.imgPrincipal;
    //imgPrincipal  sitImg
    this.desc = this.dataSitio.descripcion;
    this.prec = this.dataSitio.precio;
    //this.ubic = this.data.Ubicacion;
    //this.sit = this.data.Sitio;

    if (this.selectedSit !== null && this.selectedTal === undefined) {
      //this.selectedSit = this.data.Sitio;
      this.talleresServices.actualizarTaller(this.nombreTall, this.imgPrincipal, this.desc, this.prec, this.cordenadas,
        this.selectedSTA, this.selectedSit, undefined, this.tallerId).subscribe(resp => {
          this.dialogRef.close("Se ha actualizado correctamente");
          window.location.reload();
        });
    } else {
      this.talleresServices.actualizarTaller(this.nombreTall, this.imgPrincipal, this.desc, this.prec, this.cordenadas,
        this.selectedSTA, undefined, this.selectedTal, this.tallerId).subscribe(resp => {
          this.dialogRef.close("Se ha actualizado correctamente");
          window.location.reload();
        });
    }

  }


}
