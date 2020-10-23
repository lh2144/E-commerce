import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StateService {
  private dropDownBdrop: Subject<any> = new Subject();
  public dropDownBdrop$: Observable<any> = this.dropDownBdrop.asObservable();
  public constructor() { }

  public toggleBackDrop(): void {
    this.dropDownBdrop.next({cart: false, account: false});
  }

}
