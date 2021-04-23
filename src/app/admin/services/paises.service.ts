import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Pais } from 'src/app/models/paises.model';
import { environment } from 'src/environments/environment';

import { BorrarPais, CargarPais, CargaPaisById } from '../interfaces/cargar-paises.interface';

//#region URL

const pais_url = environment.pais_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class PaisesService {

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

    //#region CRUD PAISES

    cargarTodosPaises() {
        const url = `${pais_url}/paises/listar/todos`;
        return this.http.get<CargarPais>(url, this.headers)
            .pipe(
                map(resp => {
                    const paises = resp.paises.map(
                        countryy => new Pais(countryy.nombrePais, countryy.status, countryy._id)
                    );
                    return {
                        total: resp.total,
                        paises
                    };
                })
            )
    }

    cargarPaises(desde: number = 0) {
        const url = `${pais_url}/paises?desde=${desde}`;
        return this.http.get<CargarPais>(url, this.headers)
            .pipe(
                map(resp => {
                    const paises = resp.paises.map(
                        country => new Pais(country.nombrePais, country.status, country._id)
                    );
                    return {
                        total: resp.total,
                        paises
                    };
                })
            )
    }

    cargarPaisesTotal() {
        const url = `${pais_url}/paises/Total`;
        return this.http.get<CargarPais>(url, this.headers)
            .pipe(
                map(resp => {
                    const paises = resp.paises.map(
                        country => new Pais(country.nombrePais, country.status, country._id)
                    );
                    return {
                        total: resp.total,
                        paises
                    };
                })
            )
    }

    cargarPaisById(_id: any) {
        const url = `${pais_url}/paises/${_id}`;
        return this.http.get<CargaPaisById>(url, this.headers)
            .pipe(
                map(resp => {
                    return {
                        resp
                    };
                })
            )
    }

    borrarPais(_id: any) {
        return this.http.delete(pais_url + '/paises/' + _id, this.headers);
    }

    actualizarPais(_id: any, nombrePais: string, status: boolean) {
        const url = `${pais_url}/paises/${_id}`;
        const data = {
            _id,
            nombrePais,
            status
        }
        return this.http.put(url, data, this.headers);
    }

    crearPais(nombrePais: string, status: boolean) {
        const url = `${pais_url}/paises`;
        const data = {
            nombrePais,
            status
        }
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}
