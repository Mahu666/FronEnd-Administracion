import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria.model';
import { environment } from 'src/environments/environment';

import { BorrarCategoria, CargarCategoria, CargaCategoriaById } from '../interfaces/cargar-categorias.interface';

//#region URL

const cat_url = environment.cat_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class CategoriasService {

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

    //#region CRUD CATEGORIAS

    cargarCategorias(desde: number = 0) {
        const url = `${cat_url}/categoria?desde=${desde}`;
        return this.http.get<CargarCategoria>(url, this.headers)
            .pipe(
                map(resp => {
                    const categorias = resp.categoria.map(
                        category => new Categoria(category.nombreCategoria, category.descripcion, category.status, category.tipo, category._id)
                    );
                    return {
                        total: resp.total,
                        categorias
                    };
                })
            )
    }

    cargarCategoriaById(_id: any) {
        const url = `${cat_url}/categoria/${_id}`;
        return this.http.get<CargaCategoriaById>(url, this.headers)
            .pipe(
                map(resp => {
                    return {
                        resp
                    };
                })
            )
    }

    borrarCategoria(_id: any) {
        return this.http.delete(cat_url + '/categoria/' + _id, this.headers);
    }

    actualizarCategoria(_id: any, nombreCategoria: string, descripcion: string, status: boolean, tipo: string) {
        console.log(tipo);
        const url = `${cat_url}/categoria/${_id}`;
        const data = {
            _id,
            nombreCategoria,
            descripcion,
            status,
            tipo
        }
        return this.http.put(url, data, this.headers);
    }

    crearCategoria(nombreCategoria: string, descripcion: string, status: boolean, tipo: string) {
        const url = `${cat_url}/categoria`;
        const data = {
            nombreCategoria,
            descripcion,
            status,
            tipo
        }
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}



