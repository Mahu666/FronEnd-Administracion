
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor( private usuarioService: AuthService,
               private router: Router) {}

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado =>  {
            if ( !estaAutenticado ) {
              this.router.navigateByUrl('/auth/login');
            }
          })
        );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const token = this.usuarioService.validarExistencia();   

      if (token) {
        return this.usuarioService.validarToken()
          .pipe(
            tap(estaAutenticado => {            
              if (!estaAutenticado) {
                this.router.navigateByUrl('/login');
              }
            })
          );      
      } else {
        this.router.navigateByUrl('/auth/login');
        return false
      }
   
  }
  
}
