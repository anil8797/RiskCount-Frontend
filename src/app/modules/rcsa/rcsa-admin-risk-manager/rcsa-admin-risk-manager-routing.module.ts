import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RcsaAdminRiskManagerComponent} from "./rcsa-admin-risk-manager.component";
import {RcsaAdminSetupRiskPolicyControlComponent} from "./rcsa-admin-setup-risk-policy-control/rcsa-admin-setup-risk-policy-control.component";
import {RcsaAdminSetInherentRiskComponent} from "./rcsa-admin-set-inherent-risk/rcsa-admin-set-inherent-risk.component";
import {RcsaAdminSetFinancialLossComponent} from "./rcsa-admin-set-financial-loss/rcsa-admin-set-financial-loss.component";
import {RcsaAdminSetupRegionsComponent} from "./rcsa-admin-setup-regions/rcsa-admin-setup-regions.component";
import {RcsaAdminSetupBusinessUnitsComponent} from "./rcsa-admin-setup-business-units/rcsa-admin-setup-business-units.component";
import {RcsaAdminSetupRcsaUnitComponent} from "./rcsa-admin-setup-rcsa-unit/rcsa-admin-setup-rcsa-unit.component";

const routes: Routes = [
  {
    path       : '',
    redirectTo : 'setup-risk-policy-control',
    pathMatch  : 'full',
  },
  {
    path: '',
    component: RcsaAdminRiskManagerComponent,
    data: {
      title: 'Admin Risk Manager'
    },
    children: [
      {
        path: 'setup-risk-policy-control',
        component: RcsaAdminSetupRiskPolicyControlComponent,
        data: {
          title: 'Admin',
          titleId: 'rcsa_setup'
        }
      },
      {
        path: 'set-inherent-risk',
        component: RcsaAdminSetInherentRiskComponent,
        data: {
          title: 'Admin',
          titleId: 'rcsa_set_inherent'
        }
      },
      {
        path: 'set-financial-loss',
        component: RcsaAdminSetFinancialLossComponent,
        data: {
          title: 'Admin',
          titleId: 'rcsa_set_financial_loss'
        }
      },
      {
        path: 'setup-regions',
        component: RcsaAdminSetupRegionsComponent,
        data: {
          title: 'Admin',
          titleId: 'rcsa_setup_regions'
        }
      },
      {
        path: 'setup-business-units',
        component: RcsaAdminSetupBusinessUnitsComponent,
        data: {
          title: 'Admin',
          titleId: 'setup-business-units'
        }
      },
      {
        path: 'setup-rcsa-units',
        component: RcsaAdminSetupRcsaUnitComponent,
        data: {
          title: 'Admin',
          titleId: 'setup-rcsa-units'
        }
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcsaAdminRiskManagerRoutingModule { }
