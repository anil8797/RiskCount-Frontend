import {
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Select2OptionData, Select2TemplateFunction } from "ng2-select2";
import { ActivatedRoute, Params } from "@angular/router";
import { RcsaService } from "../../../services/rcsa/rcsa.service";
import { AppSpinnerService } from "../../../services/common/app-spinner";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { ModalDirective } from "ngx-bootstrap";
import { saveAs } from "file-saver";
import "rxjs/Rx";
@Component({
  selector: "app-rcsa-assessor-view",
  templateUrl: "./rcsa-assessor-view.component.html",
  styleUrls: ["./rcsa-assessor-view.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RcsaAssessorViewComponent implements OnInit {
  @ViewChild("success") public successModal: ModalDirective;
  @ViewChild("error") public errorModal: ModalDirective;
  successModalMsg: string; // Success-Modal-Msg
  errorModalMsg: string; // Error-Modal-Msg
  // public showRiskDropdown:any = true; // commented as per phase 2 req
  //token declaration
  private rcsaId: any;
  public rcsaStartStatus: boolean = false;
  public rcsaStatusMessage: any = "";

  // declarations for ng select2
  public selectedRisk: any;
  /* public riskList: Array<Select2OptionData> = [];
  public options: Select2Options;

  // selected risk and its data
  public selectedRisk :any;
  public selectedRiskOption:any = null;*/ // commented as per phase 2 req
  public selectedControlCategory: any;
  public validationErrors: any = 0;
  public comments = "";
  public attachments: any = [];

  //coordnator submission
  public enableCoordinatorSubmission: boolean = false;

  public policySections: any;
  public assessmentData: any;
  public questions: any;
  public QOptions: any;
  public fileUploadOptions: any;
  public isFileUploadRequired = "";
  public Q1: any;
  public Q2: any;
  public Q3: any;
  public Q4: any;
  public editorConfig: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rcsaService: RcsaService,
    private appSpinnerService: AppSpinnerService
  ) {
    this.editorConfig = {
      skin: "bootstrapck",
      resize_enabled: false,
      height: 100,
      removePlugins: "elementspath",
      toolbar: [
        {
          name: "basicstyles",
          items: ["Bold", "Italic", "Underline", "Strike"],
        },
        // {name: 'paragraph', items: [ 'NumberedList', 'BulletedList' , '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      ],
    };
  }
  // function for result template
  public templateResult: Select2TemplateFunction = (
    state: Select2OptionData
  ): JQuery | string => {
    if (!state.id) {
      //console.log(state);
      return state.text;
    }
    let icon = `<svg>
        <use xlink:href="assets/svg/icons.svg#completed"></use>
        </svg>`;
    let className = "";
    if (state.additional.status == "COMPLETED") {
      let className = "completed";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    } else if (state.additional.status == "IN_PROGRESS") {
      let className = "inprogress";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    } else {
      let className = "inprogress";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
  };

  // function for selection template
  public templateSelection: Select2TemplateFunction = (
    state: Select2OptionData
  ): JQuery | string => {
    if (!state.id) {
      return state.text;
    }
    let icon = `<svg>
        <use xlink:href="assets/svg/icons.svg#completed"></use>
        </svg>`;
    let className = "";
    if (state.additional.status == "COMPLETED") {
      let className = "completed";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    } else if (state.additional.status == "IN_PROGRESS") {
      let className = "inprogress";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    } else {
      let className = "inprogress";
      return jQuery(`<span class=${className}>${icon} ${state.text}</span>`);
    }
  };
  //reset Question
  resetQuestions() {
    this.questions = [
      {
        questionId: 1,
        choiceIds: [""],
        response: "",
        attachments: [],
        id: "",
        createdBy: "",
        updatedBy: "",
      },
      /*{
        "questionId": 2,
        "choiceIds": [""],
        "response": "",
        "attachments": [],
        "id": "",
        "createdBy": "",
        "updatedBy": ""
      },{
        "questionId": 3,
        "choiceIds": [""],
        "response": "",
        "attachments": [],
        "id": "",
        "createdBy": "",
        "updatedBy": ""
      },*/ {
        questionId: 4,
        choiceIds: [""],
        response: "",
        attachments: [],
        id: "",
        createdBy: "",
        updatedBy: "",
      } /*,
      {
        "questionId": 5,
        "choiceIds": [""],
        "response": "",
      }*/,
    ];
  }
  //change risk
  /*changeRisk(e: any){
    this.saveControlProcedures('changeRisk', e); // commented as per phase 2 req
  };*/
  //changeControlCategory on click
  changeControlCategoryOnClick(controlCategory,i) {
    this.saveControlProcedures("changeControlCategory", i);
  }
  //change control category
  changeControlCategory(controlCategory) {
    this.selectedControlCategory = controlCategory;
    this.comments = controlCategory.comments;
    this.attachments = controlCategory.attachments;
    if (this.attachments && this.attachments.length != 0) {
      this.isFileUploadRequired = "1";
    }else{
      this.isFileUploadRequired = "2";
    }
    this.createQuestions(this.selectedControlCategory);
    this.changeControlCategoryStatus(this.selectedControlCategory);
  }
  //creating options for the dropdown
  /*createOptionsData(data){  // commented as per phase 2 req
    this.riskList = [];
    if(data.length>0){
      data.forEach(risk => {
        const riskObj = {
            id: risk.id,
            text: risk.name,
            additional: {
              status: risk.status
            }
          };
        this.riskList.push(riskObj);
      });
      if(this.selectedRisk == null){
        this.selectedRisk = data[0];
        this.selectedRiskOption = this.selectedRisk.id;
        let selectedControlCategory = this.selectedRisk.controlCategories ? this.selectedRisk.controlCategories[0] : {};
        this.changeControlCategory(selectedControlCategory);
      }else{
        let riskId = this.selectedRisk.id;
        let categoryId = this.selectedControlCategory.id;
        const index = data.findIndex(risk => risk.id === riskId);
        if(index != -1){
          this.selectedRisk = data[index];
        }
        const categoryindex = this.selectedRisk.controlCategories.findIndex(category => category.id === categoryId);
        if(categoryindex != -1){
          let selectedControlCategory = this.selectedRisk.controlCategories[categoryindex];
          this.changeControlCategory(selectedControlCategory);
        }
        //this.selectedRiskOption = this.selectedRisk.id;
      }
      //console.log(this.riskList, this.selectedRisk);
    }
  }*/
  intializeData(controlCategories) {
    if (controlCategories.length > 0) {
      if (this.selectedControlCategory == null) {
        this.selectedControlCategory = controlCategories[0];
        this.changeControlCategory(this.selectedControlCategory);
      } else {
        let categoryId = this.selectedControlCategory.id;
        const categoryindex = this.assessmentData.controlCategories.findIndex(
          (category) => category.id === categoryId
        );
        if (categoryindex != -1) {
          let selectedControlCategory =
            this.selectedRisk.controlCategories[categoryindex];
          this.changeControlCategory(selectedControlCategory);
        }
      }
    }
  }
  createQuestions(selectedControlCategory) {
    this.resetQuestions();
    if (
      selectedControlCategory != null &&
      selectedControlCategory.controlCategoryEffectiveness != null &&
      selectedControlCategory.controlCategoryEffectiveness.length > 0
    ) {
      selectedControlCategory.controlCategoryEffectiveness.forEach((item) => {
        const index = this.questions.findIndex(
          (question) => question.questionId === item.questionId
        );
        if (index != -1) {
          this.questions[index] = item;
        }
      });
    } else {
      this.resetQuestions();
    }
    //console.log(this.questions);
  }

  //check status of question number 5
  checkQuestionFiveInitialStatus(list) {
    list.filter((item: any) => {
      if (item.questionId == 4 && item.choiceId != null) {
        let choice = this.Q4.find((choice) => choice.id === item.choiceId);
        //this.changeQuestionFiveStatus(choice.text);
      }
    });
  }
  changeQuestionFiveStatus(e: any) {
    if (e.value >= 10 && e.value <= 14) {
      const question = {
        questionId: 5,
        choiceId: null,
        response: null,
      };
      const index = this.questions.findIndex(
        (question) => question.questionId === 5
      );
      if (index == -1) {
        this.questions.push(question);
      }
    } else {
      const index = this.questions.findIndex(
        (question) => question.questionId === 5
      );
      if (index != -1) {
        this.questions.splice(index, 1);
      }
    }
  }
  changeControlCategoryStatus(selectedCategory) {
    let question = this.questions.filter((q) => q.questionId == 1);
    let question4 = this.questions.filter((q) => q.questionId == 4);
    if (question[0].choiceIds[0] == "" || question4[0].choiceIds[0] == "") {
      selectedCategory.status = "IN_PROGRESS";
      question[0].isValid = false;
      question4[0].isValid = false;
      this.checkCoordinatorSubmissionStatus();
    } else {
      selectedCategory.status = "COMPLETED";
      question[0].isValid = true;
      question4[0].isValid = true;
    }
  }
  // Check Coordinator submission Status
  checkCoordinatorSubmissionStatus() {
    let errors = 0;
    if (this.assessmentData.controlCategories != null) {
      this.assessmentData.controlCategories.forEach((category: any) => {
        if (category.status != "COMPLETED") {
          errors++;
        }
      });
    }
    //console.log(errors);
    // if all the control categories are addresses , enable coordinator submission
    if (errors === 0) {
      this.enableCoordinatorSubmission = true;
    } else {
      this.enableCoordinatorSubmission = false;
    }
  }

  checkRiskStatus() {
    // commented as per phase 2 req
    /*if(this.assessmentData.risks != null){
       this.showRiskDropdown = false;
      this.assessmentData.risks.forEach((item:any)=>{
        let error = 0;
        item.controlCategories.forEach((category:any)=>{
          if(category.status != 'COMPLETED'){
            error++;
          }
        });
        if(error == 0){
          //for reloading dropdown
          const optionIndex = this.riskList.findIndex(risk => risk.id === item.id);
          if(optionIndex != -1){
            this.riskList[optionIndex].additional.status = 'COMPLETED';
          }
        }else{
          //for reloading dropdown
          const optionIndex = this.riskList.findIndex(risk => risk.id === item.id);
          if(optionIndex != -1){
            this.riskList[optionIndex].additional.status = 'IN_PROGRESS';
          }
        }
      });
      //fix for reloading issue with dropdown
      setTimeout(()=>{
        this.selectedRiskOption = this.selectedRisk.id;
        this.showRiskDropdown = true;
      },100);
    }*/
  }
  //validate answers
  validateAnswers(selectedControlCategory) {
    this.validationErrors = 0;
    selectedControlCategory.controlCategoryEffectiveness.forEach(
      (item: any) => {
        if (item.choiceId == null) {
          this.validationErrors++;
        }
      }
    );
    //console.log('errors', this.validationErrors);
  }
  // if question 1 ans is no, make second question ans default to na
  checkAnswer(value) {
    /*if(value == 2){
      let index = this.questions.findIndex(q=>q.questionId == 2 );
      if(index != -1){
        this.questions[index].choiceIds = ["5"];
      }
    }*/
  }
  //create response
  createResponse() {
    let fileIds = [];
    if (this.isFileUploadRequired == "1") {
      if (this.attachments && this.attachments.length > 0) {
        this.attachments.forEach((attachment) => {
          fileIds.push(attachment.id);
        });
      }
    }

    let response = {
      controlCategoryId: this.selectedControlCategory.id,
      comments: this.comments,
      fileIds: fileIds,
      responseDetails: [],
    };
    this.questions.forEach((q) => {
      let obj: any = {};
      if (q.questionId == 4 && q.choiceIds[0] != null && q.choiceIds[0] != "") {
        obj = {
          questionId: q.questionId,
          choiceId: q.choiceIds[0],
          comments: q.response,
          fileIds: [],
        };
        if (q.attachments.length > 0) {
          q.attachments.forEach((attachment) => {
            obj.fileIds.push(attachment.id);
          });
        }
        response.responseDetails.push(obj);
      } else if (q.questionId == 5) {
        obj = {
          questionId: q.questionId,
          comments: q.response,
        };
        response.responseDetails.push(obj);
      } else if (
        (q.questionId != 5 || q.questionId != 4) &&
        q.choiceIds[0] != null &&
        q.choiceIds[0] != ""
      ) {
        obj = {
          questionId: q.questionId,
          choiceId: q.choiceIds[0],
          comments: q.response,
        };
        response.responseDetails.push(obj);
      }
    });
    return response;
  }
  //save control Procedures
  saveControlProcedures(type, data) {
    //this.validateAnswers(this.selectedControlCategory);
    let response = this.createResponse();
    console.log(response);
    if (response.responseDetails.length > 0) {
      this.appSpinnerService.display(true);
      this.rcsaService.saveAssessment(this.rcsaId, response).subscribe(
        (responseData: any) => {
          if (responseData) {
            this.assessmentData = responseData;
            this.checkCoordinatorSubmissionStatus();
              if(type == "changeControlCategory"){
                this.changeControlCategory(this.assessmentData.controlCategories[data]);
              }else if (this.assessmentData.controlCategories) {
                let value = this.assessmentData.controlCategories.findIndex(
                  (cc) => {
                    return cc.id == this.selectedControlCategory.id;
                  }
                );
                if (value <= this.assessmentData.controlCategories.length-2) {
                  this.changeControlCategory(
                    this.assessmentData.controlCategories[value+1]
                  );
                } 
              }
          }
        },
        (error: any) => {
          this.appSpinnerService.display(false);
          //this.errorModalMsg = 'Something Went wrong, Please try again !';
          //this.errorModal.show();
        },
        () => {
          this.appSpinnerService.display(false);
        }
      );
    } else if(data != undefined && data != null) {
        this.changeControlCategory(this.assessmentData.controlCategories[data]);
      }else{
        let value = this.assessmentData.controlCategories.findIndex(
          (cc) => {
            return cc.id == this.selectedControlCategory.id;
          }
        );
        if (value <= this.assessmentData.controlCategories.length-2) {
          this.changeControlCategory(
            this.assessmentData.controlCategories[value+1]
          );
        }
      }
  }
  //upload file
  uploadattachment(event) {
    this.appSpinnerService.display(true);
    //console.log('files', event.target.files);
    const files = event.target.files;
    this.rcsaService.addAttachment(this.rcsaId, files).subscribe(
      (responseData: any) => {
        if (responseData) {
          responseData.attachments.forEach((file: any) => {
            if(!this.attachments){
              this.attachments = [];
            }
            this.attachments.push(file);
          });
        }
      },
      (error: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }
  deleteattachment(fileiId) {
    this.rcsaService.deleteAttachment(this.rcsaId, fileiId).subscribe(
      (responseData: any) => {
        if (responseData) {
          //console.log(responseData);
          if (responseData) {
            let index = this.attachments.findIndex(
              (attachement) => attachement.id === fileiId
            );
            if (index != -1) {
              this.attachments.splice(index, 1);
            }
          }
        }
      },
      (error: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }
  downloadAttachment(fileId, fileName, fileType) {
    this.rcsaService.downloadAttachment(this.rcsaId, fileId).subscribe(
      (responseData: any) => {
        if (responseData) {
          //console.log(responseData.url);
          this.downloadFile(responseData, fileName, fileType);
        }
      },
      (error: any) => {},
      () => {}
    );
  }
  downloadFile(data, fileName, fileType) {
    // Default mime type
    //console.log(data);
    //const octetStreamMime = 'application/octet-stream';
    //const blob = new Blob([data._body], { type: octetStreamMime });
    const blob = data.blob();
    saveAs(blob, fileName);
  }
  getAssessmentData() {
    this.appSpinnerService.display(true);
    this.rcsaService.fetchAssessorData(this.rcsaId).subscribe(
      (responseData: any) => {
        console.log("reloaded");
        if (
          responseData.progressStatus != null &&
          responseData.progressStatus == "COMPLETED"
        ) {
          this.rcsaStatusMessage =
            "The RCSA you are trying to access is closed";
          this.rcsaStartStatus = false;
        } else {
          this.rcsaStartStatus = true;
          this.assessmentData = responseData;
          // this.createOptionsData(this.assessmentData.risks); // commented as per phase 2 req
          this.intializeData(this.assessmentData.controlCategories);
          this.checkCoordinatorSubmissionStatus();
        }
      },
      (error: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }
  // Final submit to coordinator
  submitToCoordinator() {
    this.appSpinnerService.display(true);
    this.rcsaService.submitAssessment(this.rcsaId).subscribe(
      (responseData: any) => {
        console.log("responseData");
        //this.successModalMsg = 'Submitted Successfully';
        //this.successModal.show();
        if (responseData != null && responseData == "COMPLETED") {
          this.rcsaStatusMessage = "Thank you for submitting your responses.";
          this.rcsaStartStatus = false;
        }
        //this.getAssessmentData();
      },
      (error: any) => {
        this.appSpinnerService.display(false);
        //this.errorModalMsg = 'Something Went wrong, Please try again !';
        //this.errorModal.show();
      },
      () => {
        this.appSpinnerService.display(false);
      }
    );
  }
  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.rcsaId = params["rcsaId"];
      console.log(this.rcsaId);
      //this.rcsaId = 'M2U4ZTQxNGUtMzkzOS00YjBkLTkxZGQtNjQxYTc0NmE3YjMxOlNLTlExUkNTQUEy';
      //M2U4ZTQxNGUtMzkzOS00YjBkLTkxZGQtNjQxYTc0NmE3YjMxOlNLTlExUkNTQUEy
    });
    //reset all questions
    this.resetQuestions();
    //fetch assessment data from service
    this.getAssessmentData();

    /*this.options = {
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    }*/
    this.QOptions = {
      placeholder: { id: "", text: "Select" },
    };

    this.fileUploadOptions = [
      {
        id: 1,
        text: "Yes",
      },
      {
        id: 2,
        text: "No",
      },
    ];
    this.Q1 = [
      {
        id: 1,
        text: "Yes",
        parentQId: 1,
      },
      {
        id: 2,
        text: "No",
        parentQId: 1,
      },
    ];

    this.Q2 = [
      {
        id: 3,
        text: "Yes",
        parentQId: 2,
      },
      {
        id: 4,
        text: "No",
        parentQId: 2,
      },
      {
        id: 5,
        text: "NA",
        parentQId: 2,
      },
    ];
    this.Q3 = [
      {
        id: 6,
        text: "NA",
        parentQId: 3,
      },
      {
        id: 7,
        text: "Control Fail",
        parentQId: 3,
      },
      {
        id: 8,
        text: "No Control",
        parentQId: 3,
      },
      {
        id: 9,
        text: "One-off Exception",
        parentQId: 3,
      },
    ];
    this.Q4 = [
      {
        id: 10,
        text: "0",
        parentQId: 4,
      },
      {
        id: 11,
        text: "1",
        parentQId: 4,
      },
      {
        id: 12,
        text: "2",
        parentQId: 4,
      },
      {
        id: 13,
        text: "3",
        parentQId: 4,
      },
      {
        id: 14,
        text: "4",
        parentQId: 4,
      },
      {
        id: 15,
        text: "5",
        parentQId: 4,
      },
      {
        id: 16,
        text: "6",
        parentQId: 4,
      },
      {
        id: 17,
        text: "7",
        parentQId: 4,
      },
      {
        id: 18,
        text: "8",
        parentQId: 4,
      },
      {
        id: 19,
        text: "9",
        parentQId: 4,
      },
      {
        id: 20,
        text: "10",
        parentQId: 4,
      },
    ];
  }
}
