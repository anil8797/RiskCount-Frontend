import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RcsaAdminRiskManagerRoutingModule } from './rcsa-admin-risk-manager-routing.module';
import { DataTableModule,InputMaskModule} from "primeng/primeng";
import { RcsaAdminRiskManagerComponent } from "./rcsa-admin-risk-manager.component";
import { RcsaAdminSetupRiskPolicyControlComponent } from './rcsa-admin-setup-risk-policy-control/rcsa-admin-setup-risk-policy-control.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";
import {Select2Module} from "ng2-select2";
import {BsDropdownModule, ModalModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import { RcsaAdminSetInherentRiskComponent } from './rcsa-admin-set-inherent-risk/rcsa-admin-set-inherent-risk.component';
import {RcsaAdminSetFinancialLossComponent} from "./rcsa-admin-set-financial-loss/rcsa-admin-set-financial-loss.component";
// Import angular4-fusioncharts
import * as FusionCharts from '../../../components/fusioncharts';
import * as Charts from '../../../components/fusioncharts/fusioncharts.charts';
import * as PowerCharts from '../../../components/fusioncharts/fusioncharts.powercharts';
import * as FintTheme from '../../../components/fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { RcsaAdminSetupRegionsComponent } from './rcsa-admin-setup-regions/rcsa-admin-setup-regions.component';
import { RcsaAdminSetupBusinessUnitsComponent } from './rcsa-admin-setup-business-units/rcsa-admin-setup-business-units.component';
import {RcsaAdminSetupRcsaUnitComponent} from "./rcsa-admin-setup-rcsa-unit/rcsa-admin-setup-rcsa-unit.component";
import {SanitizeHtmlPipe} from "../../../pipes/safeHtml.pipe";
import {UiSwitchModule} from "ngx-ui-switch";
import {SharedComponentModule} from "../rcsa-shared.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
//import {NgSelectModule} from "@ng-select/ng-select";
FusionChartsModule.fcRoot(FusionCharts, PowerCharts, Charts, FintTheme);

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    InputMaskModule,
    CKEditorModule,
    RcsaAdminRiskManagerRoutingModule,
    Select2Module,
    BsDropdownModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    FusionChartsModule,
    TypeaheadModule.forRoot(),
    UiSwitchModule,
    CurrencyMaskModule
    //NgSelectModule
  ],
  declarations: [
    RcsaAdminRiskManagerComponent,
    RcsaAdminSetupRiskPolicyControlComponent,
    RcsaAdminSetInherentRiskComponent,
    RcsaAdminSetFinancialLossComponent,
    RcsaAdminSetupRegionsComponent,
    RcsaAdminSetupBusinessUnitsComponent,
    RcsaAdminSetupRcsaUnitComponent
  ]
})
export class RcsaAdminRiskManagerModule { }
