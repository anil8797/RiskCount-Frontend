import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppSpinnerService} from "../../services/common/app-spinner";
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl:string;
  public showLogin:boolean;
  public userObject: any = [];
  public errorMessage:any;
  public showError:any = false;
  public showSuccess:any = true;
  public viewLink : string;
  public userCreds: any  = {
    userEmail : "",
    password  : ""
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: AppSpinnerService,
    private authenticationService :AuthenticationService
  ){
    this.showLogin = true;
  }

  //Show Reset Password Screen
  showResetPassword(){
    this.showLogin = false;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = "";
  }
  hideResetPassword(){
    this.showLogin = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = "";
  }

  //USER-LOGIN---------------------------------------------------
  login(){
    this.spinnerService.display(true);
    let pwd: any      = this.userCreds.password;
    let username :any = this.userCreds.userEmail.toLowerCase();
    this.authenticationService.login(username , pwd).subscribe(
      (responseData:any)=>{
        if(responseData != null){
          this.userObject = JSON.parse(localStorage.getItem('loggedInUserObject'));
          //this.router.navigate([this.returnUrl]);
          let tempViewArr = [];
          for(let app of this.userObject.user.apps){
            for(let role of app.roles){
              for(let view of role.views){
                tempViewArr.push(view);
                if(!this.viewLink){
                  this.viewLink = view.routerLink;
                }
              }
            }
          }

          //this.viewsObj = this.userObj.user.apps[0].roles[0].views;
          this.router.navigate(["rcsa/",this.viewLink]);
          //this.router.navigate(["rcsa/",this.userObject.user.apps[0].roles[0].views[0].routerLink]);

        }else{
          this.spinnerService.display(false);
          this.router.navigate(['/login']);
        }
      },
      (errorData)=>{
          console.log(errorData.error);
          let response = JSON.parse(errorData.error);
          this.errorMessage  = response.message;
          this.showError = true;
          this.spinnerService.display(false);
      },
      ()=>{
        this.spinnerService.display(false);
      }
    );
  }


  initiateReset(){
    this.spinnerService.display(true);
    let username :any = this.userCreds.userEmail.toLowerCase();
    this.authenticationService.initiateReset(username).subscribe(
      (responseData:any)=>{
          this.spinnerService.display(false);
            this.showError = false;
            this.showSuccess = true;
            this.errorMessage = "An email has been sent to " + username+ ". Please use the link to reset your password.";
            //this.showLogin = true;
          // reset to normal login after showing the message.
      },
      (errorData)=>{
          this.spinnerService.display(false);
          this.errorMessage = JSON.parse(errorData.error).message;
          this.showError = true;
          console.log(errorData.error);
      },
      ()=>{

      }
    );
  }

  //User-Data-Fetch ---------------------------------------------
  /* fetchUserData(){
    this.creditRiskService.fetchJsonData('user-model.json').subscribe(
      (resultData: any) => {
        this.userObjects = resultData;
      },
      (errorData: any) => {
        console.log("Error in User-Modal Fetch!", errorData);
      },
      () => {
        console.log("User-Modal Fetched ::> ", this.userObjects);
      }
    );
  }*/

  ngOnInit() {
    //Get the query params
    this.route.queryParams.subscribe(
      (params: any) => {
        this.returnUrl = (params['returnUrl'] || '/rcsa');
      }
    );
  }

}
