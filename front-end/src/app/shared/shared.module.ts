import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        InputComponent,
        ValidationMessageComponent,
        HeaderComponent,
        ReactiveFormsModule,
        FormsModule,
        CarouselComponent,
        HttpClientModule
    ],
    declarations: [
      InputComponent,
      ValidationMessageComponent,
      HeaderComponent,
      CarouselComponent
    ],
    providers: [],
})
export class SharedModule {}
