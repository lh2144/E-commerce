import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public searchControl: FormControl;
  public constructor(public customerService: CustomerService) {}

  public ngOnInit(): void {
    this.searchControl = new FormControl('test', []);
  }
}
