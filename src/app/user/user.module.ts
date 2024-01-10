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
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsInputComponent } from './reviews-input/reviews-input.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchFilterPipe } from '../pipe/search-filter.pipe';
import { BicycleRentComponent } from './bicycle-rent/bicycle-rent.component';
import { RentAddComponent } from './rent-add/rent-add.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';


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
    PlaceOrderComponent,
    OrderSuccessComponent,
    OrdersListComponent,
    WalletComponent,
    ReviewsComponent,
    ReviewsInputComponent,
    ProfileComponent,
    BicycleRentComponent,
    RentAddComponent,
    AddressComponent,
    AddAddressComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   CarouselModule,
   GalleriaModule,
   NgxPaginationModule,
   SearchFilterPipe
  


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
