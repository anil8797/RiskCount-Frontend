import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlainLayoutComponent} from './container/plain-layout';
import {MainLayoutComponent} from './container/main-layout';
import {AuthSuccessGuard} from './guards/auth-success.guard';
import {AuthGuard} from './guards/auth.guard';
import {RcsaAssessorViewComponent} from "./modules/rcsa/rcsa-assessor-view/rcsa-assessor-view.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Main Layout'
    },
    children: [
      {
        path: 'rcsa',
        loadChildren: './modules/rcsa/rcsa.module#RcsaModule'
      }
      /*{
        path: 'vendor-due-diligence',
        loadChildren: './views/vendor-due-diligence/vendor-due-diligence.module#VendorDueDiligenceModule'
      }*/
    ]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    data: {
      title: 'Plain Layout'
    },
    children: [
      {
        path: 'rcsa-assessor-view/:rcsaId',
        loadChildren: './modules/rcsa/rcsa-assessor-view/rcsa-assessor-view.module#RcsaAssessorViewModule'
      }
      /*{
        path: 'vendor-due-diligence',
        loadChildren: './views/vendor-due-diligence/vendor-due-diligence.module#VendorDueDiligenceModule'
      }*/
    ]
  },
  {
    path: '',
    component: PlainLayoutComponent,
    canActivate: [AuthSuccessGuard],
    data: {
      title: 'Plain Layout'
    },
    children: [
      {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
      },
      {
        path: 'reset-password/:token',
        loadChildren:'./modules/reset-password/reset-password.module#ResetPasswordModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'rcsa'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
