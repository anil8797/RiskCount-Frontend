import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSpinnerService} from "../../../services/common/app-spinner";
import {RcsaService} from "../../../services/rcsa/rcsa.service";

@Component({
  selector: 'app-rcsa-assigned-oustanding-remediations',
  templateUrl: './rcsa-assigned-oustanding-remediations.component.html',
  styleUrls: ['./rcsa-assigned-oustanding-remediations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RcsaAssignedOustandingRemediationsComponent implements OnInit {
  public today:any;
  public assignedOutstandingRemediations: any;
  public options:any;
  public bfu_status_list:any;
  public selectedBfu:any;
  constructor(
    private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
  ) {
    this.options = {};
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
  }
  // change bfu status
  changeBfuStatus(value, row){
    let index = this.bfu_status_list.findIndex(bfu=>bfu.id == value);
    if(index != -1){
      row.businessFunctionalUnitStatusDisplayName = this.bfu_status_list[index].text;
    }
  }
  //create data to include bfu status display name
  createAssignedRemediationData(data){
    if(data.remediations !=null){
      data.remediations.forEach(bfu=>{
        let index = this.bfu_status_list.findIndex(bfuList=>bfuList.id == bfu.remediationUnitStatus);
        if(index != -1){
          bfu.businessFunctionalUnitStatusDisplayName = this.bfu_status_list[index].text;
        }
      })
    };
    this.assignedOutstandingRemediations = data;
    console.log(this.assignedOutstandingRemediations);
    this.appSpinnerService.display(false);
  }
 //get outstanding remediations from service
  getOutstandingremediations(){
    this.rcsaService.fetchRemediationCoordinatorSummary().subscribe(
      (responseData:any)=>{
        if(responseData != null){
          this.createAssignedRemediationData(responseData);
        }
      },
      (error:any)=>{

      },
      ()=>{

      }
    )
  }
  //save bfu status
  saveBfuStatus(rowData){
    this.appSpinnerService.display(true);
    let obj = {
      remediationId : rowData.remediationId,
      remediationUnitStatus : rowData.businessFunctionalUnitStatus
    }
    console.log('for saving' ,obj);
    this.rcsaService.updateRemediationCoordinatorSummary(obj).subscribe(
      (responseData:any)=>{
        console.log('success');
        this.cancelEditRow(rowData);
        this.appSpinnerService.display(true);
        this.getOutstandingremediations();
      },
      (error:any)=>{

      },
      ()=>{
        this.appSpinnerService.display(false);
      }
    );
  }
  editRow(row) {
    row.isEditable=true;
  }
  cancelEditRow(row) {
    row.isEditable=false;
  }
  ngOnInit() {
    this.appSpinnerService.display(true);
    this.getOutstandingremediations();
    this.today = new Date();
  }

}
