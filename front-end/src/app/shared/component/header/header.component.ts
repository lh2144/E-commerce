import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'service';
import { UserQuery } from 'src/app/core/service/customer/customer.query';
import { UserStore } from 'src/app/core/service/customer/customer.store';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public searchControl: FormControl;
    public constructor(public customerService: CustomerService, public userQuery: UserQuery, public userStore: UserStore) {}

    public ngOnInit(): void {
        this.searchControl = new FormControl('test', []);
    }

    public logout(): void {}
}
