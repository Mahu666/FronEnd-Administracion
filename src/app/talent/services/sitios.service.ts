import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Sitio } from 'src/app/models/sitio.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Municipio } from 'src/app/models/municipio.model';

import { BorrarSitio, CargarSitioByUsuario, CargaSitioById } from '../interface/cargar-sitios.interface';
import { environment } from 'src/environments/environment';
import { CargarSitio } from 'src/app/admin/interfaces/cargar-sitios.interface';

//#region URL
//NO ESTA BIEN LA URL
const sit_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})


export class SitiosService {

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

    //#region CRUD SITIO


    cargarSitio(desde: number = 0) {
        const url = `${sit_url}/sitio?desde=${desde}`;
        return this.http.get<CargarSitio>(url, this.headers)
            .pipe(
                map(resp => {
                    const sitios = resp.sitios.map(
                        sites => new Sitio(sites.nombreSitio, sites.imgPrincipal, sites.video, sites.descripcion, sites.banner, sites.nombreContacto1, sites.telContacto1,
                            sites.correoContacto1, sites.nombreContacto2, sites.telContacto2, sites.correoContacto2, sites.servicios, sites.horarioOpen,
                            sites.horarioClose, sites.ubicacion, sites.licencia, sites.facebook, sites.instagram, sites.sitioWeb, sites.categoria, sites.usuario, sites.municipio, sites.status, sites._id));
                    return {
                        total: resp.total,
                        sitios
                    };
                })
            )
    }

    cargarSitioByUsuario(_id: any) {
        const url = `${sit_url}/sitio/sitios/${_id}`;
        return this.http.get<CargarSitioByUsuario>(url, this.headers)
            .pipe(
                map(resp => {
                    const sitios = resp.resultados.map(
                        sites => new Sitio(sites.nombreSitio, sites.imgPrincipal, sites.video, sites.descripcion, sites.banner, sites.nombreContacto1, sites.telContacto1,
                            sites.correoContacto1, sites.nombreContacto2, sites.telContacto2, sites.correoContacto2, sites.servicios, sites.horarioOpen,
                            sites.horarioClose, sites.ubicacion, sites.licencia, sites.facebook, sites.instagram, sites.sitioWeb, sites.categoria, sites.usuario, sites.municipio, sites.status, sites._id));
                    return {
                        total: resp.total,
                        sitios
                    };
                })
            )
    }

    cargarSitioById(_id: any) {
        const url = `${sit_url}/sitio/${_id}`;
        return this.http.get<CargaSitioById>(url, this.headers)
            .pipe(
                map(resp => {
                    //console.log(resp.sitio);
                    return {
                        resp
                    };
                })
            )
    }

    borrarSitio(_id: any) {
        return this.http.delete(sit_url + '/sitio/' + _id, this.headers);
    }

    //EN USUARIO SIEMPRE SERÁ EL APAPACHADOR QUE LO ESTA EDITANDO O CRAENDO
    actualizarSitio(nombreSitio: string, imgPrincipal: string[], video: string, descripcion: string, banner: string, nombreContacto1: string,
        telContacto1: string, correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, servicios: string[],
        horarioOpen: string[], horarioClose: string[], ubicacion: string, licencia: Date, facebook: string, instagram: string, sitioWeb: string, categoria: Categoria,
        usuario: Usuario, municipio: Municipio,
        status: boolean, _id?: string) {
        console.log(_id)
        const url = `${sit_url}/sitio/${_id}`;
        const data = {
            nombreSitio,
            imgPrincipal,
            video,
            descripcion,
            banner,

            nombreContacto1,
            telContacto1,
            correoContacto1,

            nombreContacto2,
            telContacto2,
            correoContacto2,

            servicios,
            horarioOpen,
            horarioClose,
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

    crearSitio(nombreSitio: string, imgPrincipal: string[], video: string, descripcion: string, banner: string, nombreContacto1: string,
        telContacto1: string, correoContacto1: string, nombreContacto2: string, telContacto2: string, correoContacto2: string, servicios: string,
        horarioOpen: string, horarioClose: string, ubicacion: string, licencia: Date, facebook?: string, instagram?: string, sitioWeb?: string, categoria?: Categoria, usuario?: Usuario, municipio?: Municipio,
        status?: boolean) {
        const url = `${sit_url}/sitio`;
        const data = {
            nombreSitio,
            imgPrincipal,
            video,
            descripcion,
            banner,

            nombreContacto1,
            telContacto1,
            correoContacto1,

            nombreContacto2,
            telContacto2,
            correoContacto2,

            servicios,
            horarioOpen,
            horarioClose,
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

}

