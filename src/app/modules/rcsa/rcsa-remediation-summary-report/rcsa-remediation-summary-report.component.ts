import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {ModalDirective} from "ngx-bootstrap";
import {Select2OptionData} from "ng2-select2";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-rcsa-remediation-summary-report',
  templateUrl: './rcsa-remediation-summary-report.component.html',
  styleUrls: ['./rcsa-remediation-summary-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaRemediationSummaryReportComponent implements OnInit {
  // risk units
  public rcsaUnitData:any = [];
  public selectedRcsaUnitDto:any;
  public selectedRcsaUnit:any;
  public rcsaUnitList:Observable<Array<Select2OptionData>>;
  // rcsa list
  public rcsaListData:any = [];
  public rcsaList:Observable<Array<Select2OptionData>>;
  public selectedRcsa:any;

  public remediationSummaryReport: any = [];
  public options:any;
  public dateOfCompletion:any;

  //declarations modal windows
  @ViewChild('remediationReadmore') public remediationReadMoreModal: ModalDirective;
  @ViewChild('addNewRemediation') public addNewRemediationModal: ModalDirective;
  //declarations for the ui
  public today:any;
  public assessmentData:any;
  public priorityList:any;
  public tagRiskOption:any;
  public priorityOption:any;
  public editorConfig:any; // for the ckeditor
  public selectedBfu:any;
  public selectedControlCategory:any;
  public businessUnits:any;


  // add new remediations -- need to remove
  public rcsaExtendEndDate:any;
  public selectedRcsaDto:any;
  public selectedRiskUnitDto:any;

  addNewRedmediationForm: any;
  public controlCategories:any = [];
  public taggedRisks:any = [];
  public controlCategoryData:any = [];
  public remediationUnits:any = [];
  public selectedControlCategoryDto:any;
  public remediationObj: any = {
    controlCategoryId:null,
    taggedRiskId:null,
    finalProposedRemediation:null,
    ownerId:null,
    coOwnerId:null,
    priority:null,
    dateOfCompletion:null,
  };
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private formBuilder:FormBuilder
  ) {
    // priority list for the dropdown
    this.priorityOption = {
      placeholder: { id: '', text: 'Assign priority', route:'' }
    }
    this.tagRiskOption = {
      placeholder: { id: '', text: 'Select Risk', route:'' }
    }
    this.priorityList = [
      {
        id:"",
        text:""
      },
      {
        id:6002,
        text:"Mandatory",
        value:"MANDATORY"
      },
      {
        id:6003,
        text:"Discretionary",
        value:"DISCRETIONARY"
      },
      {
        id:6001,
        text:"Ignore",
        value:"IGNORE"
      }
    ];
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
    this.options = {
      placeholder: { id: '', text: 'Select Remediation Unit', route:'' }
    };
  }
  //validation
  validateMandatoryFields(row, status){
    let errors = 0;
    // validate priority for mandatory
    if(row.priority == null){
      row.isValid = false;
      errors++
    }
    if(status == 'new' && row.taggedRiskId == null || row.taggedRiskId == ''){
      row.isValid = false;
      errors++
    }
    // validate date for mandatory
    if(row.priority != null && (row.priority == 6002 || row.priority == 6003) && row.dateOfCompletion == null){
      row.isValid = false;
      errors++
    }
    // validate ownership if priority value is mandatory or dis
    if(row.priority != null && row.ownerId == null &&  (row.priority == 6002 || row.priority == 6003)){
      row.isValid = false;
      errors++
    }
    // validate owner and coowner is same or not ! if priority value is
    if(row.priority != null && row.priority != 6001 && row.ownerId != null && row.coOwnerId != null && row.ownerId == row.coOwnerId){
      row.isValid = false;
      errors++
    }
    // validate date is future date or not if priority value is
    if(row.dateOfCompletion != null && row.dateOfCompletion < this.today){
      row.isValid = false;
      errors++
    }
    return errors;
  }

  // retun priority value based on pririty id
  getPriorityData(id){
    let value = "";
    let index = this.priorityList.findIndex(priority => priority.id == id);
    if(index != -1){
      value = this.priorityList[index].value;
    }
    return value;
  }
  // open modal window for readmore
  openRemediationReadmoreModal(row,bfu){
    this.selectedControlCategory = row;
    this.selectedBfu = bfu;
    this.remediationReadMoreModal.show();
  }
  // create dropdonw options for business units
  createBusinessUnitsOptions(data){
    this.businessUnits = [
      {id:"", text:""}
    ];
    if(data != null && data.length > 0){
      data.forEach(bfu=>{
        const obj = {
          id : bfu.id,
          text:bfu.name
        }
        this.businessUnits.push(obj);
      })
    }
  }

  // show addNew Remediation date modal
  showAddNewRemediation(){
    this.resetAddRemediationModal();
    this.addNewRemediationModal.show();
  }
  // reset remediationModal
  resetAddRemediationModal(){
    this.remediationObj.finalProposedRemediation = null;
    this.remediationObj.dateOfCompletion = null;
  }
  // create dropdonw options for control categories
  createControlCategoryOptions(data){
    this.controlCategories = [ ];
    if(data != null && data.length > 0){
      data.forEach(item=>{
        const obj = {
          id : item.id,
          text:item.controlCategory
        }
        this.controlCategories.push(obj);
      })
    }
  }
  // create dropdonw options for Tagged RIsksk
  createTaggedRisksOptions(data){
    this.taggedRisks = [{id:"", text:""}];
    if(data != null && data.length > 0){
      data.forEach(item=>{
        const obj = {
          id : item.id,
          text:item.riskType
        }
        this.taggedRisks.push(obj);
      })
    }
  }

  // create dropdonw options for remediation units
  createRemediationUnitsOptions(data){
    this.remediationUnits = [
      {id:"", text:""}
    ];
    if(data != null && data.length > 0){
      data.forEach(item=>{
        const obj = {
          id : item.id,
          text:item.name
        }
        this.remediationUnits.push(obj);
      })
    }
  }
  // get control categories
  getControlCategories(){
    this.rcsaService.fetchControlCategory().subscribe(
      (responseData:any)=>{
        console.log(responseData);
        this.controlCategoryData = responseData;
        this.createControlCategoryOptions(responseData);
      },
      (error:any)=>{
      },
      ()=>{
      }
    )
  }
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
        this.appSpinnerService.display(false);
      }
    )
  }
  // get Business Units from service
  getBusinessUnits(rcsaUnitId){
    this.rcsaService.getBusinessFunctionUnitsData(rcsaUnitId).subscribe(
      (responseData:any)=>{
          console.log(responseData);
          this.createBusinessUnitsOptions(responseData);
      },
      (error:any)=>{
        this.appSpinnerService.display(false);
      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  // create options data for rcsa unit dropdown
  createRcsaUnitOptions(data){
    let optionsArray = [];
    if(data && data.length > 0){
      data.forEach(rcsaUnit=>{
        let obj = {
          id :rcsaUnit.id,
          text:rcsaUnit.name
        }
        optionsArray.push(obj);
      });
      this.rcsaUnitList = Observable.create(obs => {
        obs.next(optionsArray);
        obs.complete();
      });
    }
  }
  // create options data for rcsa list based on rcsa unit  dropdown
  createRcsaListOptions(data){
    let optionsArray = [];
    if(data && data.length > 0){
      data.forEach(rcsa=>{
        let obj = {
          id :rcsa.rcsaId,
          text:rcsa.rcsaName
        }
        optionsArray.push(obj);
      });
      this.rcsaList = Observable.create(obs => {
        obs.next(optionsArray);
        obs.complete();
      });
    }
  }
  //get rcsa units for remediation  from service
  getRcsaUnits(){
    this.appSpinnerService.display(true);
    this.rcsaService.getUnassignedRemediations().subscribe(
      (responseData:any)=>{
        console.log('All Rcsa Units :' , responseData);
        if(responseData && responseData.length>0){
          this.rcsaUnitData = responseData;
          //this.selectedRcsaUnit = responseData[0].id;
          this.createRcsaUnitOptions(responseData);
        }else{
          this.appSpinnerService.display(false);
        }
      },
      (error:any)=>{
          this.appSpinnerService.display(false);
      },
      ()=>{
      }
    )
  }
  // get rcsa based on rcsa unit
  getRcsaListByRcsaUnit(rcsaUnitId){
    this.rcsaService.getUnassignedRemediationsByRcsaUnit(rcsaUnitId).subscribe(
      (responseData:any)=>{
        console.log('Rcsa list based on rcsa unit:' , responseData);
        if(responseData && responseData.length>0){
          this.rcsaListData = responseData;
          this.createRcsaListOptions(responseData);
        }else{
          this.appSpinnerService.display(false);
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

  // on risk dropdown data change\
  onRiskUnitChange(){
    this.appSpinnerService.display(true);
    let index = this.rcsaUnitData.findIndex(risk=> risk.id == this.selectedRcsaUnit);
    this.selectedRcsaUnitDto = this.rcsaUnitData[index];
    //this.getRemediationData(this.selectedRcsaUnit);
    this.getRcsaListByRcsaUnit(this.selectedRcsaUnit);
    //this.getBusinessUnits(this.selectedRcsaUnit);
    this.getRemediationUnits(this.selectedRcsaUnit);
  }
  // on rcsa dropdown change
  onRcsaChange(){
    this.appSpinnerService.display(true);
    this.getRemediationData(this.selectedRcsa);
  }
  // on control category change
  onControlCategoryChange(controlCategoryId){
    this.selectedControlCategoryDto = null;
    let index = this.controlCategoryData.findIndex(item=> item.id == controlCategoryId);
    this.selectedControlCategoryDto = this.controlCategoryData[index];
    this.createTaggedRisksOptions(this.selectedControlCategoryDto.taggedRisks);
  }
  //get remediationreport
  getRemediationData(selectedRcsa){
    this.rcsaService.fetchRemediationSummary(selectedRcsa).subscribe(
      (responseData:any)=>{
        console.log(responseData);
        if(responseData){
          this.assessmentData = responseData;
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
  saveRemediation(data){
    console.log(data);
    let mandatoryErrors = this.validateMandatoryFields(data , 'edit');
    console.log(mandatoryErrors);
    if(mandatoryErrors == 0){
      this.appSpinnerService.display(true);
      let obj = {
        "rcsaId" : this.assessmentData.rcsaId,
        "controlCategoryId" : data.id,
        "finalProposedRemediation" : data.finalProposedRemediation ? data.finalProposedRemediation : "",
        "ownerId" : data.ownerId ? data.ownerId : "",
        "coOwnerId" : data.coOwnerId ? data.coOwnerId : "",
        "priority" : data.priority ? this.getPriorityData(data.priority) : "",
        "dateOfCompletion" : data.dateOfCompletion ? this.getUtcTimeZone(data.dateOfCompletion) : ""
      }
      console.log(obj);
      this.rcsaService.saveRemediationSummary(obj).subscribe(
        (responseData:any)=>{
            console.log(responseData);
            if(responseData){
              this.assessmentData = responseData;
            }
            this.getRemediationUnits(this.selectedRcsaUnit);
        },
        (error:any)=>{
          this.appSpinnerService.display(false);
        },
        ()=>{
        }
      )
    };
  }
  saveNewRemediation(addNewRedmediationForm: NgForm){
    let form:any = addNewRedmediationForm;
    let mandatoryErrors = this.validateMandatoryFields(addNewRedmediationForm.value, 'new');
    if(mandatoryErrors == 0){
      let obj = {
        "rcsaId" : this.assessmentData.rcsaId,
        "masterControlCategoryId" : addNewRedmediationForm.value.controlCategoryId,
        "masterRiskId" : addNewRedmediationForm.value.taggedRiskId,
        "finalProposedRemediation" : addNewRedmediationForm.value.finalProposedRemediation ? addNewRedmediationForm.value.finalProposedRemediation : '',
        "ownerId" : addNewRedmediationForm.value.ownerId,
        "coOwnerId" : addNewRedmediationForm.value.coOwnerId,
        "priority" : addNewRedmediationForm.value.priority ? this.getPriorityData(addNewRedmediationForm.value.priority) : "",
        "dateOfCompletion" : addNewRedmediationForm.value.dateOfCompletion
      };
      this.appSpinnerService.display(true);
      this.rcsaService.saveRemediationSummary(obj).subscribe(
        (responseData:any)=>{
          console.log(responseData);
          addNewRedmediationForm.reset();
          if(responseData){
            this.assessmentData = responseData;
            this.addNewRemediationModal.hide();
            form._submitted = false;
          }
          this.getRemediationUnits(this.selectedRcsaUnit);
        },
        (error:any)=>{
          this.appSpinnerService.display(false);
        },
        ()=>{
        }
      )
    }

  }
  /* getUtcTimeZone(date)
  {
    var currentTime =  date.getTime();
    var localOffset = (-1) * date.getTimezoneOffset() * 60000;
    return Math.round(new Date(currentTime + localOffset).getTime());
  }*/
  getUtcTimeZone(date)
  {
    var currentTime = new Date();
    if(date != undefined){
      date.setHours(currentTime.getHours());
      date.setMinutes(currentTime.getMinutes());
      date.setSeconds(currentTime.getSeconds());
    }
    var currentTimeStamp =  date.getTime();
    return currentTimeStamp;
  }
  preventLink(event){
    event.preventDefault();
    event.stopPropagation();
  }
  ngOnInit() {
    this.appSpinnerService.display(true);
    this.getControlCategories();
    this.getRcsaUnits();
    this.today = new Date();
  }


}
