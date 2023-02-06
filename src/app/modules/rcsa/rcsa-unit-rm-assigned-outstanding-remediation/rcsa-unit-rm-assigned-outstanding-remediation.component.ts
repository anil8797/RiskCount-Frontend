import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'app-rcsa-unit-rm-assigned-outstanding-remediation',
  templateUrl: './rcsa-unit-rm-assigned-outstanding-remediation.component.html',
  styleUrls: ['./rcsa-unit-rm-assigned-outstanding-remediation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaUnitRmAssignedOutstandingRemediationComponent implements OnInit {
  public riskUnitData:any;
  public selectedRiskUnitDto:any;
  public selectedRiskUnit:any;
  public riskList:Observable<Array<Select2OptionData>>;
  // declarations
  public options:any;
  public option2:any;
  public assignedOutstandingRemediations: any;
  public selectedSubmission: any;
  public editorConfig:any;
  public today:any;
  public daysFilterData:any = [];
  public selectedDayFilter:number = 30;
  public businessUnits:any = [];
  public priorityList:any;
  public priorityOption:any;
  public bfu_status_list:any;
  public remediationStatus:any = [];
  public emailSendStatus:any = {};
  public rcsaUnitName: any;

  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    this.editorConfig = {
      skin:'bootstrapck',
      resize_enabled : false,
      removePlugins : 'elementspath',
      height:100,
      toolbar:[
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] }
        //{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ,'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    };
    // no of dats filter data
    this.daysFilterData = [
      {
        id:30,
        text:"Submissions in last 30 days"
      },
      {
        id:60,
        text:"Submissions in last 60 days"
      },
      {
        id:90,
        text:"Submissions in last 90 days"
      },
      {
        id:120,
        text:"Submissions in last 120 days"
      },
      {
        id:0,
        text:"Submissions in last 120+ days"
      }
    ];
    this.selectedSubmission = this.daysFilterData[0];
    // priority list for the dropdown
    this.priorityOption = {
      placeholder: { id: '', text: 'Assign priority', route:'' }
    }
    this.priorityList = [
      {
        id:"",
        text:""
      },
      {
        id:"MANDATORY",
        text:"Mandatory"
      },
      {
        id:"DISCRETIONARY",
        text:"Discretionary"
      },
      {
        id:"IGNORE",
        text:"Ignore",
      }
    ];
    this.bfu_status_list = [
      {
        id:"ASSIGNED",
        text:"Assigned"
      },
      {
        id:"COMPLETE",
        text:"Complete"
      },
      {
        id:"IN_PROGRESS",
        text:"In Progress"
      }
    ];
    this.remediationStatus = [
      {
        id:"",
        text:""
      },
      {
        id:"OPEN",
        text:"Open"
      },
      {
        id:"CLOSED",
        text:"Closed"
      },
      {
        id:"CANCEL",
        text:"Cancel"
      }
    ];
    this.options = {
      placeholder: { id: '', text: 'current status'}
    }
    this.option2 = {
      placeholder: { id: '', text: 'Select Remediation Unit'}
    };

    this.rcsaUnitName = ['RCSA UNIT-1', 'RCSA UNIT-2', 'RCSA UNIT-3'];

    // this.createAssignedRemediationData(data);
  }

  //validation
  validateMandatoryFields(row){
    let errors = 0;
    // validate owner and coowner is same or not ! if priority value is
    if(row.priority != null && row.priority != 'IGNORE' && row.ownedBusinessFunctionUnitId != null && row.coOwnedBusinessFunctionUnitId != null && row.ownedBusinessFunctionUnitId == row.coOwnedBusinessFunctionUnitId){
      row.isValid = false;
      errors++
    }
    //console.log(row.dateOfCompletion, row.dateForComparison);
    /*if(row.dateOfCompletion != null && row.dateForComparison != null && row.dateOfCompletion != row.dateForComparison && row.dateOfCompletion < this.today){
      row.isValid = false;
      errors++
    }*/
    // validate date is future date or not if priority value is
    /*if(row.dateOfCompletion != null && row.dateOfCompletion < this.today){
      row.isValid = false;
      errors++
    }*/
    return errors;
  }


  // bfu status display name
  getBfuStatusDisplayName(value){
    let index = this.bfu_status_list.findIndex(bfu=>bfu.id == value);
    if(index != -1){
      return this.bfu_status_list[index].text;
    }else{
      const val = "";
      return val;
    }
  }
  //create data to include bfu status display name
  createAssignedRemediationData(data){
    data.forEach(bfu=>{
      let index = this.bfu_status_list.findIndex(bfuList=>bfuList.id == bfu.businessFunctionalUnitStatus);
      if(index != -1){
        bfu.businessFunctionalUnitStatusDisplayName = this.bfu_status_list[index].text;
      };
      if(bfu.dateOfCompletion != null){
        bfu.dateOfCompletion = new Date(bfu.dateOfCompletion);
        //bfu.dateForComparison = new Date(bfu.dateOfCompletion);
      };
      if(this.emailSendStatus != null){
          if(this.emailSendStatus[bfu.remediationId]){
              bfu.emailSendStatus = this.emailSendStatus[bfu.remediationId];
          }else{
              bfu.emailSendStatus = false;
          }
      }else{
        bfu.emailSendStatus = false;
      }
    })
    this.assignedOutstandingRemediations = data;
    console.log(this.assignedOutstandingRemediations);
    this.appSpinnerService.display(false);
  }
  // create dropdonw options for remediation units
  createRemediationUnitsOptions(data){
    this.businessUnits = [
      {id:"", text:""}
    ];
    if(data != null && data.length > 0){
      data.forEach(item=>{
        const obj = {
          id : item.id,
          text:item.name
        }
        this.businessUnits.push(obj);
      })
    }
  }
  // on days filter dropdown change
  getRemediationsByDays(value){
    // function to get data based on selection
    this.appSpinnerService.display(true);
    this.selectedDayFilter = value;
    this.getRemediationData(this.selectedRiskUnit, value);
  }
  // create options data for risk dropdown
  createRiskOptions(data){
    let optionsArray = [];
    if(data && data.length > 0){
      data.forEach(riskunit=>{
        let obj = {
          id :riskunit.id,
          text:riskunit.name
        }
        optionsArray.push(obj);
      });
      this.riskList = Observable.create(obs => {
        obs.next(optionsArray);
        obs.complete();
      });
    }
  }
  //get rcsa units from service
  getRcsaUnits(){
    this.rcsaService.getAllrcsaUnits().subscribe(
      (responseData:any)=>{
        console.log('All business Units :' , responseData);
        if(responseData && responseData.length>0){
          this.riskUnitData = responseData;
          this.selectedRiskUnit = responseData[0].id;
          this.createRiskOptions(responseData);
        }else{
          this.appSpinnerService.display(false);
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.getRemediationUnits(this.selectedRiskUnit);
      }
    )
  }
  // on risk dropdown data change\
  onRiskUnitChange(){
    this.appSpinnerService.display(true);
    let index = this.riskUnitData.findIndex(risk=> risk.id == this.selectedRiskUnit);
    this.selectedRiskUnitDto = this.riskUnitData[index];
    this.getRemediationUnits(this.selectedRiskUnit);
    this.getRemediationData(this.selectedRiskUnit, this.selectedDayFilter);
  }
  // get remediation units from service
  getRemediationUnits(rcsaUnitId){
    this.rcsaService.getRemediationUnits(rcsaUnitId).subscribe(
      (responseData:any)=>{
        console.log(responseData);
        this.createRemediationUnitsOptions(responseData);
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      }
    )
  }
  // get remediation data from service
  getRemediationData(selectedRiskUnit, days){
    this.rcsaService.fetchRemediationsUnitrmSummary(selectedRiskUnit, days).subscribe(
      (responseData:any)=>{
        if(responseData){
          console.log(responseData);
          this.createAssignedRemediationData(responseData);
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      });
  };
  saveRemediation(rowData){
    this.appSpinnerService.display(true);
    let obj = {
      "remediationId" : rowData.remediationId,
      "controlCategoryId" : rowData.id,
      "finalProposedRemediation" : rowData.finalProposedRemediation,
      "ownerId" : rowData.ownedBusinessFunctionUnitId,
      "coOwnerId" : rowData.coOwnedBusinessFunctionUnitId,
      "priority" : rowData.priority,
      "dateOfCompletion" : rowData.dateOfCompletion ? rowData.dateOfCompletion.getTime() : "",
      "days" : this.selectedDayFilter,
      "remediationStatus":rowData.remediationStatus
    };
    if(rowData.businessFunctionalUnitStatus != "COMPLETE"){
      let errors = this.validateMandatoryFields(rowData);
      console.log('errors', errors);
      if(errors == 0){
        this.saveAfterValidation(rowData, obj);
      }else{
        this.appSpinnerService.display(false);
      }
    }else{
      this.saveAfterValidation(rowData, obj);
    };
  };
  saveAfterValidation(rowData, data){
    this.rcsaService.saveUnitRmRemediation(data).subscribe(
      (responseData:any)=>{
        console.log('saving response', responseData);
        this.cancelEditRow(rowData);
        if(responseData){
          console.log(responseData);
          this.createAssignedRemediationData(responseData);
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
     });
  }
  notifyRemediationReminderEmail(rowData){
    this.appSpinnerService.display(true);
    this.rcsaService.notifyBfusAndCoowners(rowData.remediationId).subscribe((responseData:any)=>{
          if(responseData && responseData.status == 'SUCCESS'){
              rowData.emailSendStatus = true;
              this.emailSendStatus[rowData.remediationId] = true;
              localStorage.setItem('email_send_status', JSON.stringify(this.emailSendStatus));
          }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      });
  }

  // edit click on each row
  editRow(row) {
    row.isRemediationStatusEditable=true;
    if(row.businessFunctionalUnitStatus != 'COMPLETE'){
      row.isRowEditable=true;
    }else{
      row.isRowEditable=false;
    }
  }
  cancelEditRow(row) {
    row.isRowEditable=false;
    row.isRemediationStatusEditable=false;
  }
  ngOnInit() {
    this.appSpinnerService.display(true);
    this.getRcsaUnits();
    this.today = new Date();
    this.emailSendStatus = JSON.parse(localStorage.getItem('email_send_status')) ? JSON.parse(localStorage.getItem('email_send_status')) : {}
    console.log(this.emailSendStatus);
    //this.alternateScale[b]
    //localStorage.setItem('loggedInUserObject', JSON.stringify(userObject));
  }
}
