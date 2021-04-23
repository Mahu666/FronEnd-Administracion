import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
//import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario!: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) { }

  guardarLocalStorage(token: string) {

    localStorage.setItem('token', token);

  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | 'APAPACHADOR_ROLE' | 'TALENT_ROLE' {
    return this.usuario.role!;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

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


  login(formData: LoginForm) {
    //vdfivdfisdfio
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          if (resp.role === 'ADMIN_ROLE' || resp.role === 'APAPACHADOR_ROLE' || resp.role === 'TALENT_ROLE') {
            this.guardarLocalStorage(resp.token);
          }

        })
      );
  }

  logout() {
    localStorage.removeItem('token');



    this.router.navigateByUrl('/login');



  }

  validarToken(): Observable<boolean> {
    //console.log('validarToken');
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        //console.log(resp.usuario);
        const { role, google, apellidoPaterno, apellidoMaterno, status, nombre, email, uid, img = '', } = resp.usuario;
      //  console.log(role);
        this.usuario = new Usuario(nombre, apellidoPaterno, apellidoMaterno, email, status, '', img, google, role, uid);
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        //console.log(this.usuario);
        this.usuario.role = role;
        if (this.usuario.role !== 'ADMIN_ROLE' && this.usuario.role !== 'APAPACHADOR_ROLE' && this.usuario.role !== 'TALENT_ROLE') {
          localStorage.removeItem('token');
          return false;
        }

        return true;
      }),
      catchError(error => of(false))
    );

  }

  guardarUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }


  validarExistencia() {
    if (this.token) {
      return true
    } else {
      return false;
    }
  }

  /*
      get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
        return this.usuario.role;
      }
      */
  /*
      get uid():string {
        return this.usuario.uid || '';
      }
  
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
  
      logout() {
        localStorage.removeItem('token');
        
        this.router.navigateByUrl('/login');
    
       
    
      }
  
    login( formData: LoginForm ) {
      //vdfivdfisdfio
      return this.http.post(`${ base_url }/login`, formData )
        .pipe(
          tap( (resp: any) => {          
            if(resp.usuarioDB.role === 'ADMIN_ROLE'){
              this.guardarLocalStorage( resp.token );
            }
            
          })
        );
  
    }
  
    validarToken(): Observable<boolean> {
      //validar token
      return this.http.get(`${ base_url }/login/renew`, {
        headers: {
          'x-token': this.token
        }
      }).pipe(
        map( (resp: any) => {
          const { email, google, nombre, role, img, status = '', uid } = resp.usuario;
          this.usuario = new Usuario( nombre, email, status ,'', img, google, role, uid );        
  
          if(this.usuario.role !== 'ADMIN_ROLE'){
            localStorage.removeItem('token');
            return false;
          }
          return true;
        }),
        catchError( error => of(false) )
      );
  
    }
  
    guardarUsuario( usuario: Usuario ) {
  
      return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
  
    }
  
    validarExistencia(){
        if (this.token) {
          return true
        } else {
          return false;
        }
    }
    */
}
