import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    InputComponent,
    ValidationMessageComponent,
    HeaderComponent
  ],
  declarations: [
    InputComponent,
    ValidationMessageComponent,
    HeaderComponent
  ],
  providers: [],
})
export class SharedModule { }
