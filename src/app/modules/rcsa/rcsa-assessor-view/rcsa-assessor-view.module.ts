import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RcsaAssessorViewRoutingModule } from './rcsa-assessor-view-routing.module';
import { RcsaAssessorViewComponent } from "./rcsa-assessor-view.component";
import { Select2Module } from "ng2-select2";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {ModalModule} from "ngx-bootstrap";
import {CKEditorModule} from "ng2-ckeditor";
import {MomentModule} from "angular2-moment";
import { ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RcsaAssessorViewRoutingModule,
    Select2Module,
    ModalModule.forRoot(),
    CKEditorModule,
    MomentModule,
    ConfirmDialogModule
  ],
  declarations: [
    RcsaAssessorViewComponent
  ],
  providers:[
    RcsaService,
    ConfirmationService
  ]
})
export class RcsaAssessorViewModule { }
