import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

// Import components
import {
  AppHeaderComponent,
  APP_ACCORDION,
  APP_BU_ACCORDION,
  APP_RE_ACCORDION
} from '../components';

const APP_COMPONENTS = [
  AppHeaderComponent,
  APP_ACCORDION,
  APP_BU_ACCORDION,
  APP_RE_ACCORDION
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[...APP_COMPONENTS],
  declarations: [
    ...APP_COMPONENTS
  ]
})
export class InjectableModule { }
