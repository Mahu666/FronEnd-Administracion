import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private usuarioService: AuthService,
    private router: Router ) {}

    //auth guard
    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.usuarioService.role === 'ADMIN_ROLE' ) {
    return true;
    } else {
    this.router.navigateByUrl('/apapachador');
    return false;
    } 
  }
  
}
