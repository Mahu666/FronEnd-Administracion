import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Servicio } from 'src/app/models/servicio.model';
import { environment } from 'src/environments/environment';

import { BorrarServicio, CargarServicio, CargaServicioById } from '../interfaces/cargar-servicios.interface';

//#region URL

const ser_url = environment.ser_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class ServiciosService {

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

    //#region CRUD SERVICIOS

    cargarServiciosTodos() {
        const url = `${ser_url}/servicios/listar/todos`;
        return this.http.get<CargarServicio>(url, this.headers)
            .pipe(
                map(resp => {
                    const servicios = resp.servicios.map(
                        services => new Servicio(services.nombreServicio, services.iconoIonic, services.iconoMaterial,
                            services.descripcion, services.status, services._id)
                    );
                    return {
                        total: resp.total,                        
                        servicios
                    };
                })
            )
    }

    cargarServicios(desde: number = 0) {
        const url = `${ser_url}/servicios?desde=${desde}`;
        return this.http.get<CargarServicio>(url, this.headers)
            .pipe(
                map(resp => {
                    const servicios = resp.servicios.map(
                        services => new Servicio(services.nombreServicio, services.iconoIonic, services.iconoMaterial,
                            services.descripcion, services.status, services._id)
                    );
                    return {
                        total: resp.total,
                        servicios
                    };
                })
            )
    }

    cargarServiciosById(_id: any) {
        const url = `${ser_url}/servicios/${_id}`;
        return this.http.get<CargaServicioById>(url, this.headers)
            .pipe(
                map(resp => {
                    return {
                        resp
                    };
                })
            )
    }

    borrarServicio(_id: any) {
        return this.http.delete(ser_url + '/servicios/' + _id, this.headers);
    }

    actualizarServicio(_id: any, nombreServicio: string, descripcion: string, iconoIonic: string, iconoMaterial: string, status: boolean) {
        const url = `${ser_url}/servicios/${_id}`;
        const data = {
            _id,
            nombreServicio,
            iconoIonic,
            iconoMaterial,
            descripcion,
            status
        }
        return this.http.put(url, data, this.headers);
    }

    crearServicio(nombreServicio: string, descripcion: string, iconoIonic: string, iconoMaterial: string, status: boolean) {
        const url = `${ser_url}/servicios`;
        const data = {
            nombreServicio,
            descripcion,
            iconoIonic,
            iconoMaterial,
            status
        }
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}
