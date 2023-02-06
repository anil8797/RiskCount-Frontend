import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AppSpinnerService} from "../../services/common/app-spinner";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public errorMessage:any;
  public showError:any = false;
  public resetSuccess:any = false;
  public successMessage:any = "";
  public token:any;
  public userCreds: any  = {
    newPassword  : "",
    confirmPassword : ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinnerService: AppSpinnerService,
    private router: Router,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
	  // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  backtoLogin(){
    this.router.navigate(['/login']);
  }

  resetPassword(isValid: boolean){
    this.spinnerService.display(true);
    let pwd: any = this.userCreds.newPassword;
    this.authenticationService.resetPassword(pwd, this.token).subscribe(
      (responseData:any)=>{
          this.spinnerService.display(false);
          this.resetSuccess = true;
          this.successMessage = "Password changed successfully.";
      },
      (errorData)=>{
          this.spinnerService.display(false);
          this.errorMessage = JSON.parse(errorData.error).error.message;
          this.showError = true;
          console.log(errorData.error);
      },
      ()=>{
      }
    )
  }
}
