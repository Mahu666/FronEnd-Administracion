import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Talent } from 'src/app/models/talent.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Municipio } from 'src/app/models/municipio.model';

import { BorrarTalento, CargarTalento, CargaTalentoById } from '../interfaces/cargar-talentos.interface';
import { environment } from 'src/environments/environment';

//#region URL
//NO ESTA BIEN LA URL
const tal_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class TalentosService {

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

    //#region CRUD TALENTO

    cargarTalento(desde: number = 0) {
        const url = `${tal_url}/talent?desde=${desde}`;
        return this.http.get<CargarTalento>(url, this.headers)
            .pipe(
                map(resp => {
                    const talentos = resp.talents.map(
                        talents => new Talent(talents.nombreTalent, talents.imgPrincipal, talents.descripcion, talents.video, talents.nombreContacto1,
                            talents.telContacto1, talents.correoContacto1, talents.nombreContacto2, talents.telContacto2, talents.correoContacto2,
                            talents.ubicacion, talents.licencia, talents.facebook, talents.instagram, talents.sitioWeb, talents.categoria, talents.usuario, talents.municipio, talents.status, talents._id));
                    return {
                        total: resp.total,
                        talentos
                    };
                })
            )
    }

    cargarTalentoById(_id: any) {
        const url = `${tal_url}/talent/${_id}`;
        return this.http.get<CargaTalentoById>(url, this.headers)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return {
                        resp
                    };
                })
            )
    }

    borrarTalento(_id: any) {
        return this.http.delete(tal_url + '/talent/' + _id, this.headers);
    }

    actualizarTalento(nombreTalent: string, imgPrincipal: string[], descripcion: string, video: string, nombreContacto1: string, telContacto1: string,
        correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, ubicacion: string, licencia: Date, facebook: string,
        instagram: string, sitioWeb: string, categoria: Categoria, usuario: Usuario, municipio: Municipio, status: boolean, _id?: string,) {
        console.log(_id)
        const url = `${tal_url}/talent/${_id}`;
        const data = {
            nombreTalent,
            imgPrincipal,
            descripcion,
            video,

            nombreContacto1,
            telContacto1,
            correoContacto1,

            nombreContacto2,
            telContacto2,
            correoContacto2,

            ubicacion,
            licencia,
            facebook,
            instagram,
            sitioWeb,

            categoria,
            usuario,
            municipio,

            status,
            _id
        }
        return this.http.put(url, data, this.headers);
    }

    crearTalento(nombreTalent: string, imgPrincipal: string[], descripcion: string, video: string, nombreContacto1: string, telContacto1: string,
        correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, ubicacion: string, licencia: Date, facebook: string,
        instagram: string, sitioWeb: string, categoria: Categoria, usuario: Usuario, municipio: Municipio, status: boolean,) {
        const url = `${tal_url}/talent`;
        const data = {
            nombreTalent,
            imgPrincipal,
            descripcion,
            video,

            nombreContacto1,
            telContacto1,
            correoContacto1,

            nombreContacto2,
            telContacto2,
            correoContacto2,

            ubicacion,
            licencia,
            facebook,
            instagram,
            sitioWeb,

            categoria,
            usuario,
            municipio,

            status,
        }
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}
