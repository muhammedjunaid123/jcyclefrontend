import {CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
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

import { register } from 'swiper/element/bundle';
import { StoreModule } from '@ngrx/store';
import { loadBicyclepage } from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BicycleEffects } from './store/user.effect';
import { PlaceOrderComponent } from './checkout/place-order.component';

// register Swiper custom elements
register();
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
    BicycleDetailComponent,
    PlaceOrderComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   CarouselModule,
   GalleriaModule,
   NgxPaginationModule,
  


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
