import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuery } from './core/service/customer/customer.query';
import { CustomerService } from './core/service/customer/customer.service';
import { UserState } from './core/service/customer/user.model';

@Component({
    selector: 'my-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public currentUser: Observable<UserState> = this.userQuery.allState$;

    public constructor(
        public customerService: CustomerService,
        public userQuery: UserQuery
    ) {}

    public ngOnInit(): void {
        this.customerService.login({}).subscribe((_) => {});
        this.currentUser.subscribe(() => { });
    }
}
