import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { BicycleComponent } from './bicycle/bicycle.component';
import { userGuard, userGuardloged } from '../guard/userGuard/user.guard';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { BicycleDetailComponent } from './bicycle-detail/bicycle-detail.component';
import { PlaceOrderComponent } from './checkout/place-order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsInputComponent } from './reviews-input/reviews-input.component';



const routes: Routes = [
  { path:'', component: HomeComponent},
{path: 'login', component: LoginComponent,canActivate:[userGuardloged] },
{path:'signup',component:SignupComponent,canActivate:[userGuardloged]},
{path:'otp',component:OtpVerificationComponent,canActivate:[userGuardloged]},
{path:'bicycle',component:BicycleComponent},
{path:'bicycleDetail',component:BicycleDetailComponent},
{path:'wishlist',component:WishlistComponent,canActivate:[userGuard]},
{path:'cart',component:CartComponent,canActivate:[userGuard]},
{path:'checkout',component:PlaceOrderComponent,canActivate:[userGuard]},
{path:'order-success',component:OrderSuccessComponent,canActivate:[userGuard]},
{path:'order',component:OrdersListComponent,canActivate:[userGuard]},
{path:'wallet',component:WalletComponent,canActivate:[userGuard]},
{path:'review',component:ReviewsComponent,canActivate:[userGuard]},
{path:'addReview',component:ReviewsInputComponent,canActivate:[userGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
