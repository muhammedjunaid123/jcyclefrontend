import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
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
import { RentDetailsComponent } from './rent-details/rent-details.component';
import { RentreviewComponent } from './rentreview/rentreview.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePikerComponent } from './date-piker/date-piker.component';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RentCheckoutComponent } from './rent-checkout/rent-checkout.component';
import { RentHistoryComponent } from './rent-history/rent-history.component';
import { RentUserproductHistoryComponent } from './rent-userproduct-history/rent-userproduct-history.component';
import { HostRentHistoryComponent } from './host-rent-history/host-rent-history.component';
import { ServiceComponent } from './service/service.component';
import { TimeConvertPipe } from '../pipe/time-convert.pipe';
import { SreviceListComponent } from './srevice-list/srevice-list.component';
import { RentProductEditComponent } from './rent-product-edit/rent-product-edit.component';
import { ChatComponent } from './chat/chat.component';
import { DateToTimePipe } from '../pipe/date-to-time.pipe';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { OrderServicePageComponent } from './order-service-page/order-service-page.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
    AddAddressComponent,
    RentDetailsComponent,
    RentreviewComponent,
    DatePikerComponent,
    RentCheckoutComponent,
    RentHistoryComponent,
    RentUserproductHistoryComponent,
    HostRentHistoryComponent,
    ServiceComponent,
    SreviceListComponent,
    RentProductEditComponent,
    ChatComponent,
    AddressEditComponent,
    OrderServicePageComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    GalleriaModule,
    NgxPaginationModule,
    SearchFilterPipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    TimeConvertPipe,
    DateToTimePipe,
    NgxMaterialTimepickerModule,
   

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
