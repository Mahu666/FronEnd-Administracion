import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Taller } from 'src/app/models/taller.model';
import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';

import { BorrarTaller, CargarTaller, CargaTallerById } from '../interface/cargar-talleres.interface';
import { environment } from 'src/environments/environment';

//#region URL
//NO ESTA BIEN LA URL
const taller_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})


export class TalleresService {

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

    //#region CRUD TALLER

    cargarTallerBySitio(_id: any) {
        const url = `${taller_url}/taller/sitio/${_id}`;
        return this.http.get<CargarTaller>(url, this.headers)
            .pipe(
                map(resp => {
                    const talleres = resp.resultados.map(
                        tallers => new Taller(tallers.nombreTaller, tallers.imgPrincipal, tallers.descripcion, tallers.precio,
                            tallers.ubicacion, tallers.status, tallers.sitio, tallers.talent, tallers._id));
                    return {
                        total: resp.total,
                        talleres
                    };
                })
            )
    }

    cargarTallerById(_id: any) {
        const url = `${taller_url}/taller/${_id}`;
        return this.http.get<CargaTallerById>(url, this.headers)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return {
                        resp
                    };
                })
            )
    }

    borrarTaller(_id: any) {
        return this.http.delete(taller_url + '/taller/' + _id, this.headers);
    }

    actualizarTaller(nombreTaller: string, imgPrincipal: string[], descripcion: string, precio: string, ubicacion: string,
        status?: boolean, sitio?: Sitio, talent?: Talent, _id?: string,) {
        
        const url = `${taller_url}/taller/${_id}`;
        const data = {
            nombreTaller,
            imgPrincipal,
            descripcion,
            precio,
            ubicacion,
            status,

            sitio,
            talent,

            _id
        }
        console.log(data)
        return this.http.put(url, data, this.headers);
    }

    crearTaller(nombreTaller: string, imgPrincipal: string[], descripcion: string, precio: string, ubicacion: string,
        status?: boolean, sitio?: Sitio, talent?: Talent) {
        const url = `${taller_url}/taller`;
        const data = {
            nombreTaller,
            imgPrincipal,
            descripcion,
            precio,
            ubicacion,
            
            sitio,
            talent,
            status,
        }
        console.log(data);
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}