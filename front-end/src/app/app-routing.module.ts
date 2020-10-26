import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { PostCommentComponent } from './pages/post-comment/post-comment.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AddressComponent } from './shared/component/address/address.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: ':id/product-detail', component: ProductDetailComponent },
    { path: 'postComment/:id', component: PostCommentComponent },
    { path: 'mybasket', component: CartComponent},
    { path: 'address', component: AddressComponent },
    { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
