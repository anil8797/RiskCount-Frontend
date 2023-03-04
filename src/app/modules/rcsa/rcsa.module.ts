import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BsDropdownModule, ModalModule, TabsModule, TypeaheadModule} from "ngx-bootstrap";
import {CalendarModule, DataTableModule, SharedModule, MultiSelectModule, InputMaskModule,DialogModule,ConfirmDialogModule, ConfirmationService} from "primeng/primeng";
import { RcsaRoutingModule } from './rcsa-routing.module';
import { RcsaComponent } from "./rcsa.component";
import { RcsaDashboardComponent } from './rcsa-dashboard/rcsa-dashboard.component';
import { RcsaStartNewComponent } from './rcsa-start-new/rcsa-start-new.component';
import { RcsaService } from '../../services/rcsa/rcsa.service';
import { RcsaSetUpPoliciesComponent } from './rcsa-set-up-policies/rcsa-set-up-policies.component';
import { InjectableModule} from "../../utils/app-reusable.module";
import { RcsaSetUpBusinessUnitComponent} from './rcsa-set-up-business-unit/rcsa-set-up-business-unit.component';
import { CKEditorModule} from "ng2-ckeditor";
import { RcsaAssessorViewComponent } from './rcsa-assessor-view/rcsa-assessor-view.component';
import { Select2Module} from "ng2-select2";
import { RcsaUnitRmViewComponent} from './rcsa-unit-rm-view/rcsa-unit-rm-view.component';
import { RcsaCoordinatorViewComponent } from './rcsa-coordinator-view/rcsa-coordinator-view.component';
import { RcsaRemediationSummaryReportComponent} from "./rcsa-remediation-summary-report/rcsa-remediation-summary-report.component";
import { RcsaAssignedOustandingRemediationsComponent} from "./rcsa-assigned-oustanding-remediations/rcsa-assigned-oustanding-remediations.component";
import { RcsaUnitRmAssignedOutstandingRemediationComponent } from './rcsa-unit-rm-assigned-outstanding-remediation/rcsa-unit-rm-assigned-outstanding-remediation.component';
import { OnlyNumber} from "../../directives/only-number.directive";
import { TruncatePipe} from "../../pipes/truncate.pipe";
import { NgSelectModule} from "@ng-select/ng-select";
import { RcsaDashboardRiskComponent } from './rcsa-dashboard-risk/rcsa-dashboard-risk.component';
import { RcsaDashboardRemediationComponent } from './rcsa-dashboard-remediation/rcsa-dashboard-remediation.component';
import { SafeHtml} from "@angular/platform-browser";
import { SanitizeHtmlPipe} from "../../pipes/safeHtml.pipe";
import { SharedComponentModule} from "./rcsa-shared.module";
import { RcsaTestDocumentsComponent} from "./rcsa-test-documents/rcsa-test-documents.component";
import { DisableLinkDirective} from "../../directives/disable-link.directive";
import { DataTransferService} from "../../services/data-transfer/data-transfer.service";

// Import angular4-fusioncharts
import * as FusionCharts from '../../components/fusioncharts';
import * as Charts from '../../components/fusioncharts/fusioncharts.charts';
import * as PowerCharts from '../../components/fusioncharts/fusioncharts.powercharts';
import * as Gantt from '../../components/fusioncharts/fusioncharts.gantt';
import * as Widgets from '../../components/fusioncharts/fusioncharts.widgets';
import * as FintTheme from '../../components/fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import {MomentModule} from "angular2-moment";
import {RcsaUnitRmSetUpRemediationComponent} from "./rcsa-unit-rm-setup-remediation/rcsa-unit-rm-setup-remediation.component";
import { RcsaCoordinatorDashboardComponent } from './rcsa-coordinator-dashboard/rcsa-coordinator-dashboard.component';
import { RatingCalculatorComponent } from './rating-calculator/rating-calculator.component';
import { UserMannualComponent } from './user-mannual/user-mannual.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ManageRcmComponent } from './manage-rcm/manage-rcm.component';

FusionChartsModule.fcRoot(FusionCharts,PowerCharts,Widgets,Gantt, Charts, FintTheme);


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RcsaRoutingModule,
    InjectableModule,
    DataTableModule,
    MultiSelectModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    FusionChartsModule,
    CalendarModule,
    BsDropdownModule,
    CKEditorModule,
    Select2Module,
    NgSelectModule,
    InputMaskModule,
    MomentModule,
    PdfViewerModule,
    DialogModule,
    ConfirmDialogModule
  ],
  declarations: [
    RcsaComponent,
    RcsaDashboardComponent,
    RcsaStartNewComponent,
    RcsaSetUpPoliciesComponent,
    RcsaSetUpBusinessUnitComponent,
    RcsaUnitRmViewComponent,
    RcsaCoordinatorViewComponent,
    RcsaRemediationSummaryReportComponent,
    RcsaAssignedOustandingRemediationsComponent,
    RcsaUnitRmAssignedOutstandingRemediationComponent,
    RcsaTestDocumentsComponent,
    OnlyNumber,
    DisableLinkDirective,
    TruncatePipe,
    RcsaDashboardRiskComponent,
    RcsaDashboardRemediationComponent,
    RcsaUnitRmSetUpRemediationComponent,
    RcsaCoordinatorDashboardComponent,
    RatingCalculatorComponent,
    UserMannualComponent,
    ManageRcmComponent
  ],
  providers:[
    RcsaService,
    DataTransferService,
    DatePipe,
    ConfirmationService
  ]
})
export class RcsaModule { }
