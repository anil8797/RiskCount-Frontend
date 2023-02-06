import { Component, OnInit, ViewChild } from '@angular/core';
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";
import {ModalDirective} from "ngx-bootstrap/index";
import {isUndefined} from "angular4-fusioncharts/dist/src/utils/utils";

@Component({
  selector: 'app-rcsa-admin',
  templateUrl: './rcsa-admin-set-financial-loss.component.html',
  styleUrls: ['./rcsa-admin-set-financial-loss.component.scss']
})
export class RcsaAdminSetFinancialLossComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;

  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg

  public riskManagerFinancialLossData: any = [];
  public setCurrencyType: any = [];
  public currency: any ;
  public defaultCurrency:any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinner  : AppSpinnerService
  ) {

    /*this.setCurrencyType = [
      {id:'USD', text:'USA - USD'}, {id:'INR', text:'India - INR'}
    ];*/

  }

  changeCurrency(event){
    this.currency = event.value;
  }

  fetchSeverity(){
    this.appSpinner.display(true);
    this.rcsaService.fetchSeverity().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        if(responseData.severityMasters != null){
          this.defaultCurrency = responseData.currencyCode;
          this.riskManagerFinancialLossData = responseData.severityMasters;
        }
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
      },
      () => {
        this.appSpinner.display(false);
      }
    );
  }

  fetchCurrency(){
    this.appSpinner.display(true);
    this.rcsaService.fetchCurrency().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setCurrencyType = responseData;
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
      },
      () => {
        this.appSpinner.display(false);
      }
    );
  }

  ngOnInit() {
    this.fetchSeverity();
    this.fetchCurrency();
  }

  editRiskRow(row) {
    row.isEditable = true;
  }

  fromModelChange(row: any, rowIndex:number){
    if(!row.riskType && row.riskType !=null){
      //row.isValidName=false;
    } else {
      row.isFromValid=true;
    }
  }

  toModelChange(row: any, rowIndex:number){
    if(!row.riskType && row.riskType !=null){
      //row.isValidName=false;
    } else {
      row.isToValid=true;
    }
  }

  saveRiskRow(row, rowIndex) {
//validation for from
    if("" == row.minValue || isUndefined(row.minValue) || row.minValue == null){
      row.isFromValid=false;
    } else {
      row.isFromValid=true;
    }

//validation for to
    if("" == row.maxValue || isUndefined(row.maxValue) || row.maxValue == null){
      row.isToValid=false;
    } else {
      row.isToValid=true;
    }

    if(!row.minValue && rowIndex != 4){
      return false;
    }

    if(!row.maxValue && rowIndex != 0){
      return false;
    }

//-------------------------------------------------------------
    row.isEditable = false;

    let severityObj = {
      id:row.rating,
      descriptor :row.descriptor,
      minValue:row.minValue,
      maxValue:row.maxValue,
      currencyCode:this.currency
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addSeverity(severityObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this. fetchSeverity();
          this.fetchCurrency();
          //this.successModalMsg = "Successfully saved";
          //this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
          //this.errorModalMsg = "Error during save, please try again";
          //this.errorModal.show();
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    } else{
      this.rcsaService.updateSeverity(severityObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this. fetchSeverity();
          this.fetchCurrency();
          //this.successModalMsg = "Successfully saved";
          //this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
          //this.errorModalMsg = "Error during save, please try again";
          //this.errorModal.show();
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }
  }
}
