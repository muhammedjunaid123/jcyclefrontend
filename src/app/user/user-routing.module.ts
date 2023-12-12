import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { BicycleComponent } from './bicycle/bicycle.component';

const routes: Routes = [
  { path:'', component: HomeComponent},
{path: 'login', component: LoginComponent },
{path:'signup',component:SignupComponent},
{path:'otp',component:OtpVerificationComponent},
{path:'bicycle',component:BicycleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
