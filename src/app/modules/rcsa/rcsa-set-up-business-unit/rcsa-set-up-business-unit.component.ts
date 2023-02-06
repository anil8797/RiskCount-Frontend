import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";
import {ModalDirective} from "ngx-bootstrap";
import {ActivatedRoute,Params} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-set-up-business-unit',
  templateUrl: './rcsa-set-up-business-unit.component.html',
  styleUrls: ['./rcsa-set-up-business-unit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaSetUpBusinessUnitComponent implements OnInit {
  @ViewChild('cpConfirmation') public confirmBulkUpload: ModalDirective;
  @ViewChild('tagRiskError') public tagRiskErrorModal: ModalDirective;
  public inValidAssessmentUnits:any = [];
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
  public businessFunctionValue:any;
  //
  public openBusinessUnitEdit: any;
  public RiskUnitData:any;
  public riskList:Observable<Array<Select2OptionData>>;
  public riskOptions:any;
  public selectedRiskUnit: Observable<number>;
  public defaultSelectedRiskUnit: Observable<number>;
  public urlParamsRiskUnitId:any;
  public selectedRiskUnitData:any;
  public showRiskSelectionDropdown:boolean =false;
  public uploadedFiles:any;

  public allRisks:any = [];
  public riskData:any = [];
  public tagRiskData:any = [];
  //typeahed
  public typeaheadLoading:boolean;
  typeAheadSearch = new Subject();
  assessmentRisks = {};
  assessmentRisksData = [{
    'email':'chinthu'
  }];
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private activatedRoute:ActivatedRoute
  ) {
    this.riskOptions = {
      placeholder: { id: '', text: 'Select' }
    }
    this.fetchRisk();
    // typeahead search observable
    this.typeAheadSearch
      .debounceTime(300)
      .subscribe(val => {
        this.rcsaService.searchRisk(val).subscribe(
          (responseData: any) => {
            if (responseData) {
              this.riskData = responseData;
            }
          },
          (error: any) => {
          },
          () => {
          }
        );
      });
  }
  onEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // new assessment risk change
  // typeahead observable search
  searchRisk(value){
    if (value === "") {
      this.riskData = [];
    } else if (value.length > 3) {
      this.typeAheadSearch.next(value);
    }
  }
  // Typeahead loading
  changeTypeaheadLoading(e: boolean, bfu): void {
    bfu.typeaheadLoading = e;
  }
  // on selecting risk
  onAssessementRiskSelect(event, bfu) {
    console.log(event, bfu);
    if (event.id) {
      console.log(bfu);
      this.tagRisk(bfu, event.id);
    }
  }
  // tag all risk
  tagAllRisk(event, bfu){
    bfu.allRisks = event.target.checked;
    this.tagRisk(bfu, null);
  }
  removeAllRisk(bfu){
    bfu.allRisks = false;
    this.tagRisk(bfu, null);
  }
  // tagged risks tag and delete
  tagRisk(bfu, riskId?){

    setTimeout (() => {
      bfu.searchValue = null;
    }, 100);
    this.appSpinnerService.display(true);
    this.rcsaService.tagRisk(bfu.id, riskId, bfu.allRisks).subscribe(
      (responseData:any)=>{
        bfu.tagRisks = responseData;
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    );
  }
  deleteTaggedRisk(bfu, tagRiskId){
    this.appSpinnerService.display(true);
    this.rcsaService.deleteTaggedRisk(tagRiskId).subscribe(
      (responseData:any)=>{
          const index = bfu.tagRisks.findIndex((item) => {
            return item.id == tagRiskId
          });
          bfu.tagRisks.splice(index, 1);
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
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
    this.getBusinessFunctionUnitData(selectedRiskUnit);
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
      "isCoordinator" : false,
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
        "rscaCoordinator": assessor.rscaCoordinator,
        "businessFunctionalUnitId" : bfu.id,
        "userName": null,
        "firstName": assessor.firstName,
        "lastName": assessor.lastName,
        "email": assessor.email,
        "phoneNumber": assessor.phoneNumber ? assessor.phoneNumber :null,
        "enabledForRCSA" : false
      }
      console.log('data to save' , dataToSave);
      this.saveOrUpdateAssessor(dataToSave);
    }
  }
  updateAssessor(form, bfu,assessor){
    this.resetAssessorErrorMessage();
    if(form.valid){
      let dataToSave = {
        "rscaCoordinator": assessor.rscaCoordinator,
        "id" : assessor.id,
        "userName": null,
        "firstName": assessor.firstName,
        "lastName": assessor.lastName,
        "email": assessor.email,
        "phoneNumber": assessor.phoneNumber,
        "enabledForRCSA" : assessor.enabledForRCSA,
        "businessFunctionalUnitId":bfu.id
      }
      console.log('data to save' , dataToSave);
      this.saveOrUpdateAssessor(dataToSave);
    }
  }
  cancelNewAssessorAdd(bfu){
    this.resetAssessorErrorMessage();
    bfu.newAssessorAdd = false;
  }
  // delete assessor
  deleteAssessor(id, bfu){
    this.appSpinnerService.display(true);
    this.rcsaService.deleteAssessor(id, bfu.id).subscribe(
      (responseData:any)=>{
        //reloading after delete
        this.appSpinnerService.display(true);
        //this.getBusinessFunctionUnitData(this.selectedRiskUnit);
        this.deleteAssessorAfterSave(id,bfu);
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  deleteAssessorAfterSave(id,bfu){
    if(bfu.assessors.length <=0){
      return;
    }else{
      const index = bfu.assessors.findIndex(assesor => assesor.id == id);
      if (index != -1) {
        bfu.assessors.splice(index, 1);
      };
      this.selectAssessorToEdit(bfu, bfu.assessors[0]);
    }
  }
  // show hide edit bfu sections
  editBfu(bfu){
    bfu.editNameModel = bfu.name;
    bfu.editable = true;
  }
  cancelEditBfu(bfu){
    bfu.editable = false;
  }
  // open addd new bfu sections
  showAddBusinessUnit(){
    this.openBusinessUnitEdit = true;
  }
  closeAddBusinessUnit(){
    this.openBusinessUnitEdit = false;
  }
  //create bfu data with risk coordinator data and selected assesor
  createBfuData(data){
    this.bfuList = data;
    this.bfuList.filter(item=>{
      if(item.assessors && item.assessors.length > 0) {
        item.selectedAssessor = Object.assign({}, item.assessors[0]) ;
        item.assessors.filter(assessor=>{
          if(assessor.rscaCoordinator){
            item.assignedCoordinator = assessor;
          }
        });
      }

      if(item.tagRisks == null){
        item.tagRisks = [];
      };
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
  // get business function unit data from service
  getBusinessFunctionUnitData(riskUnitId){
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.rcsaService.getBusinessFunctionUnitsData(riskUnitId).subscribe(
      (responseData:any)=>{
          if(responseData){
            this.createBfuData(responseData);
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
          //this.getBusinessFunctionUnitData(this.selectedRiskUnit);
          this.createRiskOptions(responseData);
        };
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{

      }
    )
  };
  //get risks to tag service
  getTagRisks(){
    this.appSpinnerService.display(true);
    this.rcsaService.getRisksTaggedControlCategories().subscribe(
      (responseData:any)=>{
        this.tagRiskData = responseData;
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  };

  fetchRisk(){
    this.appSpinnerService.display(true);
    this.rcsaService.fetchRisk().subscribe(
      (responseData: any) => {
        this.appSpinnerService.display(false);
        this.allRisks = responseData;
      },
      (errorData: any) => {
        this.appSpinnerService.display(false);
        console.log(errorData);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }
  //save bfu data
  saveNewBfu(){
    if(this.businessFunctionValue != null || this.businessFunctionValue!= ''){
      let dataToSave = {
        "name" : this.businessFunctionValue,
        "rcsaUnitId" : this.selectedRiskUnit
      }
      console.log('data to update' , dataToSave);
      this.businessFunctionValue = '';
      this.saveOrUpdateBfu(dataToSave);
    }
  }
  //update bfu data
  updateBfu(bfuData){
    if(bfuData.editNameModel != null && bfuData.editNameModel != ''){
      bfuData.editable = false;
      let dataToSave = {
        "name" : bfuData.editNameModel,
        "id" : bfuData.id,
        "rcsaUnitId" : this.selectedRiskUnit
      }
      console.log('data to update' , dataToSave);
      this.saveOrUpdateBfu(dataToSave);
    }
  }
  //delete bfu
  deleteBfu(bfu){
    this.rcsaService.deleteBfu(bfu.id).subscribe(
      (responseData:any)=>{
        //reloading after delete
        this.appSpinnerService.display(true);
        this.getBusinessFunctionUnitData(this.selectedRiskUnit);
      },
      (error:any)=>{

      },
      ()=>{

      }
    )
  }
  //save or update bfu
  saveOrUpdateBfu(data){
    this.appSpinnerService.display(true);
    this.rcsaService.saveBfu(data).subscribe(
      (responseData:any)=>{
        console.log('response after bfu save :' , responseData);
        this.openBusinessUnitEdit = false;
        // reloading the business Function Unit Data
        if(responseData){
          //this.createBfuData(responseData);
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
    this.rcsaService.uploadBfuData(this.selectedRiskUnit, this.uploadedFiles).subscribe(//uploadBfuData
      (responseData:any)=>{
        //reload the data after uploading
        this.getBusinessFunctionUnitData(this.selectedRiskUnit);
      },
      (error:any)=>{
        //reload the data after uploading
        this.getBusinessFunctionUnitData(this.selectedRiskUnit);
      },
      ()=>{
      }
    )
  }
  // for updating bfu name after bfu name edit
  updateBfuInfoAfterEdit(responseData){
    /*this.bfuList.forEach(
    bfu=>{
      const index = responseData.findIndex(item=> item.id == bfu.id);
      if(index != -1){
        bfu.name = responseData[index].name;
        if(bfu.editNameModel != null){
          bfu.editNameModel = responseData[index].name;
        }
      }
    });*/
    responseData.forEach(
      bfu=>{
        if(bfu.tagRisks == null){
          bfu.tagRisks = [];
        };
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
  updateBfuDataAfterSave(responseData){
    this.bfuList.forEach(
      bfu=>{
        if(bfu.tagRisks == null){
          bfu.tagRisks = [];
        };
        const index = responseData.findIndex(item=> item.id == bfu.id);
        if(index != -1){
          bfu.assessors = responseData[index].assessors;
        };
        if(bfu.assessors && bfu.assessors.length > 0 && !bfu.newAssessorAdd){
          bfu.assessors.forEach(assessor=>{
            if(assessor.id == bfu.selectedAssessor.id){
              //bfu.selectedAssessor = Object.assign('{}', assessor);
              this.selectAssessorToEdit(bfu, assessor);
            };
            if(assessor.rscaCoordinator){
              bfu.assignedCoordinator = assessor;
            }
          })
        }else if(bfu.assessors && bfu.assessors.length > 0 && bfu.newAssessorAdd){
          //bfu.selectedAssessor = Object.assign({}, bfu.assessors[0]) ;
          this.selectAssessorToEdit(bfu, bfu.assessors[0]);
          bfu.assessors.forEach(assessor=>{
            if(assessor.rscaCoordinator){
              bfu.assignedCoordinator = assessor;
            }
          });
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
    this.rcsaService.saveAssessor(data).subscribe(
      (responseData:any)=>{
        console.log('response after bfu save :' , responseData);
        // reloading the business Function Unit Data
        if(responseData){
          //this.createBfuData(responseData);
          this.updateBfuDataAfterSave(responseData);
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
  // validate for assigned risks
  validateAssignedRisks(){
    let isValid = true;
   this.inValidAssessmentUnits = [];
    this.bfuList.forEach(bfu=>{
      if(bfu.enabledForRCSA && bfu.tagRisks.length == 0){
        isValid = false;
        this.inValidAssessmentUnits.push(
          {
            name:bfu.name
          }
        )
      }
    });
    if(!isValid){
      this.tagRiskErrorModal.show();
    }
    return isValid;
  }
  // save setup rcsa
  saveSetupRcsa(){
    if(!this.validateAssignedRisks()){
      return;
    }
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
        if(bfu.assessors && bfu.assessors.length > 0){
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
            this.createBfuData(responseData);
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
    this.getTagRisks();
  }

}
