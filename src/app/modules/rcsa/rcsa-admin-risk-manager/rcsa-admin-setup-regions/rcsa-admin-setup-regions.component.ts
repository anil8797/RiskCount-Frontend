import { Component, OnInit, ViewChild } from '@angular/core';
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";

import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from "ngx-bootstrap";
import { saveAs } from "file-saver";
import {isUndefined} from "ngx-bootstrap/chronos/utils/type-checks";

@Component({
  selector: 'app-rcsa-admin-setup-regions',
  templateUrl: './rcsa-admin-setup-regions.component.html',
  styleUrls: ['./rcsa-admin-setup-regions.component.scss']
})
export class RcsaAdminSetupRegionsComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;

  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg

  public setupRegionsData: any = [];
  public editorConfig: any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinner  : AppSpinnerService
  ) {

    /*this.setupRegionsData = [
      {
        geography: 'North America',
        description: 'Description',
        isEditable: false
      },
      {
        geography: 'Latin & South America',
        description: 'Description',
        isEditable: false
      },
      {
        geography: 'Asia Pacific',
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

  fetchRegion(){
    this.appSpinner.display(true);
    this.rcsaService.fetchRegion().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setupRegionsData = responseData;
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
    this.fetchRegion();
  }

  // FOR REGION
  editRegionRow(row) {
    this.resetErrorMessage(row);
    row.isEditable = true;
  }

  regionModelChange(row: any){
    if(!row.geography && row.geography !=null){
      //row.isValidName=false;
    } else {
      row.isValidName=true;
    }
  }
  // reset error messages
  resetErrorMessage(row){
    row.showError = false;
    row.errorMessage = "";
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

    let regionObj = {
      id:row.id,
      name:row.geography,
      description:row.description
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addRegion(regionObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this. fetchRegion();

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
      this.rcsaService.updateRegion(regionObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
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
  addRegion() {
    const setupRegionsData: any  = [...this.setupRegionsData];
    const obj  = {
      id:0,
      geography: '',
      description: '',
      isEditable: true,
      isValidName : true
    }
    setupRegionsData.unshift(obj);
    this.setupRegionsData = setupRegionsData;
  }
  removeRow(row) {
    this.resetErrorMessage(row);
    if(row.id == 0){
      const setupRegionsData: any  = [...this.setupRegionsData];
      const index: number = setupRegionsData.indexOf(row);
      if (index !== -1) {
        setupRegionsData.splice(index, 1);
        this.setupRegionsData = setupRegionsData;
      }
    }else{
      this.appSpinner.display(true);
      this.rcsaService.deleteRegion(row.id).subscribe(
        (responseData: any) => {
          const setupRegionsData: any  = [...this.setupRegionsData];
          const index: number = setupRegionsData.indexOf(row);
          if (index !== -1) {
            setupRegionsData.splice(index, 1);
            this.setupRegionsData = setupRegionsData;
          }
          this.appSpinner.display(false);
          //this.successModalMsg = "Successfully deleted";
          //this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
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
}
