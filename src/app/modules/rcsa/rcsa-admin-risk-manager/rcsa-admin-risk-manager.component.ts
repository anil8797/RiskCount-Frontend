import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rcsa-admin-risk-manager',
  templateUrl: './rcsa-admin-risk-manager.component.html',
  styleUrls: ['./rcsa-admin-risk-manager.component.scss']
})
export class RcsaAdminRiskManagerComponent implements OnInit {

public riskManagerSelectOption: any= [];
public options:any;
public types: any[];
public order: any[];
//public type: any[];
  constructor(
    private _router: Router
  ) {
    this.riskManagerSelectOption = [
      /*{
        id: "1",
        selectOption: "SET FINANCIAL LOSS DEFINITIONS FOR RISE MATRIX"
      },*/
      {
        id: "1",
        text: "SET UP RISKS/POLICY/CONTROL CATEGORY",
        route:'setup-risk-policy-control'
      },
      {
        id: "2",
        text: "SET INHERENT RISK RATING",
        route:'set-inherent-risk'
      },
      {
        id: "3",
        text: "SET FINANCIAL LOSS DEFINITIONS FOR RISK MATRIX",
        route:'set-financial-loss'
      },
      {
        id: "4",
        text: "SET UP REGIONS",
        route:'setup-regions'
      },
      {
        id: "5",
        text: "SET UP BUSINESS UNITS",
        route:'setup-business-units'
      },
      {
        id: "6",
        text: "SET RCSA UNITS",
        route:'setup-rcsa-units'
      }
    ];
    this.options = {
      placeholder: { id: '', text: 'Select Quarter', route:'' }
    }

  }


  changeAdminTemplate(e) {
    this._router.navigate(['rcsa/admin/' + e.data[0].route])
  }

  ngOnInit() {
  }

}
