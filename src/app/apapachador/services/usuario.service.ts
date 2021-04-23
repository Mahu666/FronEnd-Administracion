import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interface/register-form.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService) { 
      this.usuario = authService.usuario;
    }

    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    get token(): string {
      return localStorage.getItem('token') || '';
    }
/*
    crearUsuario( formData: RegisterForm ) {
    
      return this.http.post(`${ base_url }/usuarios`, formData )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  })
                )
  
    }
    */
  
    actualizarPerfil( data: { nombre: string, email: string, img?: string } ) {
  
      data = {
        ...data,        
      }
      console.log(data);
      return this.http.put(`${ base_url }/usuarios/${ this.usuario.uid }`, data, this.headers );
  
    }
/*
    cargarUsuarios( desde: number = 0 ) {

      const url = `${ base_url }/usuarios?desde=${ desde }`;
      return this.http.get<CargarUsuario>( url, this.headers )
              .pipe(
                map( resp => {
                  const usuarios = resp.usuarios.map( 
                    user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )  
                  );
                  return {
                    total: resp.total,
                    usuarios
                  };
                })
              )
    }
  /*
  
    eliminarUsuario( usuario: Usuario ) {
      
        // /usuarios/5eff3c5054f5efec174e9c84
        const url = `${ base_url }/usuarios/${ usuario.uid }`;
        return this.http.delete( url, this.headers );
    }
  
    guardarUsuario( usuario: Usuario ) {
  
      return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
  
    }

    */

}
