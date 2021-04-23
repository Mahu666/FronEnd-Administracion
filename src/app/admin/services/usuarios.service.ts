import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { BorrarUsuario, CargarUsuario, CargaUsuarioId } from '../interfaces/cargar-usuarios.interface';

//#region URL

const base_url = environment.base_url;
const img_url = environment.img_url;

//#endregion

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

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

  //#region CRUD USUARIO

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.apellidoPaterno, user.apellidoMaterno, user.email, user.status, '', user.img, user.google, user.role, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }

  cargarUsuariosTodos() {
    const url = `${base_url}/usuarios/listar/todos`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.apellidoPaterno, user.apellidoMaterno, user.email, user.status, '', user.img, user.google, user.role, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      )
  }

  cargarUsuarioId(uid: any) {
    const url = `${base_url}/usuarios/usuariobyid/${uid}`;
    return this.http.get<CargaUsuarioId>(url, this.headers)
      .pipe(
        map(resp => {
          return {
            resp
          };
        })
      )
  }

  borrarUsuarios(uid: any) {
    return this.http.delete(base_url + '/usuarios/' + uid, this.headers);
  }

  actualizarUsuario(uid: any, nombre: string, apellidoPaterno: any, apellidoMaterno: any, status: boolean,
    role: 'ADMIN_ROLE' | 'USER_ROLE' | 'APAPACHADOR_ROLE' | 'TALENT_ROLE', email: string, img?: string, google?: any) {
    const url = `${base_url}/usuarios/administracion/${uid}`;
    const data = {
      uid,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      status,
      role,
      email,
      img,
      google
    }
    return this.http.put(url, data, this.headers);
  }

  crearUsuario(nombre: string, apellidoPaterno: any, apellidoMaterno: any, email: string, status: boolean, password?: any, img?: string,
    google?: any, role?: 'ADMIN_ROLE' | 'USER_ROLE' | 'APAPACHADOR_ROLE' | 'TALENT_ROLE') {
    const url = `${base_url}/usuarios/administracion`;
    const data = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      status,
      password,
      img,
      google,
      role,
    }
    console.log(data);
    return this.http.post(url, data, this.headers);
  }

  //#endregion

}