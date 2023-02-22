import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RcsaComponent } from "./rcsa.component";
import { RcsaDashboardComponent } from "./rcsa-dashboard/rcsa-dashboard.component";
import { RcsaStartNewComponent } from "./rcsa-start-new/rcsa-start-new.component";
import { RcsaSetUpPoliciesComponent } from "./rcsa-set-up-policies/rcsa-set-up-policies.component";
import { RcsaSetUpBusinessUnitComponent } from "./rcsa-set-up-business-unit/rcsa-set-up-business-unit.component";
import { RcsaAssessorViewComponent } from "./rcsa-assessor-view/rcsa-assessor-view.component";
import { RcsaUnitRmViewComponent } from "./rcsa-unit-rm-view/rcsa-unit-rm-view.component";
import { RcsaCoordinatorViewComponent } from "./rcsa-coordinator-view/rcsa-coordinator-view.component";
import { RcsaRemediationSummaryReportComponent } from "./rcsa-remediation-summary-report/rcsa-remediation-summary-report.component";
import { RcsaAssignedOustandingRemediationsComponent } from "./rcsa-assigned-oustanding-remediations/rcsa-assigned-oustanding-remediations.component";
import { RcsaUnitRmAssignedOutstandingRemediationComponent } from "./rcsa-unit-rm-assigned-outstanding-remediation/rcsa-unit-rm-assigned-outstanding-remediation.component";
import { RcsaTestDocumentsComponent } from "./rcsa-test-documents/rcsa-test-documents.component";
import { RcsaUnitRmSetUpRemediationComponent } from "./rcsa-unit-rm-setup-remediation/rcsa-unit-rm-setup-remediation.component";
import { RcsaCoordinatorDashboardComponent } from "./rcsa-coordinator-dashboard/rcsa-coordinator-dashboard.component";
import { RatingCalculatorComponent } from "./rating-calculator/rating-calculator.component";
import { UserMannualComponent } from "./user-mannual/user-mannual.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: RcsaComponent,
    data: {
      title: "Self Assessment",
    },
    children: [
      {
        path: "dashboard",
        component: RcsaDashboardComponent,
        data: {
          title: "Dashboard",
          viewId: "rcsa_dashboard",
        },
      },
      /*{
        path      : 'start-new-rcsa/setup-policies',
        component : RcsaSetUpPoliciesComponent,
        data      : {
          title   : 'Set Up Policies',
          titleId : 'rcsa_setup_policies'
        }
      },*/
      {
        path: "admin",
        loadChildren:
          "./rcsa-admin-risk-manager/rcsa-admin-risk-manager.module#RcsaAdminRiskManagerModule",
        data: {
          title: "Admin",
          viewId: "rcsa_admin",
        },
      },
      /*{
        path      : 'assessor-view',
        component : RcsaAssessorViewComponent,
        data      : {
          title   : 'Assessor View',
          viewId  : 'rcsa_assessor_view'
        }
      },*/

      {
        path: "admin/start-new-rcsa",
        component: RcsaStartNewComponent,
        data: {
          title: "Start New Rcsa",
          viewId: "rcsa_start_new",
        },
      },
      {
        path: "rcsa-view/unit-rm-view",
        component: RcsaUnitRmViewComponent,
        data: {
          title: "Unit Risk Manager View",
          viewId: "rcsa_unit_rm_view",
        },
      },
      {
        path: "rcsa-view/test-documents",
        component: RcsaTestDocumentsComponent,
        data: {
          title: "Test Documets",
          viewId: "rcsa_test_documents",
        },
      },
      {
        path: "admin/set-up-business-unit",
        component: RcsaSetUpBusinessUnitComponent,
        data: {
          title: "Set up Business Functions Units",
          viewId: "rcsa_setup_business_function_unit",
        },
      },
      {
        path: "rcsa-view/set-up-business-unit/:riskUnitId",
        component: RcsaSetUpBusinessUnitComponent,
        data: {
          title: "Set up Business Functions Units",
          viewId: "rcsa_setup_business_function_unit",
        },
      },
      {
        path: "coordinator-view",
        component: RcsaCoordinatorViewComponent,
        data: {
          title: "Coordinator View",
          viewId: "rcsa_coordinator_view",
        },
      },
      {
        path: "issues/add-issue",
        component: RcsaRemediationSummaryReportComponent,
        data: {
          title: "Remediation Summary View",
          viewId: "rcsa_remediation_summary",
        },
      },
      {
        path: "issues/rm-assigned-outstanding-issues",
        component: RcsaUnitRmAssignedOutstandingRemediationComponent,
        data: {
          title: "ASSIGNED/OUTSTANDING REMEDIATION",
          viewId: "rcsa_rm_assigned_outstanding_remediation",
        },
      },
      {
        path: "admin/setup-remediation-units",
        component: RcsaUnitRmSetUpRemediationComponent,
        data: {
          title: "Unit Risk Manager Setup Issues",
          viewId: "rcsa_unit_rm_setup-remediation",
        },
      },
      {
        path: "assigned-outstanding-remediations",
        component: RcsaAssignedOustandingRemediationsComponent,
        data: {
          title: "ASSIGNED/OUTSTANDING REMEDIATION",
          viewId: "rcsa_assigned_outstanding_remediation",
        },
      },
      {
        path: "coordinator-dashboard",
        component: RcsaCoordinatorDashboardComponent,
        data: {
          title: "COORDINATOR DASHBOARD",
          viewId: "rcsa_coordinator_dashboard",
        },
      },

      {
        path: "documentation/risk-rating-calculations",
        component: RatingCalculatorComponent,
        data: {
          title: "RATING CALCULATOR",
          viewId: "rating_calculator",
        },
      },
      {
        path: "documentation/user-guide",
        component : UserMannualComponent,
        data : {
          title : "USER MANNUAL",
          viewId : "user_mannual"
         }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RcsaRoutingModule {}
