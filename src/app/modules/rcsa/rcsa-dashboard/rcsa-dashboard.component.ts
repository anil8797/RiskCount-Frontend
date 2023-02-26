import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSpinnerService} from '../../../services/common/app-spinner';
import {Observable} from "rxjs/Observable";
import {Select2OptionData} from "ng2-select2";
import {RcsaService} from "../../../services/rcsa/rcsa.service";

@Component({
  selector: 'app-rcsa-dashboard',
  templateUrl: './rcsa-dashboard.component.html',
  styleUrls: ['./rcsa-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaDashboardComponent implements OnInit {
  public userObj : any;
  public userRole:any;
  public selectedRiskUnit:any;
  public riskList:Observable<Array<Select2OptionData>>;
  public showNotificationAlter = false;

  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {

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
    this.appSpinnerService.display(false);
  }
  //get rcsa units from service
  getRcsaUnits(){
    this.rcsaService.getAllrcsaUnits().subscribe(
      (responseData:any)=>{
        console.log('All business Units :' , responseData);
        if(responseData && responseData.length>0){
          this.selectedRiskUnit = responseData[0].id;
          //this.getBusinessFunctionUnitData(this.selectedRiskUnit);
          this.createRiskOptions(responseData);
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
  //get rcsa units from service
  getAllRcsaUnits(){
    this.rcsaService.fetchRcsaUnitsForDashboard().subscribe(
      (responseData:any)=>{
        console.log('All RCSA Units for ERM Rcsa Units :' , responseData);
        if(responseData && responseData.length>0){
          this.selectedRiskUnit = responseData[0].id;
          //this.getBusinessFunctionUnitData(this.selectedRiskUnit);
          this.createRiskOptions(responseData);
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
  ngOnInit() {
    this.appSpinnerService.display(true);
    this.userObj = JSON.parse(localStorage.getItem('loggedInUserObject'));
    if(this.userObj != null && this.userObj.user.apps != null){
      this.userObj.user.apps.forEach(app=>{
        if(app.id == 1){
          let currentApp = app;
          this.userRole = currentApp.roles[0];
          console.log(this.userRole);
        }
      })
    }
    // checking if user ie ERM -  there is an issue with role definition/login - need to recheck
    if(this.userRole != null && this.userRole.id == 4){
      this.getAllRcsaUnits();
    }else{
      this.getRcsaUnits();
    }
    this.getDashboardData();
  }

  unitRiskMangerDashboardStatusDTOs = []
  getDashboardData(){
    this.rcsaService.fetchUnitRiskManagerDashboardData().subscribe((response)=>{
      console.log(response);
      this.unitRiskMangerDashboardStatusDTOs = response.assessmentDashboardStatusDTOs;
    });
  }
  sendReminder(rcsaId){
    let obj ={
      "rcsaId": rcsaId,
      "notifyRiskCoordinator": true
    }
    this.appSpinnerService.display(true);
    this.rcsaService.sendReminder(obj).subscribe(
      (responseData:any)=>{
        console.log(responseData);
        this.showNotificationAlter = true;
        this.getDashboardData();
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
