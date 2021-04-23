import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Municipio } from 'src/app/models/municipio.model';
import { Estado } from 'src/app/models/estado.model';
import { environment } from 'src/environments/environment';

import { BorrarMunicipio, CargarMunicipio, CargaMunicipioById } from '../interface/cargar-municipios.interface';

//#region URL
//NO ESTA BIEN LA URL
const mun_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class MunicipiosService {

    constructor(private http: HttpClient,
        private router: Router,
        private ngZone: NgZone) { }
    
      get token(): string {
        return localStorage.getItem('token') || '';
      }
    
      get headers() {
        return {
          headers: {
            'x-token': this.token
          }
        }
      }

    //#region CRUD MUNICIPIO

    cargarMunicipioByEstado(_id: any) {
        ///municipio?desde=0
        const url = `${mun_url}/municipio/byestado/${_id}`;
        return this.http.get<CargarMunicipio>(url, this.headers)
            .pipe(
                map(resp => {
                    const municipios = resp.municipios.map(
                        munici => new Municipio(munici.nombreMunicipio, munici.imgPrincipal, munici.historia, munici.imgHistoria, munici.videoHistoria,
                            munici.tradiciones, munici.imgTradiciones, munici.videoTradiciones, munici.cultura, munici.imgCultura, munici.videoCultura,
                            munici.clima, munici.ubicacion, munici.status, munici._id, munici.estado)
                    );
                    return {
                        total: resp.total,
                        municipios
                    };
                })
            )
    }

    cargarMunicipio(desde: number = 0) {
        ///municipio?desde=0
        const url = `${mun_url}/municipio?desde=${desde}`;
        return this.http.get<CargarMunicipio>(url, this.headers)
            .pipe(
                map(resp => {
                    const municipios = resp.municipios.map(
                        munici => new Municipio(munici.nombreMunicipio, munici.imgPrincipal, munici.historia, munici.imgHistoria, munici.videoHistoria,
                            munici.tradiciones, munici.imgTradiciones, munici.videoTradiciones, munici.cultura, munici.imgCultura, munici.videoCultura,
                            munici.clima, munici.ubicacion, munici.status, munici._id, munici.estado)
                    );
                    return {
                        total: resp.total,
                        municipios
                    };
                })
            )
    }

    cargarMunicipioById(_id: any) {
        const url = `${mun_url}/municipio/${_id}`;
        return this.http.get<CargaMunicipioById>(url, this.headers)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return {                        
                        resp
                    };
                })
            )
    }

    borrarMunicipio(_id: any) {
        return this.http.delete(mun_url + '/municipio/' + _id, this.headers);
    }

    actualizarMunicipio(nombreMunicipio: string, imgPrincipal: string, historia: string, imgHistoria: string, videoHistoria: string,
        tradiciones: string, imgTradiciones: string, videoTradiciones: string, cultura: string, imgCultura: string, 
        videoCultura: string, clima: string, ubicacion: string, status: boolean, _id: any, estado?: Estado) {
            console.log(_id)
        const url = `${mun_url}/municipio/${_id}`;
        const data = {
            nombreMunicipio,
            imgPrincipal,
            historia,
            imgHistoria,
            videoHistoria,
            tradiciones,
            imgTradiciones,
            videoTradiciones,
            cultura,
            imgCultura,
            videoCultura,
            clima,
            ubicacion,
            
            status,
            _id,
            estado
        }
        return this.http.put(url, data, this.headers);
    }

    crearMunicipio(nombreMunicipio: string, imgPrincipal: string, historia: string, imgHistoria: string, videoHistoria: string,
        tradiciones: string, imgTradiciones: string, videoTradiciones: string, cultura: string, imgCultura: string, 
        videoCultura: string, clima: string, ubicacion: string, status: boolean, estado?: Estado) {
            console.log(estado);
        const url = `${mun_url}/municipio`;
        const data = {
            nombreMunicipio,
            imgPrincipal,
            historia,
            imgHistoria,
            videoHistoria,
            tradiciones,
            imgTradiciones,
            videoTradiciones,
            cultura,
            imgCultura,
            videoCultura,
            clima,
            ubicacion,
            
            status,
            estado
        }
        console.log(estado)
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}

