import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'service';
import { UserQuery } from 'src/app/core/service/customer/customer.query';
import { UserStore } from 'src/app/core/service/customer/customer.store';
import { StateService } from '../../service/state.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public searchControl: FormControl;
    public showDropDown: BackDrop = {
        cart: false,
        account: false,
    };
    public constructor(
        public customerService: CustomerService,
        public userQuery: UserQuery,
        public userStore: UserStore,
        public stateService: StateService
    ) {
      this.stateService.dropDownBdrop$.subscribe((state: BackDrop) => {
        this.showDropDown['cart'] = state['cart'];
        this.showDropDown['account'] = state['account'];
      });
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl('test', []);
    }

    public logout(): void {}

    public ondropDownClick(e: Event, type: string): void {
        this.showDropDown[type] = true;
        if ((e.target as HTMLElement).closest('.drop-content')) {
            this.showDropDown[type] = false;
        }
    }
}
