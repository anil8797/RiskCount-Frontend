import { Component, OnInit, ViewChild } from '@angular/core';
import {RcsaService} from "../../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../../services/common/app-spinner";

import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from "ngx-bootstrap";
import { saveAs } from "file-saver";
import {isUndefined} from "ngx-bootstrap/chronos/utils/type-checks";


@Component({
  selector: 'app-rcsa-admin-setup-risk-policy-control',
  templateUrl: './rcsa-admin-setup-risk-policy-control.component.html',
  styleUrls: ['./rcsa-admin-setup-risk-policy-control.component.scss']
})
export class RcsaAdminSetupRiskPolicyControlComponent implements OnInit {
  @ViewChild('success') public successModal: ModalDirective;
  @ViewChild('error') public errorModal: ModalDirective;

  successModalMsg: string;  // Success-Modal-Msg
  errorModalMsg: string;  // Error-Modal-Msg

  public setupActions: any= [];
  public setupRiskData: any = [];
  public setupRiskPolicyData : any =[];
  public setupControlcategory : any =[];
  public controlProcedure: any = [];
  public editorConfig:any;
  public selectedTemplate:any;
  public document:any;
  //control procedures
  public riskList:any;
  public policyList:any;

  typeAheadData: Array<object>    = [];
  customSelected: string;

