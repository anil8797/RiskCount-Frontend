import { Injectable } from '@angular/core';
import {AppConfig} from "../../utils/app-config.module";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DataTransferService {

  private loggedInUserObjectSource = new BehaviorSubject(JSON.parse(localStorage.getItem('loggedInUserObject')));
  loggedInUserObject = this.loggedInUserObjectSource.asObservable();

  //User roles
  hostUrl: any                                 = AppConfig.apiEndPoint;
  constructor(
    private http: HttpClient
  ){

  }
  changeUser(user: object) {
    //console.log('inside subject',user );
    localStorage.setItem('loggedInUserObject', JSON.stringify(user));
    this.loggedInUserObjectSource.next(user);
  }
  getUserData(): Observable<any>{
    this.updateData();
    return this.loggedInUserObjectSource.asObservable();
  }
  private updateData(): void {
    const storage = localStorage.getItem('loggedInUserObject');
    if (storage != null) {
      this.loggedInUserObjectSource.next(JSON.parse(storage));
    }
  }
}
