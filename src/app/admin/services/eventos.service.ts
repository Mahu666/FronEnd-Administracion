import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Evento } from 'src/app/models/evento.model';
import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';

import { BorrarEvento, CargarEvento, CargaEventoById } from '../interfaces/cargar-eventos.interface';
import { environment } from 'src/environments/environment';

//#region URL
//NO ESTA BIEN LA URL
const eve_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class EventosService {

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

    //#region CRUD EVENTO

    cargarEvento(desde: number = 0) {
        const url = `${eve_url}/evento?desde=${desde}`;
        return this.http.get<CargarEvento>(url, this.headers)
            .pipe(
                map(resp => {
                    const eventos = resp.eventos.map(
                        events => new Evento(events.nombreEvento, events.imgPrincipal, events.descripcion, events.horario,
                            events.ubicacion, events.status, events.sitio, events.talent, events._id));
                    return {
                        total: resp.total,
                        eventos
                    };
                })
            )
    }

    cargarEventoById(_id: any) {
        const url = `${eve_url}/evento/${_id}`;
        return this.http.get<CargaEventoById>(url, this.headers)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return {
                        resp
                    };
                })
            )
    }

    borrarEvento(_id: any) {
        return this.http.delete(eve_url + '/evento/' + _id, this.headers);
    }

    actualizarEvento(nombreEvento: string, imgPrincipal: string[], descripcion: string, horario: string, ubicacion: string,
        status?: boolean, sitio?: Sitio, talent?: Talent, _id?: string,) {
        console.log(_id)
        const url = `${eve_url}/evento/${_id}`;
        const data = {
            nombreEvento,
            imgPrincipal,
            descripcion,
            horario,
            ubicacion,
            
            status,
            sitio,
            talent,
            
            _id
        }
        console.log(data);
        return this.http.put(url, data, this.headers);
    }

    crearEvento(nombreEvento: string, imgPrincipal: string[], descripcion: string, horario: string, ubicacion: string,
        status?: boolean, sitio?: Sitio, talent?: Talent,) {
        const url = `${eve_url}/evento`;
        const data = {
            nombreEvento,
            imgPrincipal,
            descripcion,
            horario,
            ubicacion,
            status,

            sitio,
            talent,
        }
        console.log(data);
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}
