import { Component } from '@angular/core';
import {AppSpinnerService} from "./services/common/app-spinner";

@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  showLoader: boolean;
  constructor(private loaderService: AppSpinnerService){}

  ngOnInit() {
    this.loaderService.status.subscribe(
      (val: boolean) => {
        this.showLoader = val;
      },
      (error: any) => {
        console.log("Error in App-Spinner::>", error);
      },
      () => {}
    );
  }
}
//template: '<router-outlet><span *ngIf="showLoader" class="loading"></span></router-outlet>',
