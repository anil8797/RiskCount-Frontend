import { Component, OnInit, ViewChild } from '@angular/core';
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";

import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from "ngx-bootstrap";
import { saveAs } from "file-saver";
import {isUndefined} from "ngx-bootstrap/chronos/utils/type-checks";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-rcsa-admin-setup-business-units',
  templateUrl: './rcsa-admin-setup-business-units.component.html',
  styleUrls: ['./rcsa-admin-setup-business-units.component.scss']
})
export class RcsaAdminSetupBusinessUnitsComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;

  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg

  public setupBusinessUnitsData: any = [];
  public editorConfig: any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinner  : AppSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
   /* this.setupBusinessUnitsData = [
      {
        geography: 'Corporate Finance',
        description: 'Description',
        isEditable: false
      },
      {
        geography: 'Retail Banking',
        description: 'Description',
        isEditable: false
      },
      {
        geography: 'Commercial Banking',
        description: 'Description',
        isEditable: false
      }
    ];*/
    this.editorConfig = {
      skin: 'bootstrapck',
      resize_enabled : false,
      height: 100,
      toolbar: [
        {name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ]},
        {name: 'paragraph', items: [ 'NumberedList', 'BulletedList' , '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    }
  }

  fetchBusinessUnit(){
    this.appSpinner.display(true);
    this.rcsaService.fetchBusinessUnit().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setupBusinessUnitsData = responseData;
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
  // For Business Units

  editRegionRow(row) {
    this.resetErrorMessage(row);
    row.isEditable = true;
  }


  businessUnitModelChange(row: any){
    if(!row.geography && row.geography !=null){
      //row.isValidName=false;
    } else {
      row.isValidName=true;
    }
  }

  cancelRegionRow(row) {
    if("" == row.geography || isUndefined(row.geography) || row.geography == null){
      row.isValidName=false;
    } else {
      row.isValidName=true;
    }

    if(!row.geography){
      return false;
    }

    row.isEditable = false;

    let businessUnitObj = {
      id:row.id,
      name:row.geography,
      description:row.description
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addBusinessUnit(businessUnitObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this. fetchBusinessUnit();

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
      this.rcsaService.updateBusinessUnit(businessUnitObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.successModalMsg = "Successfully saved";
          this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
          this.errorModalMsg = "Error during save, please try again";
          this.errorModal.show();
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }

  }
  // reset error messages
  resetErrorMessage(row){
    row.showError = false;
    row.errorMessage = "";
  }
  addBusinessUnit() {
    const setupBusinessUnitsData: any  = [...this.setupBusinessUnitsData];
    const obj  = {
      id:0,
      geography: '',
      description: '',
      isEditable: true,
      isValidName : true
    }
    setupBusinessUnitsData.unshift(obj);
    this.setupBusinessUnitsData = setupBusinessUnitsData;
  }
  removeRow(row) {
    this.resetErrorMessage(row);
    if(row.id == 0){
      const setupBusinessUnitsData: any  = [...this.setupBusinessUnitsData];
      const index: number = setupBusinessUnitsData.indexOf(row);
      if (index !== -1) {
        setupBusinessUnitsData.splice(index, 1);
        this.setupBusinessUnitsData = setupBusinessUnitsData;
      }
    }else{
      this.appSpinner.display(true);
      this.rcsaService.deleteBusinessUnit(row.id).subscribe(
        (responseData: any) => {
          const setupBusinessUnitsData: any  = [...this.setupBusinessUnitsData];
          const index: number = setupBusinessUnitsData.indexOf(row);
          if (index !== -1) {
            setupBusinessUnitsData.splice(index, 1);
            this.setupBusinessUnitsData = setupBusinessUnitsData;
          }
          this.appSpinner.display(false);
          //this.successModalMsg = "Successfully deleted";
          //this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
         // row.errorMessage = JSON.parse(errorData.error).message;
          row.errorMessage = row.geography + ' is part of a RCSA Unit. It cannot be deleted.';
          row.showError = true;
          //this.errorModalMsg = "Error during delete, please try again";
          //this.errorModal.show();
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }
  }
  ngOnInit() {
    this.fetchBusinessUnit();
  }

}
