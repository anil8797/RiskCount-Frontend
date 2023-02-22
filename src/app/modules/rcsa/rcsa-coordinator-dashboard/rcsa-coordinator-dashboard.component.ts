import { Component, OnInit } from '@angular/core';
import { RcsaService } from 'app/services/rcsa/rcsa.service';

@Component({
  selector: 'app-rcsa-coordinator-dashboard',
  templateUrl: './rcsa-coordinator-dashboard.component.html',
  styleUrls: ['./rcsa-coordinator-dashboard.component.scss']
})
export class RcsaCoordinatorDashboardComponent implements OnInit {
  assessmentDashboardStatusDTOs = []
  constructor(
    private rcsaService: RcsaService) { }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.rcsaService.fetchCoordinatorDashboardData().subscribe((response)=>{
      console.log(response);
      this.assessmentDashboardStatusDTOs = response.assessmentDashboardStatusDTOs;
    })
  }
}
