import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppSpinnerService} from '../../services/common/app-spinner';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataTransferService} from "../../services/data-transfer/data-transfer.service";
import {ISubscription, Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-rcsa',
  templateUrl: './rcsa.component.html',
  styleUrls: ['./rcsa.component.scss']
})
export class RcsaComponent implements OnInit {
  private subscription: Subscription;
  public userObj : any;
  public viewsObj : any = [];
  public viewLink : string;
  private currentUrl:any;
  constructor(    private authentication : AuthenticationService,
                  private router         : Router,
                  private activateRoute  : ActivatedRoute,
                  private appSpinner     : AppSpinnerService,
                  private dataTransferService: DataTransferService
            ) {}

  /*checkStatus(view){
    let activeSubmenu = 0;
    if(view.children != null && view.children.length > 0){
        view.children.forEach(
          child=>{
            let url = '/rcsa/' + child.routerLink;
            console.log(this.router.url, url )
            if(url == this.router.url ){
              activeSubmenu++;
            }
          }
        )
    }
    if(activeSubmenu > 0){
      return true;
    }
    else{
      return false;
    }
    //[class.activeSubmenu]="checkStatus(view)"
  }*/

  ngOnInit() {
    this.subscription = this.dataTransferService.getUserData().subscribe((user:any) =>{
        this.userObj = user
        //console.log('checkinggggg',this.userObj);
     });
        let tempViewArr = [];
        if(this.userObj.user != null){
          for(let app of this.userObj.user.apps){
            for(let role of app.roles){
              for(let view of role.views){
                tempViewArr.push(view);
                if(!this.viewLink){
                  this.viewLink = view.routerLink;
                }
              }
            }
            this.viewsObj= tempViewArr.filter((tempViewArr, index, self) =>
              index === self.findIndex((t) => (t.save === tempViewArr.save && t.id === tempViewArr.id
              )));
          }
        }

        //this.viewsObj = this.userObj.user.apps[0].roles[0].views;
        this.router.navigate(["rcsa/",this.viewLink]);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
