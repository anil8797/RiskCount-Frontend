import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {AppSpinnerService} from "../services/common/app-spinner";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector : Injector,
    private router   : Router
  ){}


  //INTERCEPTOR CODED FOR API CALLS----------------------------------------------------
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let authToken = JSON.parse(localStorage.getItem('loggedInUserObject')).authToken ? JSON.parse(localStorage.getItem('loggedInUserObject')).authToken : '';
    let auth       = this.injector.get(AuthenticationService);
    let userObj    = JSON.parse(localStorage.getItem('loggedInUserObject'));
    let authToken  = userObj ? userObj.token : '';
    let isLoginApi = request.url.indexOf("/api/user/login") > 0 ? true : false;
    let isLogoutApi = request.url.indexOf("/logout") > 0 ? true : false;
    let headerWithoutInterceptor = false;
    if(request.url.indexOf("/api/user/login") > 0 || request.url.indexOf("/logout") > 0 || request.url.indexOf("/api/user/generateResetPassword") > 0 || request.url.indexOf("api/user/updatePassword") > 0){
      headerWithoutInterceptor = true;
    }else{
      headerWithoutInterceptor = false;
    }
    let newRequest;
    if(headerWithoutInterceptor){
      newRequest = request.clone({

      });
    }else{
      newRequest = request.clone({
        setHeaders: {
          'X-Auth-Token' : authToken,
          'X-TenantID' : userObj.user.guid
        }
      });
    }


    return next.handle(newRequest).do(
      (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          console.log("User is authorized!"); //if authorized
        }
      },
      (err: HttpErrorResponse) => {
        //if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login
            //auth.logout();
            //this.router.navigate(["/login"]);
          }
        if (err.status === 403) {
          // redirect to the login
          auth.logoutFromLocalStorage();
          this.router.navigate(["/login"]);
        }
        //}
      },
      () => {}
    ).catch((err: HttpErrorResponse) => {
      if(err.status >= 200 && err.status < 300) {
        const res = new HttpResponse({
          body       : null,
          headers    : err.headers,
          status     : err.status,
          statusText : err.statusText,
          url        : err.url
        });
        return Observable.of(res);
      }
      else {
        return Observable.throw(err);
      }
    });
  }


}
