import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetpassComponent } from './pages/resetpass/resetpass.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetpassComponent],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,  
    MaterialModule,
    AuthRoutingModule,FlexLayoutModule
  ]
})
export class AuthModule { }
