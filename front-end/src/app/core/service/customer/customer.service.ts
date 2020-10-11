import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserStore } from './customer.store';
import { UserState } from './user.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    public baseUrl: string = environment.base;
    public constructor(public store: UserStore, public http: HttpClient) {}

    public login(body): Observable<UserState> {
        return this.http.post<UserState>(this.baseUrl + 'login', body).pipe(
            map((res: UserState) => {
                this.store.update({ ...res });
                if (res.token) {
                  localStorage.setItem('sessionToken', res.token);
                }
                return res;
            })
        );
    }

    public register(body): Observable<UserState> {
        return this.http.post(this.baseUrl + 'register', body).pipe(
            map((res: UserState) => {
                this.store.update({ ...res });
                return res;
            })
        );
    }
}
