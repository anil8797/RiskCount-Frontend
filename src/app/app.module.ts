import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Importing Layout Components
import {
  MainLayoutComponent,
  PlainLayoutComponent
} from './container';

//Basic Imports
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig} from "ng2-currency-mask/src/currency-mask.config";
import {BsDropdownModule, PopoverModule} from 'ngx-bootstrap';
import {AppSpinnerService} from './services/common/app-spinner';
import {TokenInterceptor} from './interceptor/app-token-interceptor';
import {DataTransferService} from './services/data-transfer/data-transfer.service';
import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthGuard} from './guards/auth.guard';
import {AuthSuccessGuard} from './guards/auth-success.guard';
import {AppSharedService} from "./services/common/app-shared.service";

//Storage For Layout Components
const APP_CONTAINER = [
  MainLayoutComponent,
  PlainLayoutComponent
];

//CURRENCY MASK
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "$",
  suffix: "",
  thousands: ","
};

//MAIN MODULE INITIALIZATION
@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINER
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DataTransferService,
    AppSpinnerService,
    AuthenticationService,
    AuthGuard,
    AuthSuccessGuard,
    AppSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