  constructor(
    private rcsaService : RcsaService,
    private appSpinner  : AppSpinnerService
  ) {
    // FOR SIDEBAR
    this.setupActions =[
      {
        id: "risk",
        displayName: "RISKS"
      },
      {
        id: "risk_policy",
        displayName: "RISK POLICIES"
      },
      {
        id: "control_category",
        displayName: "CONTROL CATEGORIES <div class='text-center'>&</div> CONTROL PROCEDURES"
      }
    ];
    this.selectedTemplate = this.setupActions[0];
    // FOR RISK STARTS
   /* this.setupRiskData = [
      {
        riskType:"Internal Rouge Activity",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Internal Theft & Fraud",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"External Theft & Fraud",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Systems Security Threat (Hacking etc)",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Employee Relations Issues",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Risk due to Saftey of Work Environment",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Diversity & Discrimination issues",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      },
      {
        riskType:"Suitability , Disclosure & Fiduciary issues",
        description:"Description",
        inherentRiskd1:"5",
        inherentRiskd2:"4",
        isEditable:false
      }
    ];*/

    //FOR RISK POLICY STARTS

    /*this.setupRiskPolicyData = [
      {
        riskType:"Information Security",
        description:"Description",
        policyDocument:'policy info.doc',
        isEditable:false
      },
      {
        riskType:"Change Management",
        description:"Description",
        policyDocument:'',
        isEditable:false
      },
      {
        riskType:"Vendor Management",
        description:"Description",
        policyDocument:'',
        isEditable:false
      },
      {
        riskType:"Business Continuity",
        description:"Description",
        policyDocument:'',
        isEditable:false
      },
      {
        riskType:"Fraud",
        description:"Description",
        policyDocument:'',
        isEditable:false
      },
      {
        riskType:"Market Risk Management",
        description:"Description",
        policyDocument:'',
        isEditable:false
      }
    ];*/

    // FOR CONTROL CATEGORY
   /* this.setupControlcategory = [
      {
        id:0,
        controlCategory:"Acceptable Use",
        description:"Control on who has access to the premises and space of the firm; initial on boarding of an employee will establish this through HR processes; supervisors review and approve an annual entitlement by employee of all premises that an individual may access. Control considerations for Premises include keycard for entry, and for any cordoned off areas within the firm; this control also implements Chinese Walls wherever they may specifically be required. The system to maintain and track these, and bring up for annual/periodic review may be owned by IT or HR.",
        controlProcedure:[
          {
            title:"Control Procedure 1",
            id:1
          },
          {
            title:"Control Procedure 2",
            id:2
          }
        ],
        taggedRisks:[
          {
            riskType:'Internal Fraud',
            id:1
          }
        ],
        taggedPolicies:[
          {
            riskType:'Policy Name',
            id:2
          }
        ],
        isEditable:false
      }
      /!*,
      {
        controlCategory:"Password Management",
        description:"Management Control over improper business practices both from financial viewpoint and\n" +
        "from negative franchise/credibility/reputation and client backlash",
        controlProcedure:[
          {
            title:"Control Procedure 1"
          },
          {
            title:"Control Procedure 2"
          }
        ],
        taggedRisks:[
          {
            title:'Internal Fraud'
          }
        ],
        taggedPolicies:[
          {
            title:'Policy Name'
          }
        ],
        isEditable:false
      },
      {
        controlCategory:"Physical Security",
        description:"Description",
        controlProcedure:[
          {
            title:"Control Procedure 1"
          }
        ],
        taggedRisks:[
          {
            title:'Internal Fraud'
          }
        ],
        taggedPolicies:[
          {
            title:'Policy Name'
          }
        ],
        isEditable:false
      },
      {
        controlCategory:"Clean Desk Policy",
        description:"Description",
        controlProcedure:[
          {
            title:"Control Procedure 1"
          }
        ],
        taggedRisks:[
          {
            title:'Internal Fraud'
          }
        ],
        taggedPolicies:[
          {
            title:'Policy Name'
          }
        ],
        isEditable:false
      },
      {
        controlCategory:"Hardware",
        description:"Description",
        controlProcedure:[
          {
            title:"Control Procedure 1"
          }
        ],
        taggedRisks:[
          {
            title:'Internal Fraud'
          }
        ],
        taggedPolicies:[
          {
            title:'Policy Name'
          }
        ],
        isEditable:false
      },
      {
        controlCategory:"Software",
        description:"Description",
        controlProcedure:[
        ],
        taggedRisks:[
          {
            title:'Internal Fraud'
          }
        ],
        taggedPolicies:[
          {
            title:'Policy Name'
          }
        ],
        isEditable:false
      }*!/
    ];*/

    this.editorConfig = {
      skin:'bootstrapck',
      resize_enabled : false,
      height:100,
      removePlugins : 'elementspath',
      bodyClass : 'ck_custom_padding',
      toolbar:[
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
        { name: 'paragraph', items: [ 'NumberedList', 'BulletedList' ,'-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ]
    }

    // FOR PROCEDURES
    this.riskList = [
      {
        title:"Risk 1"
      },
      {
        title:"Risk 2"
      },
      {
        title:"Risk 3"
      },
      {
        title:"Risk 4"
      }
    ]
    this.policyList = [
      {
        riskType:"Policy 1",
        id:0
      },
      {
        riskType:"Policy 2"
      },
      {
        riskType:"Policy 3"
      },
      {
        riskType:"Policy 4"
      }
    ]
  }
  get self() {
    return this;
  }

  fetchRisk(){
    this.appSpinner.display(true);
    this.rcsaService.fetchRisk().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setupRiskData = responseData;
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

  resetErrors(row){
    row.showError = false;
    row.errorMessage = "";
  }
  editRiskRow(row) {
      row.isEditable=true;
      this.resetErrors(row);
  }

  riskModelChange(row: any){
    if(!row.riskType && row.riskType !=null){
      //row.isValidName=false;
    } else {
      row.isValidName=true;
    }
  }

  cancelEditRiskRow(row) {
    this.resetErrors(row);
    if("" == row.riskType || isUndefined(row.riskType) || row.riskType == null){
      row.isValidName=false;
    } else {
      row.isValidName=true;
    }

    if(!row.riskType){
      return false;
    }

    row.isEditable=false;

    let riskObj = {
      id:row.id,
      name:row.riskType,
      description:row.description,
      inherentRisk:row.inherentRiskd1 +","+row.inherentRiskd1,
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addRisk(riskObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this. fetchRisk();

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
    } else{
      this.rcsaService.updateRisk(riskObj).subscribe(
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
  onEvent(event) {
    event.stopPropagation();

  }
  //FOR RISK
  addRiskRow(){
    const setupRiskData: any  = [...this.setupRiskData];
    let obj  = {
      id:0,
      riskType:null,
      description:"",
      isEditable:true,
      isValidName:true
    }
    setupRiskData.unshift(obj);
    this.setupRiskData = setupRiskData;
  }
  removeRow(row){
    if(row.id == 0){
      const setupRiskData: any  = [...this.setupRiskData];
      const index: number = setupRiskData.indexOf(row);
      if (index !== -1) {
        setupRiskData.splice(index, 1);
        this.setupRiskData = setupRiskData;
      }
    }else{
      this.appSpinner.display(true);
      this.rcsaService.deleteRisk(row.id).subscribe(
        (responseData: any) => {
          //this.successModalMsg = "Successfully deleted";
          //this.successModal.show();
          const setupRiskData: any  = [...this.setupRiskData];
          const index: number = setupRiskData.indexOf(row);
          if (index !== -1) {
            setupRiskData.splice(index, 1);
            this.setupRiskData = setupRiskData;
          }
          this.appSpinner.display(false);
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
          //this.errorModalMsg = "Error during delete, please try again";
          //this.errorModal.show();
          row.showError = true;
          row.errorMessage = 'The Risk was not deleted, because it is tagged to Control Categories. To delete, please untag the Risk from the Control Category.';
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }
  }

  /* FOR RISK POLICY*/

  uploadFile(event, uploadName){

    this.appSpinner.display(true);
    this.rcsaService.fileUpload(event.target.files, uploadName).subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        if(uploadName == 'RISKUPLOAD'){
          this.fetchRisk();
        } else if(uploadName == 'POLICYUPLOAD'){
          this.fetchPolicy();
        } if (uploadName == 'CONTROLCATEGORYUPLOAD'){
          this.fetchControlCategory();
        }
        event.srcElement.value = null;
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
        event.srcElement.value = null;
      },
      () => {
        this.appSpinner.display(false);
        event.srcElement.value = null;
      }
    );
  }

  fetchPolicy(){
    this.appSpinner.display(true);
    this.rcsaService.fetchPolicy().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setupRiskPolicyData = responseData;
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

  editRiskPolicyRow(row) {
    this.resetErrors(row);
    row.isEditable=true;
  }

  policyModelChange(row: any){
    if(!row.riskType && row.riskType !=null){
      //row.isValidName=false;
    } else {
      row.isValidName=true;
    }
  }

  cancelEditRiskPolicyRow(row) {
    this.resetErrors(row);
    if("" == row.riskType || isUndefined(row.riskType) || row.riskType == null){
      row.isValidName=false;
    } else {
      row.isValidName=true;
    }

    if(!row.riskType){
      return false;
    }

    row.isEditable=false;

    let formData = new FormData();
    formData.append("id",row.id);
    formData.append("name",row.riskType);
    formData.append("description",row.description);
    formData.append("policyDocument",row.policyDocument);

    if(row.fileObj){
      formData.append('file', row.fileObj);
    }

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addPolicy(formData).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.fetchPolicy();
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
      this.rcsaService.updatePolicy(formData).subscribe(
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

  attachFile(event, row){
    let fileName = event.target.files[0].name;
    row.policyDocument = fileName;
    row.fileObj = event.target.files[0];

  }

  downloadAttachment(row){

    this.appSpinner.display(true);
    this.rcsaService.downloadFile(row.id, row.policyDocument).subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        saveAs(responseData, row.policyDocument);
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

  addRiskPolicyRow(){
    const setupRiskPolicyData: any  = [...this.setupRiskPolicyData];
    let obj  = {
      id:0,
      riskType:null,
      description:"",
      policyDocument:"",
      isEditable:true,
      fileObj:"",
      isValidName:true
    }
    setupRiskPolicyData.unshift(obj);
    this.setupRiskPolicyData = setupRiskPolicyData;
  }
  removePolicyRow(row){
    if(row.id == 0){
      const setupRiskPolicyData: any  = [...this.setupRiskPolicyData];
      const index: number = setupRiskPolicyData.indexOf(row);
      if (index !== -1) {
        setupRiskPolicyData.splice(index, 1);
        this.setupRiskPolicyData = setupRiskPolicyData;
      }
    }else{
      this.appSpinner.display(true);
      this.rcsaService.deletePolicy(row.id).subscribe(
        (responseData: any) => {
          const setupRiskPolicyData: any  = [...this.setupRiskPolicyData];
          const index: number = setupRiskPolicyData.indexOf(row);
          if (index !== -1) {
            setupRiskPolicyData.splice(index, 1);
            this.setupRiskPolicyData = setupRiskPolicyData;
          }
          this.appSpinner.display(false);
          //this.successModalMsg = "Successfully deleted";
          //this.successModal.show();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          //this.errorModalMsg = "Error during delete, please try again";
          //this.errorModal.show();
          row.showError = true;
          row.errorMessage = 'The Policy was not deleted, because it is tagged to Control Categories. To delete, please untag the Policy from the Control Category.';
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }

  }

  /* FOR CONTROL CATEGORY*/

  fetchControlCategory(){
    this.appSpinner.display(true);
    this.rcsaService.fetchControlCategory().subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.setupControlcategory = responseData;
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

  saveControlCategoryProcedure(row){
    let controlObj = {
      id:row.id,
      controlCategory:row.controlCategory,
      //description:row.description,
      controlProcedure:row.controlProcedure,
      taggedRisks:row.taggedRisks,
      taggedPolicies:row.taggedPolicies
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.fetchControlCategory();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    } else{
      this.rcsaService.updateControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.fetchControlCategory();
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
  }

  saveTaggedRisks(row){
    let controlObj = {
      id:row.id,
      controlCategory:"",
      description:"",
      controlProcedure:[],
      taggedRisks:row.taggedRisks,
      taggedPolicies:[]
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    } else{
      this.rcsaService.updateControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
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
  }

  saveTaggedPolicies(row){
    let controlObj = {
      id:row.id,
      controlCategory:"",
      description:"",
      controlProcedure:[],
      taggedRisks:[],
      taggedPolicies:row.taggedPolicies
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    } else{
      this.rcsaService.updateControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
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
  }

  controlCategoryModelChange(row: any){
    if(!row.controlCategory && row.controlCategory !=null){
      //row.isValidName=false;
    } else {
      row.isValidName=true;
    }
  }

  cancelEditControlCategoryProcedureRow(row) {
    if("" == row.controlCategory || isUndefined(row.controlCategory) || row.controlCategory == null){
      row.isValidName=false;
    } else {
      row.isValidName=true;
    }

    if(!row.controlCategory){
      return false;
    }

    row.isEditable=false;
    this.saveControlCategoryProcedure(row);
    /*let controlObj = {
      id:row.id,
      controlCategory:row.controlCategory,
      description:row.description,
      controlProcedure:row.controlProcedure,
      taggedRisks:row.taggedRisks,
      taggedPolicies:row.taggedPolicies
    };

    this.appSpinner.display(true);
    if(row.id == 0){
      this.rcsaService.addControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.fetchControlCategory();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    } else{
      this.rcsaService.updateControlCategory(controlObj).subscribe(
        (responseData: any) => {
          this.appSpinner.display(false);
          this.fetchControlCategory();
        },
        (errorData: any) => {
          this.appSpinner.display(false);
          console.log(errorData);
        },
        () => {
          this.appSpinner.display(false);
        }
      );
    }*/

  }

  addControlCategoryRow(){
    const setupControlcategory: any  = [...this.setupControlcategory];
    let obj  = {
      id:0,
      riskType:null,
      description:"",
      controlProcedure:[],
      taggedRisks:[],
      taggedPolicies:[],
      isEditable:true,
      isValidName:true
    }
    setupControlcategory.unshift(obj);
    this.setupControlcategory = setupControlcategory;
  }
  removeControlCategoryRow(row){
    const setupControlcategory: any  = [...this.setupControlcategory];
    const index: number = setupControlcategory.indexOf(row);
    if (index !== -1) {
      setupControlcategory.splice(index, 1);
      this.setupControlcategory = setupControlcategory;
    }

    this.appSpinner.display(true);
    this.rcsaService.deleteControlCategory(row.id).subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.successModalMsg = "Successfully deleted";
        this.successModal.show();
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
        this.errorModalMsg = "Error during delete, please try again";
        this.errorModal.show();
      },
      () => {
        this.appSpinner.display(false);
      }
    );

  }
  //
  // Add tagged risk
  addTaggedRisk(risk, row){
    row.searchText ='';
    let index = row.taggedRisks.findIndex(item=> item.id == risk.id);
    if(index == -1){
      row.taggedRisks.push(risk);
    }
  }
  removeTaggedRisk(risk, row){
    const index: number = row.taggedRisks.indexOf(risk);
    if (index !== -1) {
      row.taggedRisks.splice(index, 1);
    }

    //this.saveControlCategoryProcedure(row);
  }
  addTaggedPolicy(risk, row){
    row.policySearchText ='';
    let index = row.taggedPolicies.findIndex(item=> item.id == risk.id);
    if(index == -1){
      row.taggedPolicies.push(risk);
    }
  }
  removeTaggedPolicy(risk, row){
    const index: number = row.taggedPolicies.indexOf(risk);
    if (index !== -1) {
      row.taggedPolicies.splice(index, 1);
    }

    //this.saveControlCategoryProcedure(row);
  }
  removeControlProcedure(procedure, row){
    const index: number = row.controlProcedure.indexOf(procedure);
    if (index !== -1) {
      row.controlProcedure.splice(index, 1);
    }


    /*this.appSpinner.display(true);
    this.rcsaService.deleteControlProcedures(procedure.id).subscribe(
      (responseData: any) => {
        this.appSpinner.display(false);
        this.successModalMsg = "Successfully deleted";
        this.successModal.show();
      },
      (errorData: any) => {
        this.appSpinner.display(false);
        console.log(errorData);
        this.errorModalMsg = "Error during delete, please try again";
        this.errorModal.show();
      },
      () => {
        this.appSpinner.display(false);
      }
    );*/

  }
  addControlProcedure(row){
    row.controlProcedure.push({
      title:'',
      id:0
    });
  }

  changeTemplate(item) {
    this.selectedTemplate = item;

    if(item.id=='risk'){
      this.fetchRisk();
    }
    if(item.id=='risk_policy'){
      this.fetchPolicy();
    }
    if(item.id=='control_category'){
      this.fetchPolicy();
      this.fetchControlCategory();
    }
  };

  revertValue(value: any){
    if(value===""){
      this.typeAheadData = [];
      this.typeAheadData = this.setupRiskData;
    }
  }

  typeaheadOnSelect(searchData: any){
    //this.ratingsData = this.ratingsDataStore;
    let fetchedDataOnTypeAheadSelect: any=[];
    this.setupRiskData.filter(
      (value: any) => {
        if(searchData.item.riskType != null && value.riskType===searchData.item.riskType){
          fetchedDataOnTypeAheadSelect.push(value);
        }
      }
    );
    this.typeAheadData = [];
    this.typeAheadData = fetchedDataOnTypeAheadSelect;
  }


  ngOnInit() {
    this.fetchRisk();

  }

}
