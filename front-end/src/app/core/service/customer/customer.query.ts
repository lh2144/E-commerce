import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserStore } from './customer.store';
import { UserState } from './user.model';

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {
  public constructor(protected store: UserStore) {
    super(store);
  }

}
