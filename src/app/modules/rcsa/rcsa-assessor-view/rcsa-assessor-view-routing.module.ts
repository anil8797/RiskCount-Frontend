import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RcsaAssessorViewComponent} from "./rcsa-assessor-view.component";

const routes: Routes = [
  {
    path      : '',
    component : RcsaAssessorViewComponent,
    data      : {
      title : 'Self Assessment',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcsaAssessorViewRoutingModule { }
