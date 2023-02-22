import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { environment } from 'environments/environment';

@Injectable()
export class DataTransferService {

  private loggedInUserObjectSource = new BehaviorSubject(JSON.parse(localStorage.getItem('loggedInUserObject')));
  loggedInUserObject = this.loggedInUserObjectSource.asObservable();

  //User roles
  hostUrl: any                                 = environment.apiEndPoint;
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
