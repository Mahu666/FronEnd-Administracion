import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  public formSubmitted = false;

  //admin@admin.com
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || 'admin@admin.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
  });

  constructor(private router: Router,
    private fb: FormBuilder, private usarioService: AuthService) { }

  login() {
    this.usarioService.login(this.loginForm.value)
      .subscribe(resp => {
        // Navegar al Dashboard
        //console.log(resp.usuarioDB._ID);
        const role = resp.role;
        //OTRO IF == TALENT_ROLE
        if (role === 'ADMIN_ROLE') {
          this.router.navigateByUrl('/admin');
        } else if (role === 'APAPACHADOR_ROLE') {
          this.router.navigateByUrl('/apapachador');
        } else if (role === 'TALENT_ROLE'){
          this.router.navigateByUrl('/talent');
        }
        else {
          console.log('sin permisos');
        }

      }, (err) => {
        // Si sucede un error
        console.log(err);
      });

  }

}
