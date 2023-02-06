import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Select2OptionData} from "ng2-select2";
import {AppSharedService} from "../../../services/common/app-shared.service";
import {RcsaService} from "../../../services/rcsa/rcsa.service";
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {ModalDirective} from "ngx-bootstrap";
import {DataTransferService} from "../../../services/data-transfer/data-transfer.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rcsa-set-up',
  templateUrl: './rcsa-start-new.component.html',
  styleUrls: ['./rcsa-start-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaStartNewComponent implements OnInit {
  // logged in user info
  private userObj:any = {};

  @ViewChild('error') public errorModal: ModalDirective;
  errorModalMsg: any;  // Error-Modal-Msg
  // declarations for ng select2
  public quarterList: Array<Select2OptionData>;
  public selectedQuarter:any;
  public options: Select2Options;
  public rcsaStartDate:any;
  public rcsaEndDate:any;
  public reminderDateAssessor:any;
  public reminderDateCordinator:any;
  public yearList:any = [];
  public selectedYear:any;
  public defaultDate:any;
  // declarations
  public today:any;
  public rcsaMinDate:any;
  public showErrors:boolean = false;
  public rcsaUnitlist:any = [];
  public showRcsaUnitError:boolean = false;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private dataTransferService : DataTransferService,
    private _router: Router,
    private  datepipe:DatePipe
  ) {
    this.today = new Date();
    this.rcsaMinDate = new Date();
    // this.rcsaMinDate.setDate(this.rcsaMinDate.getDate() + 1);
    // year dropdown dummy data
    this.yearList = [
      {
        value:this.today.getFullYear()
      },
      {
        value:this.today.getFullYear() + 1
      }
    ];
    this.selectedYear = this.yearList[0];
    // quarter dropdown dummy data
    this.quarterList = [
      { id: '', text: 'Empty'},
      {
        id: '1',
        text: 'First Quarter'
      },
      {
        id: '2',
        text: 'Second Quarter'
      },
      {
        id: '3',
        text: 'Third Quarter'
      },
      {
        id: '4',
        text: 'Fourth Quarter'
      }
    ];
    this.selectedQuarter = this.getSelectedQuarter();
    this.options = {
      placeholder: { id: '', text: 'Select Quarter' }
    };
    // set default date for the end date
    this.defaultDate = new Date();
    this.defaultDate.setDate( this.defaultDate.getDate() + 30);
  }
  //validations
  validateFields(){
    let errors = 0;
    if(this.rcsaStartDate == null || this.rcsaStartDate ==""){
      errors ++;
      this.showErrors = true;
      return errors;
    }
    else if(this.rcsaEndDate == null || this.rcsaEndDate =="" || this.rcsaEndDate < this.rcsaStartDate){
      errors ++;
      this.showErrors = true;
      return errors;
    }
    else if(this.reminderDateAssessor == null || this.reminderDateAssessor =="" || this.reminderDateAssessor < this.rcsaStartDate || this.reminderDateAssessor > this.rcsaEndDate){
      errors ++;
      this.showErrors = true;
      return errors;
    }
    else if(this.reminderDateCordinator == null || this.reminderDateCordinator =="" || this.reminderDateCordinator < this.rcsaStartDate || this.reminderDateCordinator > this.rcsaEndDate){
      errors ++;
      this.showErrors = true;
      return errors;
    }
    return errors;
  }
  validateRiskUnits(){
    let isSelected: any = this.rcsaUnitlist.filter((item) => item.checked === true);
    if(isSelected != null && isSelected.length > 0) {
      console.log(isSelected);
      this.showRcsaUnitError = false;
      let arrayToSubmit = []
      isSelected.filter((item) => {
        arrayToSubmit.push(item.id);
      });
      return arrayToSubmit;
    }else {
      this.showRcsaUnitError = true;
      return [];
    }
  }
  //reset fields after saving
  resetFields(){
    this.reminderDateAssessor = null;
    this.reminderDateCordinator = null;
    this.rcsaStartDate = null;
    this.rcsaEndDate = null;
    this.showErrors = false;
  }
  // find selected quarter
  getSelectedQuarter(){
    let currentMonth = this.today.getMonth();
    let currentQuarter = 1;
    if(currentMonth <=2){
      currentQuarter = 1;
    }else if(currentMonth >=3 && currentMonth <= 5){
      currentQuarter = 2;
    }else if(currentMonth >=6 && currentMonth <= 8) {
      currentQuarter = 3;
    }else if(currentMonth >=9 && currentMonth <= 11) {
      currentQuarter = 4;
    }
    return this.quarterList[currentQuarter];
  }
  // Change year
  changeYear(year){
    this.selectedYear = year;
  }
  // Change Quarter
  changeQuater(e){
    console.log(e);
    this.selectedQuarter = e.data[0];
  }
  fetchAssociatedRisks(){
    this.rcsaService.fetchAssociatedRisks().subscribe(
      (responseData:any)=>{
          if(responseData && responseData.length > 0){
            this.rcsaUnitlist = responseData;
            this.rcsaUnitlist.filter(item=>{
              if(item.assessorsPresent){
                item.checked = true;
              }else{
                item.checked = false;
              }
            })
          }else{
            this.changeStartNewRcsaTabStatus();
            this.rcsaUnitlist = [];
          }
      },
      (error:any)=>{

      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    )
  }
  changeStartNewRcsaTabStatus(){
    this.dataTransferService.loggedInUserObject.subscribe(user => this.userObj = user);
    let currentRoute = this._router.url;
    this.userObj.user.apps.forEach(
      app=>{
        if(app.routerLink == 'rcsa'){
          // check unit rm manager
          if(app.roles[0].id == 3){
            let views = app.roles[0].views;
            views.forEach(view=>{
              if(view.children != null && view.children.length > 0){
                view.children.forEach(submenu=>{
                  //if(currentRoute == ('/rcsa/'+view.routerLink+'/'+submenu.routerLink)){
                  if(submenu.routerLink == 'start-new-rcsa'){
                    submenu.enabled = false;
                    this.dataTransferService.changeUser(this.userObj);
                    this._router.navigate(['/rcsa/rcsa-view/unit-rm-view'])
                  }
                })
              }
            })
          }
        }
      }
    )
  }
  startRcsa(){
    let errors = this.validateFields();
    let unitRisks = this.validateRiskUnits();
    console.log(errors,unitRisks);
    if(errors == 0 && unitRisks.length > 0){
      this.appSpinnerService.display(true);
      /*let obj = {
        "startDate": this.rcsaStartDate.getTime(),
        "endDate": this.rcsaEndDate.getTime(),
        "quarter": Number(this.selectedQuarter.id),
        "year": this.selectedYear.value,
        "assessorReminderDate": this.reminderDateAssessor.getTime(),
        "coordinatorReminderDate": this.reminderDateCordinator.getTime(),
        "rcsaUnitIds": unitRisks
      };*/
      let obj = {
        "startDate": this.getUtcTimeZone(this.rcsaStartDate),
        "endDate": this.getUtcTimeZone(this.rcsaEndDate),
        "quarter": Number(this.selectedQuarter.id),
        "year": this.selectedYear.value,
        "assessorReminderDate": this.getUtcTimeZone(this.reminderDateAssessor),
        "coordinatorReminderDate": this.getUtcTimeZone(this.reminderDateCordinator),
        "rcsaUnitIds": unitRisks
      };
      console.log(obj);
      this.appSpinnerService.display(false);
      this.rcsaService.startRcsa(obj).subscribe(
        (responseData:any)=>{
          this.appSpinnerService.display(true);
          this.fetchAssociatedRisks();
          this.resetFields();
        },
        (errorData:any)=>{
          if(errorData){
            let error = JSON.parse(errorData.error);
            if(error.risks && error.risks.length>0){
              this.errorModalMsg = error;
              this.errorModal.show();
            }
          }
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
  dummy(){
    console.log('rcsa', this.rcsaStartDate, this.rcsaEndDate, this.getUtcTimeZone(this.rcsaStartDate));
  }

  ngOnInit() {
    this.appSpinnerService.display(true);
    this.fetchAssociatedRisks();
  }

}
