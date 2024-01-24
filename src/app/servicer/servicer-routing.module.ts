import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicerComponent } from './servicer.component';
import { ServicersignupComponent } from './servicersignup/servicersignup.component';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';
import { ServiceInputComponent } from './service-input/service-input.component';
import { ServicerLoginComponent } from './servicer-login/servicer-login.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceOrderListComponent } from './service-order-list/service-order-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'signup',component:ServicersignupComponent},
  {path:'login',component:ServicerLoginComponent},
  {path:'otp',component:OtpComponent},
  {path:'home',component:HomeComponent},
  {path:'addservice',component:ServiceInputComponent},
  {path:'serviceEdit',component:ServiceEditComponent},
  {path:'serviceOrders',component:ServiceOrderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicerRoutingModule { }
