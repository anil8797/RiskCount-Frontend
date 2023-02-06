import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";
import {ModalDirective} from "ngx-bootstrap";
import {ActivatedRoute,Params} from "@angular/router";

@Component({
  selector: 'app-setup-remediation-unit',
  templateUrl: './rcsa-unit-rm-setup-remediation.component.html',
  styleUrls: ['./rcsa-unit-rm-setup-remediation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaUnitRmSetUpRemediationComponent implements OnInit {
  @ViewChild('cpConfirmation') public confirmBulkUpload: ModalDirective;
  private subscription:any;

  // FOR ACCORDION
  public showChecked:boolean = true;
  public bfuList:any;
  public openAccordions: boolean = false;
  public newAssessorAdd:boolean = false;
  public newAssessor:any;
  public showAssessorErrorMessage:boolean = false;
  public assessorErrorMessage:any = "";
  public isEditableDetails : boolean  = false;
  public RemediationUnitValue:any;
  //
  public openRemediationUnitEdit: any;
  public RiskUnitData:any;
  public riskList:Observable<Array<Select2OptionData>>;
  public riskOptions:any;
  public selectedRiskUnit: Observable<number>;
  public defaultSelectedRiskUnit: Observable<number>;
  public urlParamsRiskUnitId:any;
  public selectedRiskUnitData:any;
  public showRiskSelectionDropdown:boolean =false;
  public uploadedFiles:any;

  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private activatedRoute:ActivatedRoute
  ) {
    this.riskOptions = {
      placeholder: { id: '', text: 'Select' }
    }
  }
  onEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // ==============================================
  changeCoordinator(event, assessor){
    assessor.rscaCoordinator = event.target.checked;
  }
  selectAssessorToEdit(bfu, assessor){
    assessor.editable = false;
    this.resetAssessorErrorMessage();
    bfu.selectedAssessor = Object.assign('{}', assessor);
    bfu.newAssessorAdd = false;
  }
  editAssessor(assessor){
    this.resetAssessorErrorMessage();
    assessor.editable = true;
  }
  cancelEditAssessor(assessor){
    this.resetAssessorErrorMessage();
    assessor.editable = false;
  }
  // get selected risk unit data
  getSelectedRiskUnitData(id){
    const index = this.RiskUnitData.findIndex(unit=> unit.id == id);
    if(index != -1){
        this.selectedRiskUnitData = this.RiskUnitData[index];
    }
  }
  // on risk unit dropdown change
  changeRiskUnit(selectedRiskUnit){
    this.appSpinnerService.display(true);
    this.selectedRiskUnit = selectedRiskUnit;
    this.getRemediationUnitsData(selectedRiskUnit);
    this.getSelectedRiskUnitData(selectedRiskUnit);
  }
  // on business unit selection change -- need to select all assessors if bfu is selected
  bfuSelectionChange(value, bfu){
    //if(value){
      if(bfu.assessors && bfu.assessors.length>0){
        bfu.assessors.forEach(assessor=>{
          assessor.enabledForRCSA = value;
        })
      }
    //}
  }
  //functions to expand and collapse Accordions
  expandAll() {
    this.openAccordions = true;
  }
  collapseAll() {
    this.openAccordions = false;
  }
  // add and cancel add assesor
  addAssessor(bfu){
    this.newAssessor = {
      "id" : "",
      "firstName": "",
      "lastName": "",
      "phoneNumber": "",
      "email": "",
      "editable":true
    }
    bfu.newAssessorAdd = true;
    bfu.selectedAssessor = {};
    //bfu.assessors.push(assessor);
  };
  //save assessor
  saveNewAssessor(form, bfu,assessor){
    this.resetAssessorErrorMessage();
    if(form.valid){
      let dataToSave = {
        "id" : bfu.id,
        "rcsaUnitId":Number(this.selectedRiskUnit),
        "assessor":{
          "name": null,
          "firstName": assessor.firstName,
          "lastName": assessor.lastName,
          "email": assessor.email,
          "phoneNumber": assessor.phoneNumber ? assessor.phoneNumber :null,
          "rscaCoordinator":true,
          "enabledForRCSA":true
        }
      }
      console.log('data to save' , dataToSave);
      this.saveOrUpdateAssessor(dataToSave);
    }
  }
  updateAssessor(form, bfu,assessor){
    this.resetAssessorErrorMessage();
    if(form.valid){
      let dataToSave = {
        "id" : bfu.id,
        "rcsaUnitId":Number(this.selectedRiskUnit),
        "assessor":{
          "id" : assessor.id,
          "userName": null,
          "firstName": assessor.firstName,
          "lastName": assessor.lastName,
          "email": assessor.email,
          "phoneNumber": assessor.phoneNumber,
          "rscaCoordinator":true,
          "enabledForRCSA":true
        }
      }
      console.log('data to save' , dataToSave);
      this.saveOrUpdateAssessor(dataToSave);
    }
  }
  cancelNewAssessorAdd(bfu){
    this.resetAssessorErrorMessage();
    bfu.newAssessorAdd = false;
  }


  // show hide edit bfu sections
  editRemediationUnit(bfu){
    bfu.editNameModel = bfu.name;
    bfu.editable = true;
  }
  cancelEditRemediationUnit(bfu){
    bfu.editable = false;
  }
  // open addd new remediations unit sections
  showAddRemediationUnit(){
    this.openRemediationUnitEdit = true;
  }
  closeAddRemediationUnit(){
    this.openRemediationUnitEdit = false;
  }
  //create bfu data with risk coordinator data and selected assesor
  createRemediationData(data){
    this.bfuList = data;
    this.bfuList.filter(item=>{
      if(item.assessor != null) {
        item.selectedAssessor = Object.assign({}, item.assessor) ;
        item.assignedCoordinator = item.selectedAssessor;
      }

    });
    console.log('bfu data', this.bfuList);
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
  // get Remediations  unit data from service
  getRemediationUnitsData(riskUnitId){
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.rcsaService.getRemediationUnits(riskUnitId).subscribe(
      (responseData:any)=>{
          if(responseData){
            this.createRemediationData(responseData);
          };
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  //get rcsa units from service
  getRcsaUnits(){
    this.rcsaService.getAllrcsaUnits().subscribe(
      (responseData:any)=>{
        console.log('All business Units :' , responseData);
        if(responseData && responseData.length>0){
          if(this.urlParamsRiskUnitId != null){
            this.defaultSelectedRiskUnit = this.urlParamsRiskUnitId;
          }
          this.RiskUnitData = responseData;
          this.createRiskOptions(responseData);
        };
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      }
    )
  }
  //save Remediation unit data
  saveNewRemediationUnit(){
    if(this.RemediationUnitValue != null || this.RemediationUnitValue!= ''){
      let dataToSave = {
        "name" : this.RemediationUnitValue,
        "rcsaUnitId" : this.selectedRiskUnit
      }
      console.log('data to update' , dataToSave);
      this.RemediationUnitValue = '';
      this.saveOrUpdateRemediationUnit(dataToSave);
    }
  }
  //update  Remediation unit data
  updateRemediationUnit(bfuData){
    if(bfuData.editNameModel != null && bfuData.editNameModel != ''){
      bfuData.editable = false;
      let dataToSave = {
        "name" : bfuData.editNameModel,
        "id" : bfuData.id,
        "rcsaUnitId" : this.selectedRiskUnit
      }
      console.log('data to update' , dataToSave);
      this.saveOrUpdateRemediationUnit(dataToSave);
    }
  }

  //save or update Remediation Unit
  saveOrUpdateRemediationUnit(data){
    this.appSpinnerService.display(true);
    this.rcsaService.saveRemediationUnit(data).subscribe(
      (responseData:any)=>{
        console.log('response after bfu save :' , responseData);
        this.openRemediationUnitEdit = false;
        // reloading the Remediation Unit Data
        if(responseData){
          //this.createRemediationData(responseData);
          this.updateBfuInfoAfterEdit(responseData);
        }
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  //upload file - excel file upload
  uploadattachment(event){
    this.uploadedFiles = '';
    console.log('files', event.target.files);
    this.uploadedFiles = event.target.files;
    this.confirmBulkUpload.show();

  };
  saveAttachment(){
    this.confirmBulkUpload.hide();
    this.appSpinnerService.display(true);
    this.rcsaService.uploadRemediationData(this.selectedRiskUnit, this.uploadedFiles).subscribe(
      (responseData:any)=>{
        //reload the data after uploading
        this.getRemediationUnitsData(this.selectedRiskUnit);
      },
      (error:any)=>{
        //reload the data after uploading
        this.getRemediationUnitsData(this.selectedRiskUnit);
      },
      ()=>{
      }
    )
  }
  // for updating remediation unit name after remediation unit name edit
  updateBfuInfoAfterEdit(responseData){
    responseData.forEach(
      bfu=>{
        const index = this.bfuList.findIndex(item=> item.id == bfu.id);
        if(index != -1){
          this.bfuList[index].name = bfu.name;
          if(this.bfuList[index].editNameModel != null){
            this.bfuList[index].editNameModel = bfu.name;
          }
        }else{
          this.bfuList.push(bfu);
        }
      });
  }
  // for updating the date after saving the assessor
  updateRemediationUnitDataAfterSave(responseData){
    this.bfuList.forEach(
      bfu=>{
        const index = responseData.findIndex(item=> item.id == bfu.id);
        if(index != -1){
          bfu.assessor = responseData[index].assessor;
        };
        if(bfu.assessor != null){
          this.selectAssessorToEdit(bfu, bfu.assessor);
          bfu.assignedCoordinator = bfu.assessor;
        }else{
          this.selectAssessorToEdit(bfu, {});
        }
      }
    );
  }
  // reset error message
  resetAssessorErrorMessage(){
    this.showAssessorErrorMessage = false;
    this.assessorErrorMessage = "";
  }
  // assesor save
  saveOrUpdateAssessor(data){
    this.appSpinnerService.display(true);
    this.rcsaService.saveRemediationCordinator(data).subscribe(
      (responseData:any)=>{
        console.log('response after bfu save :' , responseData);
        // reloading the business Function Unit Data
        if(responseData){
          //this.createRemediationData(responseData);
          this.updateRemediationUnitDataAfterSave(responseData);
        }
      },
      (errorData:any)=>{
        this.showAssessorErrorMessage = true;
        this.assessorErrorMessage = JSON.parse(errorData.error).message;
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  };
  // save setup rcsa
  saveSetupRcsa(){
    let saveSetupObj = {
      "rcsaUnitId" : this.selectedRiskUnit? this.selectedRiskUnit: '',
      "businessFunctionalUnits" : []
    }
    this.bfuList.forEach(bfu=>{
        let bfuObj = {
          id:bfu.id,
          enabledForRCSA : bfu.enabledForRCSA,
          assessors :[]
        };
        if(bfu.assessors.length > 0){
          bfu.assessors.forEach(assessor=>{
            let assessorObj = {
              enabledForRCSA: assessor.enabledForRCSA,
              id: assessor.id
            }
            bfuObj.assessors.push(assessorObj);
          })
        }
        saveSetupObj.businessFunctionalUnits.push(bfuObj);
    });
    if(saveSetupObj.businessFunctionalUnits.length > 0){
      this.appSpinnerService.display(true);
      this.rcsaService.saveSetupForRcsa(saveSetupObj).subscribe(
        (responseData:any)=>{
          if(responseData){
            this.createRemediationData(responseData);
          }
        },
        (error:any)=>{
          this.appSpinnerService.display(false);
        },
        ()=>{
          this.appSpinnerService.display(false);
        }
      )
    }
  }
  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let riskUnitId = params['riskUnitId'];
      console.log(riskUnitId);
      //if(riskUnitId != undefined){
        this.urlParamsRiskUnitId = riskUnitId;
      //}
    });
    this.appSpinnerService.display(true);
    this.getRcsaUnits();
  }

}
