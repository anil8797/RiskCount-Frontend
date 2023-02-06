import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from '@angular/router';
import {AppSpinnerService} from '../../services/common/app-spinner';
import {DataTransferService} from "../../services/data-transfer/data-transfer.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public userObj : any;
  public currentYear:any;
  constructor(
    private authentication : AuthenticationService,
    private router         : Router,
    private appSpinner     : AppSpinnerService,
    private dataTransferService: DataTransferService
  ) { }

  //LOGOUT
  logout(){

    this.authentication.logout().subscribe(
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
    localStorage.clear();
    this.router.navigate(['/login']);
    this.appSpinner.display(false);

  }


  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
    this.userObj = JSON.parse(localStorage.getItem('loggedInUserObject'));
    //console.log('s', this.userObj);
    this.dataTransferService.changeUser(this.userObj);
    /*this.authentication.getMe().subscribe(
      (response: any) => {
        this.loggedUser = response;
      },
      (errorData: any) => {
        console.log("Error in fetching logged in user details!", errorData);
      },
      () => {
        console.log("Fetched Logged User!");
      }
    );*/
  }

}
