import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Estado } from 'src/app/models/estado.model';
import { Pais } from 'src/app/models/paises.model';
import { environment } from 'src/environments/environment';

import { BorrarEstado, CargarEstado, CargaEstadoById } from '../interface/cargar-estados.interface';

//#region URL
//Para GET se usará la url de pais.
//Para las demás cabeceras la url de estado?
const pais_url = environment.pais_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class EstadosService {

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

    //#region CRUD ESTADO

    cargarTotalEstados() {
        const url = `${pais_url}/estados/listar/todos`;
        return this.http.get<CargarEstado>(url, this.headers)
            .pipe(
                map(resp => {
                    const estados = resp.estados.map(
                        estad => new Estado(estad.nombreEstado, estad.status, estad._id, estad.pais)
                    );
                    return {
                        total: resp.total,
                        estados
                    };
                })
            )
    }

    cargarEstado(desde: number = 0) {
        const url = `${pais_url}/estados?desde=${desde}`;
        return this.http.get<CargarEstado>(url, this.headers)
            .pipe(
                map(resp => {
                    const estados = resp.estados.map(
                        estad => new Estado(estad.nombreEstado, estad.status, estad._id, estad.pais)
                    );
                    return {
                        total: resp.total,
                        estados
                    };
                })
            )
    }

    cargarEstadoById(_id: any) {
        const url = `${pais_url}/estados/${_id}`;
        return this.http.get<CargaEstadoById>(url, this.headers)
            .pipe(
                map(resp => {
                    return {
                        resp
                    };
                })
            )
    }

    borrarEstado(_id: any) {
        return this.http.delete(pais_url + '/estados/' + _id, this.headers);
    }

    actualizarEstado(_id: any, nombreEstado: string, status: boolean, pais?: Pais) {
        const url = `${pais_url}/estados/${_id}`;
        const data = {
            _id,
            nombreEstado,
            status,
            pais
        }
        return this.http.put(url, data, this.headers);
    }

    crearEstado(nombreEstado: string, status: boolean, pais?: Pais) {
        const url = `${pais_url}/estados`;
        console.log(pais);
        const data = {
            nombreEstado,
            status,
            pais
        }
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}
