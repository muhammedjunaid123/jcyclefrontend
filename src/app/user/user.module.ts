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
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    OtpVerificationComponent,
    BicycleComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  

  ]
})
export class UserModule { }
