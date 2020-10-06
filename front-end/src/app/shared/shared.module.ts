import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        InputComponent,
        ValidationMessageComponent,
        HeaderComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [InputComponent, ValidationMessageComponent, HeaderComponent],
    providers: [],
})
export class SharedModule {}
