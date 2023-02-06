import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from "./login.component";
import {FormsModule, Validators} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule
  ],
  providers: [],
  declarations: [LoginComponent]
})
export class LoginModule {}
