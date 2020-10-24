import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserState } from './user.model';

export function createInitialState(): UserState {
  return {
    id: '',
    name: '',
    password: '',
    email: '',
    token: ''
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends Store<UserState> {
  public constructor() {
    super(createInitialState());
  }

}
