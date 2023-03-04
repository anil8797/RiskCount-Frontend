import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'app/services/common/app-spinner';
import { RcsaService } from 'app/services/rcsa/rcsa.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-manage-rcm',
  templateUrl: './manage-rcm.component.html',
  styleUrls: ['./manage-rcm.component.scss']
})
export class ManageRcmComponent implements OnInit {
  rcmList = [];
  showNotificationAlter = false;
  constructor(private rcsaService : RcsaService,
    private appSpinnerService: AppSpinnerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllRCMs();
  }

  getAllRCMs(){
    this.rcsaService.getAllRCMs().subscribe((response)=>{
      console.log(response);
      this.rcmList = response;
    });
  }
  reset(rcsaId){
    this.appSpinnerService.display(true);
    this.rcsaService.resetRcm(rcsaId).subscribe((response)=>{
      console.log(response);
      this.rcmList = response;
      this.appSpinnerService.display(false);
      this.getAllRCMs();
      this.showNotificationAlter = true;
    });
  }
  confirm(rcsaId) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.reset(rcsaId)
        }
    });
  } 

}
