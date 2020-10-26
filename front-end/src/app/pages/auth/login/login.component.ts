import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, UserState, UserStore } from 'service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showPassword: boolean = false;
  public inputType: string = 'password';
  public constructor(public router: Router, public userService: CustomerService, public userStore: UserStore) { }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  public goRegister(): void {
    this.router.navigate(['register']);
    // this.loginForm.controls.email.setValue('test@');
  }

  public login(): void {
    const payload = { };
    payload['email'] = this.loginForm.controls.email.value;
    payload['password'] = this.loginForm.controls.password.value;
    this.userService.login(payload).subscribe((res: UserState) => {
      this.userStore.update({ ...res });
      if (res.token) {
        localStorage.setItem('sessionToken', res.token);
      }
      this.router.navigate(['/home']);
    });
  }
}
