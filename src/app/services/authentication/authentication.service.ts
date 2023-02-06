import { Injectable } from '@angular/core';
import {Http , Response} from "@angular/http";
import {AppConfig} from "../../utils/app-config.module";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {  HttpClient,  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {AppSpinnerService} from "../common/app-spinner";

@Injectable()
export class AuthenticationService {
  //urlToAuthenticate:any = this.hostUrl+'authenticateUser?user_name=';
  hostUrl: any               = AppConfig.apiEndPoint;
  urlToAuthenticate:any      = this.hostUrl+'api/user/login';
  urlToLogout:any      = this.hostUrl+'logout';
  urlToInitiatePswdReset:any = this.hostUrl+'api/user/generateResetPassword?emailId=';
  urlToResetPassword:any     = this.hostUrl+'api/user/updatePassword';
  urlToGetSelfDetails:any    = this.hostUrl+'api/user/login';

  public token: string;
  constructor(
    //private http: Http
    private http       : HttpClient,
    private appSpinner : AppSpinnerService
  ) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('loggedInUserObject'));
    this.token      = currentUser && currentUser.token;
  }

  private extractData(res: Response) {
    const contentType = res.headers.get('Content-type');
    console.log("Content-Type::>", contentType);
    if(contentType === 'application/json') {
      console.log("Application-JSON::>", res);
      return res.json();
    }
    else if(contentType === 'application/text' || contentType === 'text/plain') {
      console.log("Application-TEXT::>",res);
      return res.text();
    }
    else{
      return res;
    }
  }

  // with interceptor
  login(username: string, password: string): Observable<any> {
    let userObject: any = { userName: username, password: password };
    return this.http
      .post(this.urlToAuthenticate, userObject)
      .map((response:any) => {
        let token = response.token;
        if(token){
          // store username and  token in local storage
          localStorage.setItem('loggedInUserObject', JSON.stringify(response));
          // return true for successful login
          return true;
        } else {
          // return false for  failed login
          return false;
        }
      }
    );
  }

  /*login(username: string, password: string): Observable<boolean> {
    return this.http.get(this.urlToAuthenticate + username + '&passwrd=' + password)
      .map((response: Response) => {
        if (this.extractData(response).user_id) {
          let loggedInUser = response.json();
          let userObj      = {
            "clientId"   : 10001,
            "userId"     : loggedInUser.user_id,
            "roleObject" : {
              "id"          : loggedInUser.role_id,
              "role"        : loggedInUser.role_name
            },
            "name"       : loggedInUser.name,
            "userName"   : username
          }
          // store username and  token in local storage
          localStorage.setItem('loggedInUserObject', JSON.stringify(userObj));
          // return true for successful login
          return true;
        }
        else {
          // return false for  failed login
          return false;
        }
      });
  }*/

  logoutFromLocalStorage(): void {
    // clear token remove user from local storage
    this.token = null;
    localStorage.removeItem('loggedInUserObject');
    localStorage.clear();
    this.appSpinner.display(false);

  }

  logout(): Observable<any> {
    return this.http.get(this.urlToLogout).map((response: any) => response);
  }

  initiateReset(userEmail: string): Observable<any> {
    return this.http
      .post(this.urlToInitiatePswdReset + userEmail, {})
      .map((response:any) => response
      );
  }

  resetPassword(newPassword: string, token: string) : Observable<any> {
    let userCred:any = {
      "token" : token,
      "password" : newPassword
    }
    return this.http
      .post(this.urlToResetPassword, userCred)
      .map((response:any) => response
      );
  }

  getMe(): Observable<any>{
    let userObj: any;
    return this.http.get(this.urlToGetSelfDetails).map(
      (response: any) => {
        let loggedInUser = response;
        userObj      = {
          "clientId"   : loggedInUser.client_id,
          "clientName" : loggedInUser.client_name,
          "userId"     : loggedInUser.user_id,
          "roleObject" : {
            "id"              : loggedInUser.role_id,
            "isAdmin"         : loggedInUser.is_admin,
            "isPrimary"       : loggedInUser.is_primary_user,
            "isPlatformUser"  : loggedInUser.is_platform_admin,
            "role"            : loggedInUser.role_name,
            "roleId"          : loggedInUser.role_identifier,
            "roleDisplayName" : loggedInUser.role_display_name
          },
          "name"       : loggedInUser.name,
          "userName"   : loggedInUser.email
        };
        return userObj;
      }
    );
  }
}
