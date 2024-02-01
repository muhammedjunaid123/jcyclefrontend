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
import { ChatComponent } from './chat/chat.component';
import { servicerGuard, servicerGuardloged } from '../guard/servicerGuard/servicer-guard.guard';
import { ServicerProfileComponent } from './servicer-profile/servicer-profile.component';
import { ServicerDashboardComponent } from './servicer-dashboard/servicer-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[servicerGuard] },
  {path:'signup',component:ServicersignupComponent,canActivate:[servicerGuardloged]},
  {path:'login',component:ServicerLoginComponent,canActivate:[servicerGuardloged]},
  {path:'otp',component:OtpComponent,canActivate:[servicerGuardloged]},
  {path:'home',component:HomeComponent,canActivate:[servicerGuard]},
  {path:'addservice',component:ServiceInputComponent,canActivate:[servicerGuard]},
  {path:'serviceEdit',component:ServiceEditComponent,canActivate:[servicerGuard]},
  {path:'serviceOrders',component:ServiceOrderListComponent,canActivate:[servicerGuard]},
  { path: 'chat', title: 'Chat', component: ChatComponent,canActivate:[servicerGuard] },
  {path:'profile', component:ServicerProfileComponent,canActivate:[servicerGuard]},
  {path:'dashboard',component:ServicerDashboardComponent,canActivate:[servicerGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicerRoutingModule { }
