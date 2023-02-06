import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AppSharedService {
  private userSource = new BehaviorSubject<object>({});
  currentUser = this.userSource.asObservable();
  constructor() { }
  changeUser(user: object) {
    this.userSource.next(user);
  }
}
