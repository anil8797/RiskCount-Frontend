import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import {ResetPasswordComponent} from "./reset-password.component";
import {FormsModule} from "@angular/forms";
import {EqualValidator} from "../../directives/equal-validator.directive";

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule
  ],
  declarations: [ResetPasswordComponent,EqualValidator]
})
export class ResetPasswordModule { }
