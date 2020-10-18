import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostCommentComponent } from './pages/post-comment/post-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProductDetailComponent,
        HomeComponent,
        PostCommentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        AkitaNgRouterStoreModule,
        NgbModule
    ],
    providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } }],
    bootstrap: [AppComponent]
})
export class AppModule { }
