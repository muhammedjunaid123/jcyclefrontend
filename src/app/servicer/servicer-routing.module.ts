import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicerComponent } from './servicer.component';
import { ServicersignupComponent } from './servicersignup/servicersignup.component';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: ServicerComponent },
  {path:'signup',component:ServicersignupComponent},
  {path:'otp',component:OtpComponent},
  {path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicerRoutingModule { }
