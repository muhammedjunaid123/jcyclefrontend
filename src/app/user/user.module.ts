import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { BicycleComponent } from './bicycle/bicycle.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BicycleDetailComponent } from './bicycle-detail/bicycle-detail.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    OtpVerificationComponent,
    BicycleComponent,
    HomeComponent,
    WishlistComponent,
    CartComponent,
    FooterComponent,
    BicycleDetailComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   CarouselModule,
   GalleriaModule,
   NgxPaginationModule

  ]
})
export class UserModule { }
