import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-apapachador',
  templateUrl: './apapachador.component.html',
  styleUrls: ['./apapachador.component.css']
})
export class ApapachadorComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
