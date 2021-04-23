import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Producto } from 'src/app/models/producto.model';
import { Sitio } from 'src/app/models/sitio.model';
import { Talent } from 'src/app/models/talent.model';

import { BorrarProducto, CargarProducto, CargaProductoById } from '../interfaces/cargar-productos.interface';
import { environment } from 'src/environments/environment';

//#region URL
//NO ESTA BIEN LA URL
const pro_url = environment.mun_url;

//#endregion

@Injectable({
    providedIn: 'root'
})

export class ProductosService {

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

    //#region CRUD PRODUCTO

    cargarProducto(desde: number = 0) {
        const url = `${pro_url}/producto?desde=${desde}`;
        return this.http.get<CargarProducto>(url, this.headers)
            .pipe(
                map(resp => {
                    const productos = resp.productos.map(
                        products => new Producto(products.nombreProducto, products.imgPrincipal, products.descripcion, products.precioActual,
                            products.precioAnterior, products.status, products.sitio, products.talent, products._id));
                    return {
                        total: resp.total,
                        productos
                    };
                })
            )
    }

    cargarProductoById(_id: any) {
        const url = `${pro_url}/producto/${_id}`;
        return this.http.get<CargaProductoById>(url, this.headers)
            .pipe(
                map(resp => {
                    console.log(resp);
                    return {
                        resp
                    };
                })
            )
    }

    borrarProducto(_id: any) {
        return this.http.delete(pro_url + '/producto/' + _id, this.headers);
    }

    actualizarProducto(nombreProducto: string, imgPrincipal: string[], descripcion: string, precioActual: string, precioAnterior: string,
        status?: boolean, sitio?: Sitio, talent?: Talent, _id?: string,) {
        console.log(_id)
        const url = `${pro_url}/producto/${_id}`;
        const data = {
            nombreProducto,
            imgPrincipal,
            descripcion,
            precioActual,
            precioAnterior,
            status,

            sitio,
            talent,

            _id
        }
        return this.http.put(url, data, this.headers);
    }

    crearProducto(nombreProducto: string, imgPrincipal: string[], descripcion: string, precioActual: string, precioAnterior: string,
        status?: boolean, sitio?: Sitio, talent?: Talent,) {
        const url = `${pro_url}/producto`;
        const data = {
            nombreProducto,
            imgPrincipal,
            descripcion,
            precioActual,
            precioAnterior,
            status,

            sitio,
            talent,
        }

        console.log(data);
        return this.http.post(url, data, this.headers);
    }

    //#endregion

}