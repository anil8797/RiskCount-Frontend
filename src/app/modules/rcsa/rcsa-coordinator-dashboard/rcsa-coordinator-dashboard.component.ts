import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'app/services/common/app-spinner';
import { RcsaService } from 'app/services/rcsa/rcsa.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-rcsa-coordinator-dashboard',
  templateUrl: './rcsa-coordinator-dashboard.component.html',
  styleUrls: ['./rcsa-coordinator-dashboard.component.scss']
})
export class RcsaCoordinatorDashboardComponent implements OnInit {
  assessmentDashboardStatusDTOs = []
  showNotificationAlter = false;
  constructor(
    private rcsaService: RcsaService,
    private confirmationService: ConfirmationService,
    private appSpinnerService : AppSpinnerService,

    ) { }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.rcsaService.fetchCoordinatorDashboardData().subscribe((response)=>{
      console.log(response);
      this.assessmentDashboardStatusDTOs = response.assessmentDashboardStatusDTOs;
    })
  }

  sendReminder(rcsaId) {
    let obj = {
      "rcsaId": Number(rcsaId),
      "notifyRiskCoordinator": false
    }
    this.appSpinnerService.display(true);
    this.rcsaService.sendReminder(obj).subscribe(
      (responseData: any) => {
        this.getDashboardData();
        this.showNotificationAlter= true;
      },
      (error: any) => {
        this.appSpinnerService.display(false);
      },
      () => {
        this.appSpinnerService.display(false);
      }
    )
  }
}
