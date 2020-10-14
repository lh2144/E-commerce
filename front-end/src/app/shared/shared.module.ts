import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        InputComponent,
        ValidationMessageComponent,
        HeaderComponent,
        ProductCardComponent,
        ReactiveFormsModule,
        FormsModule,
        CarouselComponent,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
      InputComponent,
      ValidationMessageComponent,
      HeaderComponent,
      CarouselComponent,
      ProductCardComponent
    ],
    providers: [],
})
export class SharedModule {}
