import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppSpinnerService {
  //new BehaviorSubject<boolean>(false)
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  display(value: boolean) {
    if(value === false){
      setTimeout(() => {
        this.status.next(value);
      }, 500);
    }else{
      this.status.next(value);
    }
  }
}
